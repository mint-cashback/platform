"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon, HomeIcon, BookIcon, BookOpenIcon, MessageCircleQuestionIcon } from "lucide-react";

import { useIsMobile } from "@/lib/hooks/use-mobile";
import { useAuth } from "@/lib/hooks/use-auth";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { UserHeader } from "@/app/user/user-header";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navItems = [
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "/about", label: "About", icon: BookOpenIcon },
  { href: "/faq", label: "FAQ", icon: MessageCircleQuestionIcon },
  { href: "/blog", label: "Blog", icon: BookIcon },
];

function SiteHeader() {
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const { user } = useAuth();

  return (
    <Header>
      <div className="flex items-center gap-3 md:gap-6">
        {!isMobile && (
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
        )}

        <div className="flex items-center gap-4">
          {!user ? (
            <>
              <Link href="/auth" passHref>
                <Button className="font-semibold px-6">Join Mint</Button>
              </Link>
            </>
          ) : (
            <UserHeader />
          )}

          {!isMobile && <ThemeToggle />}

          {isMobile && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="w-10 h-10">
                  <MenuIcon className="size-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-40 mr-4">
                {navItems.map((item) => (
                  <DropdownMenuItem
                    key={item.href}
                    asChild
                    className={`transition-all text-md cursor-pointer ${pathname === item.href ? "bg-primary/10" : ""
                      }`}
                  >
                    <Link href={item.href} className="flex items-center gap-2">
                      <item.icon
                        className={`size-5 ${pathname === item.href ? "text-primary" : ""
                          }`}
                      />
                      <span
                        className={
                          pathname === item.href
                            ? "text-primary font-medium"
                            : ""
                        }
                      >
                        {item.label}
                      </span>
                    </Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuItem asChild className="mt-2">
                  <div className="flex justify-center">
                    <ThemeToggle />
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
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
