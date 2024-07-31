import { authenticateApiUser } from "@/app/lib/auth/serverAuth";
import { NextRequest, NextResponse } from "next/server";
import { traceWithUserId } from "../../apiUtils";
import { fetchProposal } from "../../../common/proposals/getProposals";

export async function GET(
  request: NextRequest,
  route: { params: { proposalId: string } }
) {
  const authResponse = await authenticateApiUser(request);

  if (!authResponse.authenticated) {
    return new Response(authResponse.failReason, { status: 401 });
  }

  return await traceWithUserId(authResponse.userId as string, async () => {
    try {
      const { proposalId } = route.params;
      const proposal = await fetchProposal(proposalId);
      return NextResponse.json(proposal);
    } catch (e: any) {
      return new Response("Internal server error: " + e.toString(), {
        status: 500,
      });
    }
  });
}
