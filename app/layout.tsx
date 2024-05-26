import type { Metadata } from "next";
import {Poppins} from "next/font/google";
import "./global.css";
import React from "react";

const font = Poppins({weight: "100", subsets: ["latin"]});

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
