import { useAccount, useContractRead } from "wagmi";
import Tenant from "@/lib/tenant/tenant";
import { TENANT_NAMESPACES } from "@/lib/constants";

export const useCanCancel = () => {
  const { address } = useAccount();
  const { namespace } = Tenant.current();
  const config = contractCallConfig(address);

  const { data, isFetched } = useContractRead({
    enabled: !!address,
    ...config,
  });

  switch (namespace) {
    case TENANT_NAMESPACES.UNISWAP:
    case TENANT_NAMESPACES.CYBER:
      return {
        canCancel: Boolean(
          data?.toString().toLowerCase() === address?.toLowerCase()
        ),
        isFetched,
      };

    case TENANT_NAMESPACES.ENS:
      return {
        canCancel: Boolean(data),
        isFetched,
      };

    default:
      return {
        canCancel: Boolean(
          data?.toString().toLowerCase() === address?.toLowerCase()
        ),
        isFetched,
      };
  }
};

const contractCallConfig = (address: `0x${string}` | undefined) => {
  const { contracts, namespace } = Tenant.current();

  switch (namespace) {
    case TENANT_NAMESPACES.UNISWAP:
    case TENANT_NAMESPACES.CYBER:
      return {
        address: contracts.governor.address as `0x${string}`,
        abi: contracts.governor.abi,
        functionName: "admin",
      };

    case TENANT_NAMESPACES.ENS:
      return {
        address: contracts.timelock!.address as `0x${string}`,
        abi: contracts.timelock!.abi,
        functionName: "hasRole",
        args: [
          "0xfd643c72710c63c0180259aba6b2d05451e3591a24e58b62239378085726f783",
          address,
        ],
      };

    default:
      return {
        address: contracts.governor.address as `0x${string}`,
        abi: contracts.governor.abi,
        functionName: "admin",
      };
  }
};
