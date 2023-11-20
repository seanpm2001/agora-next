import React from "react";
import AgoraAPI from "../../../app/lib/agoraAPI";
import { HStack, VStack } from "@/components/Layout/Stack";
import ProposalDescription from "@/components/Proposals/ProposalPage/ProposalDescription";
import OPProposalPage from "@/components/Proposals/ProposalPage/OPProposalPage/OPProposalPage";
import OPProposalApprovalPage from "@/components/Proposals/ProposalPage/OPProposalApprovalPage/OPProposalApprovalPage";

async function fetchProposal(proposal_id) {
  "use server";

  const api = new AgoraAPI();
  const data = await api.get(`/proposals/${proposal_id}`);
  return { proposal: data.proposal };
}

export default async function Page({ params: { proposal_id } }) {
  const { proposal } = await fetchProposal(proposal_id);
  console.log(proposal);

  let RenderComponent;
  switch (proposal.proposalType) {
    case "STANDARD":
      RenderComponent = OPProposalPage;
      break;
    case "APPROVAL":
      RenderComponent = OPProposalApprovalPage;
      break;
    default:
      RenderComponent = null; // Or some default component
  }

  return (
    <HStack justifyContent="justify-between">
      <div>{RenderComponent && <RenderComponent proposal={proposal} />}</div>
      <VStack gap={6}></VStack>
    </HStack>
  );
}
