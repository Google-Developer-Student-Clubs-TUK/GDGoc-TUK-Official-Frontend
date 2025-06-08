import type { Metadata } from "next";
import "./globals.css";
import TanStackProvider from "./_providers/TanStackProvider";

export const metadata: Metadata = {
  title: "GDGoC TUK",
  description: "GDGoC TUK Homepage",
};

import { Allura } from "next/font/google";

const allura = Allura({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-allura',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" className={allura.variable}>
      <body>
        {" "}
        <TanStackProvider>{children}</TanStackProvider>
      </body>
    </html>
  );
}
