import { Proposal } from "@/app/api/common/proposals/proposal";
import { useWaitForTransaction } from "wagmi";
import { Button } from "@/components/ui/button";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useExecuteCancel } from "@/app/proposals/components/useExecuteCancel";
import { useCanCancel } from "@/app/proposals/components/useCanCancel";

interface Props {
  proposal: Proposal;
}

export const ProposalCancelButton = ({ proposal }: Props) => {
  const { canCancel, isFetched: isCanCancelFetched } = useCanCancel();
  const { data, write } = useExecuteCancel({ proposal });

  const { isLoading, isSuccess, isError, isFetched, error } =
    useWaitForTransaction({
      hash: data?.hash,
    });

  useEffect(() => {
    if (isSuccess) {
      toast.success(
        "Proposal Cancelled. It might take a minute to see the updated status.",
        { duration: 5000 }
      );
    }
    if (isError) {
      toast.error(`Error cancelling proposal ${error?.message}`, {
        duration: 10000,
      });
    }
  }, [isSuccess, isError, error]);

  return (
    <div>
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          {!canCancel ? (
            <TooltipTrigger>
              <Button disabled={true} variant="outline">
                Cancel
              </Button>
            </TooltipTrigger>
          ) : (
            <>
              {!isFetched && (
                <Button
                  onClick={() => write?.()}
                  variant="outline"
                  loading={isLoading}
                >
                  Cancel
                </Button>
              )}
            </>
          )}

          <TooltipContent>
            <div className="flex flex-col gap-1 p-2">
              <div>Only the admin wallet can cancel proposals.</div>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};
