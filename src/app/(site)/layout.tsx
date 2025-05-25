"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/blog", label: "Blog" },
];

function SiteHeader() {
  const pathname = usePathname();

  return (
    <Header>
      <div className="flex items-center gap-3 md:gap-6">
        <nav className="flex gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`font-semibold transition-all ${pathname === item.href ? "text-primary" : "hover:text-primary"
                }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/auth/login" passHref>
            <Button variant="outline">Log In</Button>
          </Link>

          <Link href="/auth/signup" passHref>
            <Button className="font-semibold">Join Mint</Button>
          </Link>
        </div>
      </div>
    </Header>
  );
}

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader />

      {children}

      <Footer />
    </>
  );
}
