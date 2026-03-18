import type { Metadata } from "next";
import { Syne, DM_Mono, Outfit } from "next/font/google";
import "./globals.css";
import AppWalletProvider from "@/components/WalletProvider";
import AppShell from "@/components/AppShell";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "600", "700", "800"],
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["300", "400", "500"],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "MintForge — Solana Token Factory",
  description:
    "Create, clone, and manage Solana SPL tokens. No coding required.",
  keywords: "solana, token, spl, mint, create token, liquidity pool, raydium",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${syne.variable} ${dmMono.variable} ${outfit.variable}`}
        suppressHydrationWarning
      >
        <AppWalletProvider>
          <AppShell>{children}</AppShell>
        </AppWalletProvider>
      </body>
    </html>
  );
}
