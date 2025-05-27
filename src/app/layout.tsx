import { Figtree } from "next/font/google";
import type { Metadata, Viewport } from "next";

import { Toaster } from "@/components/ui/sonner";

import { AuthProvider } from "@/lib/providers/auth-provider";
import { ThemeProvider } from "@/lib/providers/theme-provider";

import "./globals.css";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mint Cashback",
  description: "Cashback, finally done right",
  keywords: [
    "cashback", "rewards", "shopping", "earn", "mint", "mint cashback",
    "online shopping", "online purchases", "online shopping rewards",
    "online shopping cashback", "online shopping rewards",
    "online shopping cashback"
  ],
  authors: [{ name: "Mint Cashback", url: "https://mintcashback.com" }],
  creator: "Mint Cashback",
  publisher: "Mint Cashback",
  metadataBase: new URL("https://mintcashback.com"),
  applicationName: "Mint Cashback",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: "https://mintcashback.com",
  },
  openGraph: {
    title: "Mint Cashback",
    type: "website",
    locale: "en_US",
    url: "https://mintcashback.com",
    siteName: "Mint Cashback",
    description: "Cashback, finally done right",
    images: [
      {
        url: "https://mintcashback.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Mint Cashback",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mint Cashback",
    description: "Cashback, finally done right",
    images: ["https://mintcashback.com/og-image.png"],
  },
  other: {
    "msapplication-TileColor": "#22e4a3",
    "og:color": "#22e4a3",
    "discord:color": "#22e4a3",
  },
  icons: {
    icon: "/favicon.ico",
  },
  category: "shopping",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={`${figtree.className} antialiased`}>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
          >
            {children}

            <Toaster richColors position="top-center" />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
