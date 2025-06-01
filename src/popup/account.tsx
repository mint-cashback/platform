import React from "react";

import { z } from "zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, ExternalLink, Check } from "lucide-react";

const emailSchema = z.string().email();

export default function Account() {
  const [email, setEmail] = React.useState<string>("");
  const [isvalidEmail, setIsvalidEmail] = React.useState<boolean>(false);
  const [saved, setSaved] = React.useState<boolean>(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setEmail(email);
    setIsvalidEmail(emailSchema.safeParse(email).success);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaved(true);
    chrome.storage.local.set({ email: email });
    try {
      const response = await fetch("https://mint-cashback-backend.fly.dev/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClaimRewards = () => {
    chrome.tabs.create({ url: "https://mintcashback.com/user" });
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <img src="/assets/images/logos/mint-cashback.svg" alt="Mint" className="w-15 h-15" />

      <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full">
        <Input type="email" placeholder="Enter your email" value={email} onChange={handleEmailChange} className="h-12 text-lg p-4" />

        <Button type="submit" disabled={!isvalidEmail} className="h-12 text-lg p-4 w-full">
          {saved ? (
            <Check className="w-6 h-6" />
          ) : (
            <>
              <Mail className="w-6 h-6" />
            </>
          )}
          Save Email
        </Button>
      </form>
      <Button variant="outline" className="text-lg p-4 w-full h-12" onClick={handleClaimRewards}>
        <ExternalLink className="w-6 h-6" />
        Claim Rewards
      </Button>
    </div>
  );
}