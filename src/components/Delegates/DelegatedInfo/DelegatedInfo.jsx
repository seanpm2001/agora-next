// TODO: set real data from backend
const table = [
  {
    allowance: "70,230 OP",
    delegatedOn: "11/12/23",
    type: "Direct",
    amount: "Full",
    from: "yitong.eth",
  },
  {
    allowance: "70,230 OP",
    delegatedOn: "11/12/23",
    type: "Direct",
    amount: "Full",
    from: "yitong.eth",
  },
  {
    allowance: "70,230 OP",
    delegatedOn: "11/12/23",
    type: "Direct",
    amount: "Full",
    from: "yitong.eth",
  },
  {
    allowance: "70,230 OP",
    delegatedOn: "11/12/23",
    type: "Direct",
    amount: "Full",
    from: "yitong.eth",
  },
  {
    allowance: "70,230 OP",
    delegatedOn: "11/12/23",
    type: "Direct",
    amount: "Full",
    from: "yitong.eth",
  },
];
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { HStack, VStack } from "@/components/Layout/Stack";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { icons } from "@/assets/icons/icons";

export default function DelegatedInfo() {
  return (
    <Tabs className="my-10" defaultValue="delegatedFrom">
      <HStack className="justify-between align-center">
        <TabsList>
          <TabsTrigger value="delegatedFrom">Delegated from</TabsTrigger>
          <TabsTrigger value="delegatedTo">Delegated to</TabsTrigger>
        </TabsList>
        <span className="font-medium text-gray-4f">
          240,120 OP from 80,024 Delegates
        </span>
      </HStack>
      <TabsContent value="delegatedFrom">
        <VStack
          gap="3"
          className="rounded-lg border border-gray-eb bg-white shadow"
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <HStack>
                    <span>Allowance</span>
                    <ChevronDown className="h-4 w-4 ml-[2px] opacity-30 hover:opacity-100" />
                  </HStack>
                </TableHead>
                <TableHead>Delegated on</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>From</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* TODO: change this index when real data */}
              {table.map((data, index) => {
                const { allowance, delegatedOn, type, amount, from } = data;
                return (
                  <TableRow key={index}>
                    <TableCell>{allowance}</TableCell>
                    <TableCell>{delegatedOn}</TableCell>
                    <TableCell>{type}</TableCell>
                    <TableCell>{amount}</TableCell>
                    <TableCell>
                      <a
                        href={from}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex gap-2"
                      >
                        {from}
                        <Image
                          src={icons["link"]}
                          alt={icons["link"]}
                          width="12"
                          height="12"
                        />
                      </a>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </VStack>
      </TabsContent>
      <TabsContent value="delegatedTo">Delegated to</TabsContent>
    </Tabs>
  );
}
