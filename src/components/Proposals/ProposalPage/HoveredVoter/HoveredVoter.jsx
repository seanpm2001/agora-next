"use client";

import DelegateCard from "@/components/Delegates/DelegateCard/DelegateCard";
import { useCallback, useEffect, useState, useTransition } from "react";
import styles from "./HoveredVoter.module.scss";

export function HoveredVoter({
  hoveredVoterAddress,
  fetchDelegate,
  isPending,
}) {
  const [delegate, setDelegate] = useState(null);
  const [isReady, setIsReady] = useState(false);

  const getDelegate = useCallback(async () => {
    const { delegate } = await fetchDelegate(hoveredVoterAddress);
    console.log("delegate", delegate);

    setDelegate(delegate);
  }, [fetchDelegate, hoveredVoterAddress]);

  useEffect(() => {
    if (hoveredVoterAddress) {
      getDelegate();
    }
  }, [hoveredVoterAddress, getDelegate]);

  return (
    <div className={styles.card_container}>
      {delegate && <DelegateCard delegate={delegate} />}
      {isPending.toString()}
      {delegate?.address}
    </div>
  );
}
