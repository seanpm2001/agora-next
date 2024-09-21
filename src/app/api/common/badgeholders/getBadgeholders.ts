import { CATEGORY_ROLES } from "@/app/lib/auth/constants";
import { cache } from "react";
import { addressOrEnsNameWrap } from "../utils/ensName";
import Tenant from "@/lib/tenant/tenant";
import prisma from "@/app/lib/prisma";

const getBadgeholder = async (addressOrEnsName: string) =>
  addressOrEnsNameWrap(getBadgeholderForAddress, addressOrEnsName);

async function getBadgeholderForAddress({ address }: { address: string }) {
  const { slug } = Tenant.current();

  const badgehodler = await prisma.badgeholders.findFirst({
    where: {
      dao_slug: slug,
      address: address,
      retro_funding_round: "5",
    },
  });

  return {
    isBadgeholder: !!badgehodler,
    votingCategory: badgehodler
      ? parseVotingCategory(JSON.parse(badgehodler.metadata).votingGroup)
      : randomVotingCategory(address),
  };
}

export const fetchBadgeholder = cache(getBadgeholder);

function parseVotingCategory(category: "A" | "B" | "C") {
  switch (category) {
    case "A":
      return Object.entries(CATEGORY_ROLES)[0][1];
    case "B":
      return Object.entries(CATEGORY_ROLES)[1][1];
    case "C":
      return Object.entries(CATEGORY_ROLES)[2][1];
  }
}

function randomVotingCategory(address: string) {
  // get a number seeded by the address
  const seed = parseInt(address.slice(2, 10), 16);
  const categoryIndex = seed % Object.keys(CATEGORY_ROLES).length;
  return Object.entries(CATEGORY_ROLES)[categoryIndex][1];
}
