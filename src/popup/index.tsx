import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import "@/app/globals.css";

export default function Popup() {
  return (
    <div className="p-4">
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
      </Tabs>

      <h1 className="text-lg font-bold">Hello World</h1>

      <Button variant="destructive">
        Hey there!
      </Button>

      <Button variant="default">
        Hey there!
      </Button>


    </div>
  );
}
