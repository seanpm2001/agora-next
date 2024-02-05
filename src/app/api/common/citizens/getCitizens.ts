import "server-only";

import { paginatePrismaResult } from "@/app/lib/pagination";
import { Prisma } from "@prisma/client";
import prisma from "@/app/lib/prisma";
import { getDelegateStatementForNamespace } from "../delegateStatement/getDelegateStatement";

type citizen = {
  address: string;
  kind: string;
  dao_slug: string;
  metadata: object | null;
  created_at: Date;
  voting_power: Prisma.Decimal;
};

export async function getCitizensForNamespace({
  page = 1,
  sort = "shuffle",
  seed = Math.random(),
  namespace,
}: {
  page: number;
  sort: string;
  seed?: number;
  namespace: "optimism";
}) {
  const pageSize = 20;

  const { meta, data: _citizens } = await paginatePrismaResult(
    (skip: number, take: number) => {
      if (sort === "shuffle") {
        return prisma.$queryRawUnsafe<citizen[]>(
          `
            SELECT address_metadata.address, address_metadata.metadata, delegate.voting_power, setseed($1)::Text
            FROM agora.address_metadata address_metadata
            JOIN ${
              namespace + ".delegates"
            } delegate ON LOWER(address_metadata.address) = LOWER(delegate.delegate)
            WHERE address_metadata.kind = 'citizen' 
            AND address_metadata.dao_slug = 'OP'
            ORDER BY random()
            OFFSET $2
            LIMIT $3;
            `,
          seed,
          skip,
          take
        );
      } else {
        return prisma.$queryRawUnsafe<citizen[]>(
          `
            SELECT address_metadata.address, address_metadata.metadata, delegate.voting_power
            FROM agora.address_metadata address_metadata
            JOIN ${
              namespace + ".delegates"
            } delegate ON LOWER(address_metadata.address) = LOWER(delegate.delegate)
            WHERE address_metadata.kind = 'citizen' 
            AND address_metadata.dao_slug = 'OP'
            ORDER BY delegate.voting_power DESC
            OFFSET $1
            LIMIT $2;
          `,
          skip,
          take
        );
      }
    },
    page,
    pageSize
  );

  const citizens = await Promise.all(
    _citizens.map(async (citizen) => {
      const statement = await getDelegateStatementForNamespace({
        addressOrENSName: citizen.address,
        namespace,
      });
      const { address, metadata } = citizen;
      return {
        address,
        metadata,
        votingPower: citizen.voting_power?.toFixed(0),
        // Mark as citizen to display badge
        citizen: true,
        statement,
      };
    })
  );

  return {
    meta,
    delegates: citizens,
  };
}