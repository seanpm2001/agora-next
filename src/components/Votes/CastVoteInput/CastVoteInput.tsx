"use client";

import { VStack, HStack } from "@/components/Layout/Stack";
import styles from "./castVoteInput.module.scss";
import { useCallback, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useAgoraContext } from "@/contexts/AgoraContext";
import { Button } from "@/components/ui/button";
import { useModal } from "connectkit";
import { useOpenDialog } from "@/components/Dialogs/DialogProvider/DialogProvider";
import { Proposal } from "@/app/api/proposals/proposal";
import { Delegate } from "@/app/api/delegates/delegate";
import { Vote } from "@/app/api/votes/vote";
import { SupportTextProps } from "@/components/Proposals/ProposalPage/CastVoteDialog/CastVoteDialog";

type Props = {
  proposal: Proposal;
  fetchVotingPower: (
    addressOrENSName: string | `0x${string}`,
    blockNumber: number
  ) => Promise<{ votingPower: string }>;
  fetchAuthorityChains: (
    address: string | `0x${string}`,
    blockNumber: number
  ) => Promise<{ chains: string[][] }>;
  fetchDelegate: (
    addressOrENSName: string | `0x${string}`
  ) => Promise<Delegate>;
  fetchVoteForProposalAndDelegate: (
    proposal_id: string,
    address: string | `0x${string}`
  ) => Promise<
    | {
        vote: undefined;
      }
    | {
        vote: Vote;
      }
  >;
};

export default function CastVoteInput({
  proposal,
  fetchVotingPower,
  fetchAuthorityChains,
  fetchDelegate,
  fetchVoteForProposalAndDelegate,
}: Props) {
  const [reason, setReason] = useState("");
  const [votingPower, setVotingPower] = useState("0");
  const [delegate, setDelegate] = useState({});
  const [chains, setChains] = useState<string[][]>([]);
  const [vote, setVote] = useState<Vote>();
  const [isReady, setIsReady] = useState(false);
  const openDialog = useOpenDialog();

  const { address } = useAccount();

  const fetchData = useCallback(async () => {
    try {
      const promises: [
        Promise<{ votingPower: string }>,
        Promise<Delegate>,
        Promise<{ chains: string[][] }>,
        Promise<{ vote?: Vote }>
      ] = [
        fetchVotingPower(address!, proposal.snapshotBlockNumber),
        fetchDelegate(address!),
        fetchAuthorityChains(address!, proposal.snapshotBlockNumber),
        fetchVoteForProposalAndDelegate(proposal.id, address!),
      ];

      const [votingPowerResult, delegateResult, chainsResult, voteResult] =
        await Promise.all(promises);

      setVotingPower(votingPowerResult.votingPower);
      setDelegate(delegateResult);
      setChains(chainsResult.chains);
      setVote(voteResult.vote);
      setIsReady(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [
    fetchVotingPower,
    fetchDelegate,
    fetchAuthorityChains,
    address,
    proposal,
    fetchVoteForProposalAndDelegate,
  ]);

  useEffect(() => {
    if (address && proposal.snapshotBlockNumber) {
      fetchData();
    }
  }, [fetchData, address, proposal.snapshotBlockNumber]);

  return (
    <VStack className={styles.cast_vote_container}>
      <textarea
        placeholder="I believe..."
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        className="text-sm"
      />
      <VStack
        justifyContent="justify-between"
        alignItems="items-stretch"
        className={styles.vote_actions}
      >
        <VoteButtons
          onClick={(supportType: SupportTextProps["supportType"]) =>
            openDialog({
              type: "CAST_VOTE",
              params: {
                reason,
                supportType,
                proposalId: proposal.id,
                delegate,
                votingPower,
              },
            })
          }
          proposalStatus={proposal.status}
          delegateVote={vote}
          isReady={isReady}
        />
      </VStack>
    </VStack>
  );
}

function VoteButtons({
  onClick,
  proposalStatus,
  delegateVote,
  isReady,
}: {
  onClick: (supportType: SupportTextProps["supportType"]) => void;
  proposalStatus: Proposal["status"];
  delegateVote: Vote | undefined;
  isReady: boolean;
}) {
  const { isConnected } = useAgoraContext();
  const { setOpen } = useModal();

  if (proposalStatus !== "ACTIVE") {
    return <DisabledVoteButton reason="Not open to voting" />;
  }

  if (!isConnected) {
    return (
      <Button variant={"outline"} onClick={() => setOpen(true)}>
        Connect wallet to vote
      </Button>
    );
  }

  if (!isReady) {
    return <DisabledVoteButton reason="Loading..." />;
  }

  const hasVoted = !!delegateVote?.transactionHash;

  if (hasVoted) {
    return <DisabledVoteButton reason="Already voted" />;
  }

  return (
    <HStack gap={2} className="pt-1">
      {["FOR", "AGAINST", "ABSTAIN"].map((supportType) => (
        <VoteButton
          key={supportType}
          action={supportType as SupportTextProps["supportType"]}
          onClick={() => {
            onClick(supportType as SupportTextProps["supportType"]);
          }}
        />
      ))}
    </HStack>
  );
}

function VoteButton({
  action,
  onClick,
}: {
  action: SupportTextProps["supportType"];
  onClick: () => void;
}) {
  const className = `${styles["vote_button_" + action.toLowerCase()]}`;

  return (
    <button className={className} onClick={onClick}>
      {action.toLowerCase()}
    </button>
  );
}

function DisabledVoteButton({ reason }: { reason: string }) {
  return (
    <button disabled className={styles.vote_button_disabled}>
      {reason}
    </button>
  );
}