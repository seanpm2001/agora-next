import { ethers } from "ethers";
import { OptimismContracts } from "./contracts/contracts";
import { DEPLOYMENT_NAME, Deployments } from "./config";

// TODO: This file seems messy -- consider refactoring

export const tokens: Map<
  Deployments | string,
  { name: string; symbol: string; decimals: number }
> = new Map([
  [
    "optimism",
    {
      name: "Optimism",
      symbol: "OP",
      decimals: 18,
    },
  ],
  [
    "0x4200000000000000000000000000000000000042",
    {
      name: "Optimism",
      symbol: "OP",
      decimals: 18,
    },
  ],
]);

export const TOKEN = tokens.get(DEPLOYMENT_NAME)!;

const format = new Intl.NumberFormat("en", {
  style: "decimal",
  maximumSignificantDigits: 3,
  notation: "compact",
});

export function pluralizeVote(count: BigInt) {
  const votes = Number(
    ethers.formatUnits(count.toString(), tokens.get(DEPLOYMENT_NAME)!.decimals)
  );

  if (votes === 1) {
    return "1 vote";
  }
  return `${format
    .formatToParts(votes)
    .map((it) => it.value)
    .join("")} votes`;
}

export function formatNumber(
  amount: string | BigInt,
  maximumSignificantDigits = 4
) {
  const number = Number(
    ethers.formatUnits(amount.toString(), tokens.get(DEPLOYMENT_NAME)!.decimals)
  );

  const numberFormat = new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
    currencyDisplay: "code",
    compactDisplay: "short",
    notation: "compact",
    maximumSignificantDigits,
  });

  const parts = numberFormat.formatToParts(number);
  return parts
    .filter((part) => part.type !== "currency" && part.type !== "literal")
    .map((part) => part.value)
    .join("");
}

export function formatNumberForAdvancedDelegation(amount: string) {
  // Advanced delegation needs a precision up to 3 decimal places,
  // which is bit different from the formatNumber function used everywhere else and requires for max 4 significant digits
  const number = Number(
    ethers.formatUnits(amount.toString(), tokens.get(DEPLOYMENT_NAME)!.decimals)
  );

  const numberFormat = new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
    currencyDisplay: "code",
    compactDisplay: "short",
    notation: "compact",
    maximumFractionDigits: 3,
  });

  const parts = numberFormat.formatToParts(number);
  return parts
    .filter((part) => part.type !== "currency" && part.type !== "literal")
    .map((part) => part.value)
    .join("");
}

/**
 * Contract calls
 *
 */
export async function getTokenSupply(dao: "optimism") {
  switch (dao) {
    case "optimism": {
      return OptimismContracts.token.contract.totalSupply();
    }
  }
}
