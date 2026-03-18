import { useState } from "react";
import { useConnection } from "@solana/wallet-adapter-react";
import { PublicKey, Transaction, Connection, Keypair } from "@solana/web3.js";
import { useNetwork } from "@/components/WalletProvider";
import { fetchTokenMetadata, TokenMetadata } from "@/lib/fetchTokenMetadata";
import { createToken, CreateTokenResult } from "@/lib/createToken";
import { SERVICE_FEES, TREASURY_WALLET } from "@/lib/constants";
import { SystemProgram, LAMPORTS_PER_SOL } from "@solana/web3.js";

export type CloneStatus =
  | "idle"
  | "fetching"
  | "ready"
  | "sending_fee"
  | "cloning"
  | "success"
  | "error";

const getWalletProvider = () => {
  if (typeof window === "undefined") return null;
  const phantom = (window as any)?.phantom?.solana;
  if (phantom?.isConnected) return phantom;
  const solflare = (window as any)?.solflare;
  if (solflare?.isConnected) return solflare;
  const okx = (window as any)?.okxwallet?.solana;
  if (okx?.isConnected) return okx;
  return null;
};

const sendTx = async (
  transaction: Transaction,
  connection: Connection,
  mintKeypair?: Keypair,
): Promise<string> => {
  const provider = getWalletProvider();
  if (!provider) throw new Error("No wallet connected");

  const { blockhash, lastValidBlockHeight } =
    await connection.getLatestBlockhash();
  transaction.recentBlockhash = blockhash;
  transaction.feePayer = new PublicKey(provider.publicKey.toString());

  if (mintKeypair) {
    transaction.partialSign(mintKeypair);
  }

  const { signature } = await provider.signAndSendTransaction(transaction);

  await connection.confirmTransaction(
    { blockhash, lastValidBlockHeight, signature },
    "confirmed",
  );

  return signature;
};

export const useCloneToken = () => {
  const { connection } = useConnection();
  const [status, setStatus] = useState<CloneStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [fetchedMeta, setFetchedMeta] = useState<TokenMetadata | null>(null);
  const [result, setResult] = useState<CreateTokenResult | null>(null);

  // ── Fetch metadata dari token yang mau di-clone ──
  const fetchMeta = async (mintAddress: string) => {
    if (!mintAddress.trim()) {
      setError("Please enter a mint address");
      return;
    }
    try {
      setStatus("fetching");
      setError(null);
      setFetchedMeta(null);
      const meta = await fetchTokenMetadata(mintAddress.trim(), connection);
      setFetchedMeta(meta);
      setStatus("ready");
    } catch (err: any) {
      setError(err?.message || "Failed to fetch token metadata");
      setStatus("error");
    }
  };

  // ── Clone token ──
  const clone = async (overrides: {
    name?: string;
    symbol?: string;
    supply?: number;
    decimals?: number;
    revokeMint?: boolean;
    revokeFreeze?: boolean;
    immutableMetadata?: boolean;
  }) => {
    const provider = getWalletProvider();
    if (!provider?.publicKey) {
      setError("Wallet not connected");
      setStatus("error");
      return;
    }

    if (!fetchedMeta) {
      setError("Please fetch token metadata first");
      setStatus("error");
      return;
    }

    const walletPublicKey = new PublicKey(provider.publicKey.toString());

    try {
      setError(null);
      setResult(null);

      // Cek saldo
      const balance = await connection.getBalance(walletPublicKey);
      if (balance / LAMPORTS_PER_SOL < 0.1) {
        setError("Insufficient SOL balance. Need at least 0.1 SOL.");
        setStatus("error");
        return;
      }

      // Service fee
      setStatus("sending_fee");
      if (TREASURY_WALLET && SERVICE_FEES.cloneToken > 0) {
        const feeTx = new Transaction().add(
          SystemProgram.transfer({
            fromPubkey: walletPublicKey,
            toPubkey: new PublicKey(TREASURY_WALLET),
            lamports: Math.floor(SERVICE_FEES.cloneToken * LAMPORTS_PER_SOL),
          }),
        );
        await sendTx(feeTx, connection);
      }

      // Clone = Create token baru dengan metadata dari token asli
      setStatus("cloning");
      const cloneResult = await createToken({
        name: overrides.name || fetchedMeta.name,
        symbol: overrides.symbol || fetchedMeta.symbol,
        description: fetchedMeta.description,
        decimals: overrides.decimals ?? fetchedMeta.decimals,
        supply: overrides.supply ?? fetchedMeta.supply ?? 1_000_000_000,
        logoFile: null,
        logoUrl: fetchedMeta.image, // pakai image dari token asli
        website: fetchedMeta.website,
        twitter: fetchedMeta.twitter,
        telegram: fetchedMeta.telegram,
        discord: fetchedMeta.discord,
        revokeMint: overrides.revokeMint ?? true,
        revokeFreeze: overrides.revokeFreeze ?? true,
        immutableMetadata: overrides.immutableMetadata ?? false,
        connection,
        walletPublicKey,
        signTransaction: async (tx) => tx,
        sendTransaction: (tx, conn, kp) => sendTx(tx, conn, kp),
      });

      setResult(cloneResult);
      setStatus("success");
    } catch (err: any) {
      console.error("Clone error:", err);
      setError(err?.message || "Clone failed");
      setStatus("error");
    }
  };

  const reset = () => {
    setStatus("idle");
    setError(null);
    setFetchedMeta(null);
    setResult(null);
  };

  return { fetchMeta, clone, status, error, fetchedMeta, result, reset };
};
