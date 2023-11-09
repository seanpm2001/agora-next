import { NextRequest, NextResponse } from "next/server";
import { ethers } from "ethers";
import prisma from "@/app/lib/prisma";
import { getHumanBlockTime } from "@/lib/blockTimes";

BigInt.prototype.toJSON = function () {
  return this.toString();
};

export async function GET(
  request: NextRequest,
  { params }: { params: { proposal_id: string } }
) {
  const provider = new ethers.AlchemyProvider(
    "optimism",
    process.env.NEXT_PUBLIC_ALCHEMY_ID
  );
  const latestBlock = await provider.getBlock("latest");

  const proposal = await prisma.proposalsData.findFirst({
    where: { proposal_id: params.proposal_id },
  });

  if (!proposal) {
    return NextResponse.json({ error: "Proposal not found" }, { status: 404 });
  }

  // Build out proposal response
  const response = {
    proposal: {
      // Just testing out, not meant for production
      id: proposal.proposal_id,
      proposer_addr: proposal.proposer,
      start_block: proposal.start_block,
      end_block: proposal.end_block,
      start_time: latestBlock
        ? getHumanBlockTime(
            proposal.start_block,
            latestBlock.number,
            latestBlock.timestamp
          )
        : null,
      end_time: latestBlock
        ? getHumanBlockTime(
            proposal.end_block,
            latestBlock.number,
            latestBlock.timestamp
          )
        : null,
      description: proposal.description,
      proposalData: proposal.proposal_data,
    },
  };

  return NextResponse.json(response);
}