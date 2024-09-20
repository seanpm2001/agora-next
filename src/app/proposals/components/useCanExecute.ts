import Tenant from "@/lib/tenant/tenant";
import { TENANT_NAMESPACES } from "@/lib/constants";
import { useAccount, useContractRead } from "wagmi";

export const useCanExecute = () => {
  const { namespace } = Tenant.current();
  const { address } = useAccount();

  const config = contractCallConfig(address);

  const { data, isFetched } = useContractRead({
    enabled: !!address,
    ...config,
  });

  switch (namespace) {
    case TENANT_NAMESPACES.ENS:
      return {
        canExecute: Boolean(data),
        isFetched,
      };

    default:
      return {
        canExecute: true,
        isFetched: true,
      };
  }
};

const contractCallConfig = (address: `0x${string}` | undefined) => {
  const { contracts, namespace } = Tenant.current();

  switch (namespace) {
    case TENANT_NAMESPACES.ENS:
      return {
        address: contracts.timelock!.address as `0x${string}`,
        abi: contracts.timelock!.abi,
        functionName: "hasRole",
        args: [
          "0xd8aa0f3194971a2a116679f7c2090f6939c8d4e01a2a8d7e41d55e5351469e63",
          address,
        ],
      };

    default:
      return {};
  }
};
