"use client";

import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { useMemo, useState, createContext, useContext } from "react";

type NetworkType = "mainnet" | "devnet";

interface NetworkContextType {
  network: NetworkType;
  setNetwork: (n: NetworkType) => void;
  endpoint: string;
}

export const NetworkContext = createContext<NetworkContextType>({
  network: "mainnet",
  setNetwork: () => {},
  endpoint:
    process.env.NEXT_PUBLIC_SOLANA_RPC_MAINNET ||
    "https://api.mainnet-beta.solana.com",
});

export const useNetwork = () => useContext(NetworkContext);

export default function AppWalletProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [network, setNetwork] = useState<NetworkType>("mainnet");

  const endpoint = useMemo(() => {
    return network === "mainnet"
      ? process.env.NEXT_PUBLIC_SOLANA_RPC_MAINNET ||
          "https://api.mainnet-beta.solana.com"
      : process.env.NEXT_PUBLIC_SOLANA_RPC_DEVNET ||
          "https://api.devnet.solana.com";
  }, [network]);

  return (
    <NetworkContext.Provider value={{ network, setNetwork, endpoint }}>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={[]} autoConnect={false}>
          {children}
        </WalletProvider>
      </ConnectionProvider>
    </NetworkContext.Provider>
  );
}
