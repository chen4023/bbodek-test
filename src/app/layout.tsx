import type { Metadata } from "next";
import { pretendard } from "@/lib/fonts";
import "./globals.css";


export const metadata: Metadata = {
  title: "뽀득",
  description: "뽀득 식판 관리 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${pretendard.className} antialiased`}>
      <head>
        <link rel="icon" href="/icons/logo-color-symbol.svg" sizes="any" />
      </head>
      <body className="bg-white text-black min-w-[360px] max-w-[480px] mx-auto p-5">
        {children}
      </body>
    </html>
  );
}
