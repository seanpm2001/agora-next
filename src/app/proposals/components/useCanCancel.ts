import { useAccount, useContractRead } from "wagmi";
import Tenant from "@/lib/tenant/tenant";
import { TENANT_NAMESPACES } from "@/lib/constants";

export const useCanCancel = () => {
  const { address } = useAccount();
  const config = contractCallConfig();

  const { data, isFetched } = useContractRead({
    ...config,
  });

  return {
    data,
    canCancel: Boolean(
      data?.toString().toLowerCase() === address?.toLowerCase()
    ),
  };
};

const contractCallConfig = () => {
  const { contracts, namespace } = Tenant.current();

  switch (namespace) {
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
        functionName: "getRoleAdmin",
        args: ["CANCELLER_ROLE"],
      };

    default:
      return {
        address: contracts.governor.address as `0x${string}`,
        abi: contracts.governor.abi,
        functionName: "admin",
      };
  }
};
