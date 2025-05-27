"use client";

import { useState } from "react";
import Image from "next/image";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRightIcon, MailIcon } from "lucide-react";

import { supabase } from "@/lib/supabase/client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  email: z.string().email("Must be a valid email address")
})

export default function AuthPage() {
  const [success, setSuccess] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: ""
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const loadingToast = toast.loading(`Sending an email to ${values.email}...`);

    // Use a more reliable redirect URL structure
    const redirectTo = `${window.location.origin}/callback`;
    console.log("Setting redirect to:", redirectTo);

    const { data, error } = await supabase.auth.signInWithOtp({
      email: values.email,
      options: {
        shouldCreateUser: true,
        emailRedirectTo: redirectTo
      }
    })

    if (error) {
      console.error(error);
      toast.error(error?.message || 'Failed to send email, please contact support');
      return;
    }

    toast.success("Email sent, check your inbox");
    setSuccess(true);

    toast.dismiss(loadingToast);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const response = await fetch("https://mint-cashback-backend.fly.dev/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: values.email,
      }),
    });

    if (!response.ok) {
      console.error(response);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen px-6 bg-muted dark:bg-background">
      <Image src="/brand/mint-cashback.svg" alt="logo" width={250} height={100} className="mb-6" />

      <div className="w-full max-w-lg p-6 bg-background dark:bg-muted border rounded-2xl shadow-sm animate-in fade-in-0 zoom-in-95 duration-500">

        {!success ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-extrabold">
                  Welcome to Mint 👋
                </h2>
                <p className="text-lg font-medium text-muted-foreground">
                  Enter your email to sign in or create an account
                </p>
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex flex-row gap-3">
                        <Input placeholder="Email" className="h-12 rounded-lg bg-input/20 dark:bg-background/30 flex-1" {...field} />

                        <Button type="submit" size="icon" className="rounded-lg size-12">
                          <ArrowRightIcon size={48} />
                        </Button>
                      </div>
                    </FormControl>

                    <FormMessage className="text-md" />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        ) : (
          <>
            <h2 className="text-3xl font-extrabold mb-3">
              Check your email 📧
            </h2>
            <p className="text-lg font-medium text-muted-foreground mb-3">
              We've sent a login link to your email! You can safely close this page now.
            </p>
            <p className="text-md font-semibold bg-muted border py-1 px-4 w-fit rounded-full flex flex-row gap-2 items-center">
              <MailIcon size={16} />
              {form.getValues("email")}
            </p>
          </>
        )}
      </div>
    </div>
  )
}