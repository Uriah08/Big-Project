import type { Metadata } from "next";
import "./globals.css";

import { Poppins } from 'next/font/google'

import React from "react";

import { ThemeProvider } from "@/components/theme-provider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100","200","300", "400", "500", "600", "700", "800", "900"],
})

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.className} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="class"
          enableSystem disableTransitionOnChange
          >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
