import type { Metadata } from "next";
import "./globals.css";
import TanStackProvider from "./_providers/TanStackProvider";

export const metadata: Metadata = {
  title: "GDGoC TUK",
  description: "GDGoC TUK Homepage",
};

import { Noto_Serif_KR } from "next/font/google";

const serifKR = Noto_Serif_KR({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-serifKR",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={serifKR.variable}>
      <body>
        {" "}
        <TanStackProvider>{children}</TanStackProvider>
      </body>
    </html>
  );
}
