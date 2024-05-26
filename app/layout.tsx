import type { Metadata } from "next";
import { Bad_Script } from "next/font/google";
import "./global.css";
import React from "react";

const font = Bad_Script({weight: "400", subsets: ["latin"]});

export const metadata: Metadata = {
  title: "AI Story Teller",
  description: "Procedural story generation using AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  );
}
