import { useContractWrite } from "wagmi";
import Tenant from "@/lib/tenant/tenant";
import { TENANT_NAMESPACES } from "@/lib/constants";

export const useExecuteCancel = (args: any) => {
  const config = executeCancelProposalConfig();
  const { data, write } = useContractWrite({
    ...config,
    args: args,
  });

  return { data, write };
};

const executeCancelProposalConfig = () => {
  const { namespace, contracts } = Tenant.current();

  switch (namespace) {
    case TENANT_NAMESPACES.CYBER:
      return {
        address: contracts.governor.address as `0x${string}`,
        abi: contracts.governor.abi,
        functionName: "cancel",
      };

    case TENANT_NAMESPACES.ENS:

    default:
      return {
        address: contracts.governor.address as `0x${string}`,
        abi: contracts.governor.abi,
        functionName: "cancel",
      };
  }
};
