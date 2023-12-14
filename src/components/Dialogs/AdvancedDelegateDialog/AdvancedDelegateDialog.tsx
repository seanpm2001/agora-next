import { VStack } from "@/components/Layout/Stack";
import { Button } from "@/components/Button";
import styles from "./advancedDelegateDialog.module.scss";
import { AdvancedDelegationDisplayAmount } from "./AdvancedDelegationDisplayAmount";
import SubdelegationToRow from "./SubdelegationRow";
import HumanAddress from "@/components/shared/HumanAddress";
import useAdvancedDelegation from "./useAdvancedDelegation";
import { Input } from "@/components/ui/input";
import {
  Dispatch,
  SetStateAction,
  Suspense,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Delegatees } from "@prisma/client";
import { useAccount } from "wagmi";
import { Delegation } from "@/app/api/delegations/delegation";
import { ChevronsRight, DivideIcon, Repeat2 } from "lucide-react";
import { AgoraLoaderSmall } from "@/components/shared/AgoraLoader/AgoraLoader";

export function AdvancedDelegateDialog({
  target,
  fetchVotingPowerForSubdelegation,
  checkIfDelegatingToProxy,
  fetchCurrentDelegatees,
  getProxyAddress,
  completeDelegation,
}: {
  target: string;
  fetchVotingPowerForSubdelegation: (address: string) => Promise<string>;
  checkIfDelegatingToProxy: (address: string) => Promise<boolean>;
  fetchCurrentDelegatees: (address: string) => Promise<any>;
  getProxyAddress: (address: string) => Promise<string>;
  completeDelegation: (address: string) => void;
}) {
  const [allowance, setAllowance] = useState(0);
  const [showMessage, setShowMessage] = useState(true);
  const [availableBalance, setAvailableBalance] = useState<string>("");
  const [isDelegatingToProxy, setIsDelegatingToProxy] =
    useState<boolean>(false);
  const [delegatees, setDelegatees] = useState<Delegation[]>([]);
  const [proxyAddress, setProxyAddress] = useState<string>("");
  const [isReady, setIsReady] = useState(false);
  const { address } = useAccount();

  const fetchData = useCallback(async () => {
    try {
      if (!address) return;
      const promises = [
        fetchVotingPowerForSubdelegation(address),
        checkIfDelegatingToProxy(address),
        fetchCurrentDelegatees(address),
        getProxyAddress(address),
      ];

      const [balance, isDelegating, delegatees, proxyAddress] =
        await Promise.all(promises);

      setAvailableBalance(balance);
      setIsDelegatingToProxy(isDelegating);
      setDelegatees(delegatees);
      setProxyAddress(proxyAddress);

      setIsReady(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [
    address,
    fetchVotingPowerForSubdelegation,
    checkIfDelegatingToProxy,
    fetchCurrentDelegatees,
    getProxyAddress,
  ]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const { write, isLoading, isError, isSuccess } = useAdvancedDelegation({
    isDelegatingToProxy,
    proxyAddress,
    // target can be a string or an array of strings
    target,
    // alowance can be a number or an array of numbers
    allocation: allowance, // (value / 100000) 100% = 100000
  });

  return (
    <VStack alignItems="items-center" className={styles.dialog_container}>
      <VStack gap={6} alignItems="items-stretch">
        <VStack
          gap={3}
          alignItems="items-center"
          className={styles.details_container}
        >
          <VStack
            className={styles.amount_container}
            alignItems="items-center"
            gap={3}
          >
            <div>Total delegatable votes</div>
            <AdvancedDelegationDisplayAmount amount={availableBalance} />
          </VStack>
        </VStack>
        currently delegating to:
        <VStack
          gap={3}
          alignItems="items-center"
          className={styles.details_container}
        >
          {delegatees.map((delegatee) => (
            <SubdelegationToRow key={delegatee.to} delegation={delegatee} />
          ))}
        </VStack>
        Delegating to:
        <VStack
          gap={3}
          alignItems="items-center"
          className={styles.details_container}
        >
          <HumanAddress address={target} />
          <Input
            value={allowance}
            onChange={(e) => setAllowance(parseInt(e.target.value))}
            type="number"
          />
        </VStack>
        {isLoading && (
          <Button href={null} disabled={false}>
            Submitting your delegation...
          </Button>
        )}
        {isSuccess && (
          <Button href={null} disabled={false}>
            Delegation completed!
          </Button>
        )}
        {isError && (
          <Button href={null} disabled={false} onClick={() => write()}>
            Delegation failed
          </Button>
        )}
        {!isError && !isSuccess && !isLoading && (
          <Button href={null} disabled={false} onClick={() => write()}>
            Delegate your votes
          </Button>
        )}
      </VStack>
    </VStack>
  );
}
