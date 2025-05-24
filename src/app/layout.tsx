import { Figtree } from "next/font/google";

import { Toaster } from "sonner";

import "./globals.css";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${figtree.className} antialiased`}>
        {children}

        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
