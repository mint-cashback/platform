import React from "react";

import { z } from "zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const emailSchema = z.string().email();

export default function Account() {
  const [email, setEmail] = React.useState<string>("");
  const [isvalidEmail, setIsvalidEmail] = React.useState<boolean>(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setEmail(email);
    setIsvalidEmail(emailSchema.safeParse(email).success);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(email);
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <img src="/assets/images/logos/mint-cashback.svg" alt="Mint" className="w-15 h-15" />

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
        <Input type="email" placeholder="Enter your email" value={email} onChange={handleEmailChange} className="h-10 text-lg p-4" />

        <Button type="submit" disabled={!isvalidEmail} className="h-12 text-lg p-4 w-full">
          Submit
        </Button>
      </form>
    </div>
  );
}