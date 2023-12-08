import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DelegatedInfo() {
  return (
    <Tabs defaultValue="delegatedFrom" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="delegatedFrom">Delegated from</TabsTrigger>
        <TabsTrigger value="delegatedTo">Delegated to</TabsTrigger>
      </TabsList>
      <TabsContent value="delegatedFrom">Delegated from</TabsContent>
      <TabsContent value="delegatedTo">Delegated to</TabsContent>
    </Tabs>
  );
}
