import Account from "./account";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import "@/app/globals.css";

export default function Popup() {
  return (
    <div className="p-4">
      <Tabs defaultValue="account" className="w-96">
        <TabsList className="w-full">
          <TabsTrigger value="account" className="w-full">Account</TabsTrigger>
          <TabsTrigger value="password" className="w-full">Offers</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Account />
        </TabsContent>
      </Tabs>
    </div>
  );
}
