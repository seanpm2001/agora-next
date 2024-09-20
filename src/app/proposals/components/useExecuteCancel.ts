import { useContractWrite } from "wagmi";
import Tenant from "@/lib/tenant/tenant";
import { TENANT_NAMESPACES } from "@/lib/constants";
import { Proposal } from "@/app/api/common/proposals/proposal";
import { ParsedProposalData } from "@/lib/proposalUtils";
import { keccak256 } from "viem";
import { toUtf8Bytes } from "ethers";

interface Props {
  proposal: Proposal;
}

export const useExecuteCancel = ({ proposal }: Props) => {
  const config = executeCancelProposalConfig(proposal);

  const { data, write } = useContractWrite({ ...config });
  return { data, write };
};

const executeCancelProposalConfig = (proposal: Proposal) => {
  const { namespace, contracts } = Tenant.current();

  switch (namespace) {
    case TENANT_NAMESPACES.CYBER:
      const dynamicProposalType: keyof ParsedProposalData =
        proposal.proposalType as keyof ParsedProposalData;
      const proposalData =
        proposal.proposalData as ParsedProposalData[typeof dynamicProposalType]["kind"];

      const args = [
        "options" in proposalData ? proposalData.options[0].targets : "",
        "options" in proposalData ? proposalData.options[0].values : "",
        "options" in proposalData ? proposalData.options[0].calldatas : "",
        keccak256(toUtf8Bytes(proposal.description!)),
      ];

      return {
        address: contracts.governor.address as `0x${string}`,
        abi: contracts.governor.abi,
        functionName: "cancel",
        args,
      };

    case TENANT_NAMESPACES.ENS:
      return {
        address: contracts.timelock!.address as `0x${string}`,
        abi: contracts.timelock!.abi,
        functionName: "cancel",
        args: [proposal.id],
      };

    case TENANT_NAMESPACES.UNISWAP:
      return {
        address: contracts.governor.address as `0x${string}`,
        abi: contracts.governor.abi,
        functionName: "cancel",
        args: [proposal.id],
      };

    default:
      throw new Error("Namespace not supported");
  }
};
