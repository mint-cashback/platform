import OffersPage from "./OffersPage";
import Account from "./account";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import "@/app/globals.css";

export default function Popup() {

  return (
    <div className="p-4">
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList className="w-full">
          <TabsTrigger value="account" className="w-full">Account</TabsTrigger>
          <TabsTrigger value="offers" className="w-full">Offers</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Account />
        </TabsContent>
        <TabsContent value="offers">
          <OffersPage />
        </TabsContent>
      </Tabs>
    </div>
  );
}
