import {
  AgoraGovernor__factory,
  ERC20__factory,
} from "@/lib/contracts/generated";
import { ITokenContract } from "@/lib/contracts/common/interfaces/ITokenContract";
import { TenantContract } from "@/lib/tenant/tenantContract";
import { TenantContracts } from "@/lib/types";
import { scroll } from "viem/chains";

import { IGovernorContract } from "@/lib/contracts/common/interfaces/IGovernorContract";
import { FallbackProvider, JsonRpcProvider } from "ethers";
import { ZERO_ADDRESS } from "@/lib/constants";

interface Props {
  isProd: boolean;
  alchemyId: string;
}

export const scrollTenantContractConfig = ({
  isProd,
  alchemyId,
}: Props): TenantContracts => {
  const TOKEN = ZERO_ADDRESS;
  const GOVERNOR = ZERO_ADDRESS;
  const TREASURY = ZERO_ADDRESS;

  const provider = new FallbackProvider([
    {
      provider: new JsonRpcProvider(
        `https://scroll-mainnet.g.alchemy.com/v2/${alchemyId}`
      ),
      priority: 1,
      stallTimeout: 1500,
      weight: 1,
    },
    {
      provider: new JsonRpcProvider(`https://rpc.scroll.io/`),
      priority: 2,
      stallTimeout: 1500,
      weight: 1,
    },
  ]);

  const chain = scroll;

  return {
    token: new TenantContract<ITokenContract>({
      abi: ERC20__factory.abi,
      address: TOKEN as `0x${string}`,
      chain,
      contract: ERC20__factory.connect(TOKEN, provider),
      provider,
    }),

    // PLACEHOLDER CONTRACT
    governor: new TenantContract<IGovernorContract>({
      abi: AgoraGovernor__factory.abi,
      address: GOVERNOR,
      chain,
      contract: AgoraGovernor__factory.connect(GOVERNOR, provider),
      provider,
    }),

    treasury: [TREASURY],
  };
};
