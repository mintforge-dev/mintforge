import { useConnection } from "@solana/wallet-adapter-react";
import { useNetwork } from "@/components/WalletProvider";
import {
  PublicKey,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import { TREASURY_WALLET, SERVICE_FEES } from "@/lib/constants";

const getProvider = () => {
  if (typeof window === "undefined") return null;
  const phantom = (window as any)?.phantom?.solana;
  if (phantom?.isConnected) return phantom;
  const solflare = (window as any)?.solflare;
  if (solflare?.isConnected) return solflare;
  const okx = (window as any)?.okxwallet?.solana;
  if (okx?.isConnected) return okx;
  return null;
};

export const useSolana = () => {
  const { connection } = useConnection();
  const { network, setNetwork } = useNetwork();

  const provider = typeof window !== "undefined" ? getProvider() : null;
  const publicKey = provider?.publicKey
    ? new PublicKey(provider.publicKey.toString())
    : null;
  const connected = !!publicKey;

  const sendTransaction = async (
    tx: Transaction,
    conn = connection,
  ): Promise<string> => {
    if (!provider || !publicKey) throw new Error("Wallet not connected");
    const { blockhash, lastValidBlockHeight } = await conn.getLatestBlockhash();
    tx.recentBlockhash = blockhash;
    tx.feePayer = publicKey;
    const signed = await provider.signTransaction(tx);
    const signature = await conn.sendRawTransaction(signed.serialize());
    await conn.confirmTransaction(
      { blockhash, lastValidBlockHeight, signature },
      "confirmed",
    );
    return signature;
  };

  const sendServiceFee = async (feeType: keyof typeof SERVICE_FEES) => {
    if (!publicKey || !TREASURY_WALLET) return null;
    const tx = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: new PublicKey(TREASURY_WALLET),
        lamports: Math.floor(SERVICE_FEES[feeType] * LAMPORTS_PER_SOL),
      }),
    );
    return sendTransaction(tx);
  };

  const getBalance = async (): Promise<number> => {
    if (!publicKey) return 0;
    return (await connection.getBalance(publicKey)) / LAMPORTS_PER_SOL;
  };

  const checkBalance = async (requiredSOL: number): Promise<boolean> => {
    return (await getBalance()) >= requiredSOL;
  };

  return {
    connection,
    publicKey,
    connected,
    sendTransaction,
    sendServiceFee,
    getBalance,
    checkBalance,
    network,
    setNetwork,
  };
};
