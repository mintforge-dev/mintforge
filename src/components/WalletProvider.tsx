"use client";

import {
  FC,
  ReactNode,
  useMemo,
  useState,
  createContext,
  useContext,
} from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  CoinbaseWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { clusterApiUrl } from "@solana/web3.js";
import { NETWORKS } from "@/lib/constants";
import "@solana/wallet-adapter-react-ui/styles.css";

type Network = "mainnet" | "devnet" | "testnet";

interface NetworkContextType {
  network: Network;
  setNetwork: (n: Network) => void;
  endpoint: string;
}

const NetworkContext = createContext<NetworkContextType>({
  network: "devnet",
  setNetwork: () => {},
  endpoint: clusterApiUrl("devnet"),
});

export const useNetwork = () => useContext(NetworkContext);

const AppWalletProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [network, setNetwork] = useState<Network>("devnet");

  const endpoint = useMemo(() => {
    if (network === "mainnet") return NETWORKS.mainnet;
    if (network === "devnet") return NETWORKS.devnet;
    return clusterApiUrl("testnet");
  }, [network]);

  // Wallet adapter otomatis detect ekstensi yang terinstall di browser
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new CoinbaseWalletAdapter(),
    ],
    [],
  );

  // OKX, Backpack, Trust Wallet, dll otomatis terdeteksi via Wallet Standard
  // tidak perlu import manual

  return (
    <NetworkContext.Provider value={{ network, setNetwork, endpoint }}>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect={false}>
          <WalletModalProvider>{children}</WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </NetworkContext.Provider>
  );
};

export default AppWalletProvider;
