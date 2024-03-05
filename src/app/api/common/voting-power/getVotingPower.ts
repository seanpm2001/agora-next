import prisma from "@/app/lib/prisma";
import {
  getProxyAddress,
  getTotalVotableAllowance,
} from "@/lib/alligatorUtils";
import { contracts } from "@/lib/contracts/contracts";
import { addressOrEnsNameWrap } from "../utils/ensName";
import { VotingPowerData } from "./votingPower";
import { AuhtorityChainsAggregate } from "../authority-chains/authorityChains";
import Tenant from "@/lib/tenant";

/**
 * Voting Power for a given block
 * @param addressOrENSName
 * @param blockNumber
 * @param proposalId
 */
export const getVotingPowerForProposal = ({
  addressOrENSName,
  blockNumber,
  proposalId,
}: {
  addressOrENSName: string;
  blockNumber: number;
  proposalId: string;
}) =>
  addressOrEnsNameWrap(getVotingPowerForProposalByAddress, addressOrENSName, {
    blockNumber,
    proposalId,
  });

async function getVotingPowerForProposalByAddress({
  address,
  blockNumber,
  proposalId,
}: {
  address: string;
  blockNumber: number;
  proposalId: string;
}): Promise<VotingPowerData> {
  const { namespace } = Tenant.getInstance();

  const votingPowerQuery = prisma[`${namespace}VotingPowerSnaps`].findFirst({
    where: {
      delegate: address,
      block_number: {
        lte: blockNumber,
      },
    },
    orderBy: {
      ordinal: "desc",
    },
  });

  // This query pulls only partially delegated voting power
  const advancedVotingPowerQuery = prisma.$queryRawUnsafe<
    AuhtorityChainsAggregate[]
  >(
    `
    SELECT 
      array_agg(proxy) as proxies,
      array_agg(balance) as balances,
      json_agg(rules) as rules,
      json_agg(chain) as chains,
      SUM(COALESCE(subdelegated_share,0)) as subdelegated_share,
      SUM(COALESCE(subdelegated_amount,0)) as subdelegated_amount
    FROM (
      SELECT
        a.delegate,
        rules,
        chain,
        allowance,
        subdelegated_share,
        subdelegated_amount,
        balance,
        proxy
      FROM (
        SELECT chain_str
        FROM ${namespace + ".advanced_voting_power_raw_snaps"}
        WHERE contract = $2
          AND block_number <= $3
          AND delegate = $1
        GROUP BY chain_str
      )s
      LEFT JOIN LATERAL (
        SELECT
          delegate,
          rules,
          chain,
          allowance,
          subdelegated_share,
          subdelegated_amount,
          balance,
          proxy,
          block_number
        FROM ${namespace + ".advanced_voting_power_raw_snaps"}
        WHERE chain_str=s.chain_str 
          AND contract = $2
          AND block_number <= $3
        ORDER BY ordinal DESC
        LIMIT 1
      ) AS a ON TRUE
    ) t
    WHERE allowance > 0;
    `,
    address,
    contracts(namespace).alligator.address.toLowerCase(),
    blockNumber
  );

  const [votingPower, advancedVotingPower] = await Promise.all([
    votingPowerQuery,
    advancedVotingPowerQuery,
  ]);

  const advancedVP = await getTotalVotableAllowance({
    ...advancedVotingPower[0],
    proposalId,
  });

  return {
    directVP: votingPower?.balance ?? "0",
    advancedVP: advancedVP.toString(),
    totalVP: (BigInt(votingPower?.balance ?? "0") + advancedVP).toString(),
  };
}

/**
 * Voting Power
 * @param addressOrENSName
 */
export const getCurrentVotingPowerForNamespace = (addressOrENSName: string) =>
  addressOrEnsNameWrap(getCurrentVotingPowerForAddress, addressOrENSName);

async function getCurrentVotingPowerForAddress({
  address,
}: {
  address: string;
}): Promise<VotingPowerData> {
  const { namespace } = Tenant.getInstance();
  const votingPower = await prisma[`${namespace}VotingPower`].findFirst({
    where: {
      delegate: address,
    },
  });

  // This query pulls only partially delegated voting power
  const advancedVotingPower = await prisma[
    `${namespace}AdvancedVotingPower`
  ].findFirst({
    where: {
      delegate: address,
      contract: contracts(namespace).alligator.address.toLowerCase(),
    },
  });

  return {
    directVP: votingPower?.voting_power ?? "0",
    advancedVP: advancedVotingPower?.advanced_vp.toFixed(0) ?? "0",
    totalVP: (
      BigInt(votingPower?.voting_power ?? "0") +
      BigInt(advancedVotingPower?.advanced_vp.toFixed(0) ?? "0")
    ).toString(),
  };
}

/**
 *  Voting Power available for subdelegation
 * @param addressOrENSName
 */
export const getVotingPowerAvailableForSubdelegation = (
  addressOrENSName: string
) =>
  addressOrEnsNameWrap(
    getVotingPowerAvailableForSubdelegationForAddress,
    addressOrENSName
  );

async function getVotingPowerAvailableForSubdelegationForAddress({
  address,
}: {
  address: string;
}): Promise<string> {
  const { namespace } = Tenant.getInstance();
  const advancedVotingPower = await prisma[
    `${namespace}AdvancedVotingPower`
  ].findFirst({
    where: {
      delegate: address,
      contract: contracts(namespace).alligator.address.toLowerCase(),
    },
  });

  const undelegatedVotingPower = (async () => {
    const [isBalanceAccountedFor, balance] = await Promise.all([
      isAddressDelegatingToProxy({ address }),
      contracts(namespace).token.contract.balanceOf(address),
    ]);
    return isBalanceAccountedFor ? 0n : balance;
  })();

  return (
    BigInt(advancedVotingPower?.vp_delegatable_allowance.toFixed(0) ?? "0") +
    (await undelegatedVotingPower)
  ).toString();
}

/**
 * Voting Power available for direct delegation:
 * Represents the balance of the user's account
 * @param addressOrENSName
 */
export const getVotingPowerAvailableForDirectDelegation = (
  addressOrENSName: string
) =>
  addressOrEnsNameWrap(
    getVotingPowerAvailableForDirectDelegationForAddress,
    addressOrENSName
  );

async function getVotingPowerAvailableForDirectDelegationForAddress({
  address,
}: {
  address: string;
}): Promise<bigint> {
  const { namespace } = Tenant.getInstance();
  return contracts(namespace).token.contract.balanceOf(address); // TODO: update based on namespace
}

/**
 * Checks if a user has delegated to its proxy
 * @param addressOrENSName
 */
export const isDelegatingToProxy = (addressOrENSName: string) =>
  addressOrEnsNameWrap(isAddressDelegatingToProxy, addressOrENSName);

async function isAddressDelegatingToProxy({
  address,
}: {
  address: string;
}): Promise<boolean> {
  const { namespace } = Tenant.getInstance();
  const [proxyAddress, delegatee] = await Promise.all([
    getProxyAddress(address),
    prisma[`${namespace}Delegatees`].findFirst({
      where: { delegator: address.toLowerCase() },
    }),
  ]);

  if (
    proxyAddress &&
    delegatee &&
    delegatee.delegatee === proxyAddress.toLowerCase()
  ) {
    return true;
  }

  return false;
}

/**
 * Gets the proxy address for a given address
 * @param addressOrENSName
 */
export const getProxy = (addressOrENSName: string) =>
  addressOrEnsNameWrap(getProxyAddressForAddress, addressOrENSName);

async function getProxyAddressForAddress({
  address,
}: {
  address: string;
}): Promise<string> {
  return getProxyAddress(address);
}
