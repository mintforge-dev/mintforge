import { useState } from "react";
import { useConnection } from "@solana/wallet-adapter-react";
import { PublicKey, Transaction, Connection, Keypair } from "@solana/web3.js";
import {
  createToken,
  CreateTokenParams,
  CreateTokenResult,
} from "@/lib/createToken";
import { SERVICE_FEES, TREASURY_WALLET } from "@/lib/constants";
import { SystemProgram, LAMPORTS_PER_SOL } from "@solana/web3.js";

export type CreateTokenStatus =
  | "idle"
  | "uploading_image"
  | "uploading_metadata"
  | "creating_token"
  | "adding_metadata"
  | "sending_fee"
  | "confirming"
  | "success"
  | "error";

// ── Helper: get connected wallet provider ──
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

// ── Helper: send transaction via window wallet ──
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

  // Partial sign dengan mintKeypair kalau ada
  if (mintKeypair) {
    transaction.partialSign(mintKeypair);
  }

  // Pakai signAndSendTransaction — lebih reliable dari Phantom
  const { signature } = await provider.signAndSendTransaction(transaction);

  await connection.confirmTransaction(
    { blockhash, lastValidBlockHeight, signature },
    "confirmed",
  );

  return signature;
};

export const useCreateToken = () => {
  const { connection } = useConnection();
  const [status, setStatus] = useState<CreateTokenStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<CreateTokenResult | null>(null);

  const create = async (
    params: Omit<
      CreateTokenParams,
      "connection" | "walletPublicKey" | "signTransaction" | "sendTransaction"
    >,
  ) => {
    const provider = getWalletProvider();

    if (!provider || !provider.publicKey) {
      setError("Wallet not connected. Please connect your wallet first.");
      setStatus("error");
      return;
    }

    const walletPublicKey = new PublicKey(provider.publicKey.toString());

    try {
      setError(null);
      setResult(null);

      // ── Cek saldo ──
      const balance = await connection.getBalance(walletPublicKey);
      const balanceSOL = balance / LAMPORTS_PER_SOL;
      if (balanceSOL < 0.1) {
        setError(
          `Insufficient balance. You have ${balanceSOL.toFixed(4)} SOL, need at least 0.1 SOL.`,
        );
        setStatus("error");
        return;
      }

      // ── Kirim service fee ──
      setStatus("sending_fee");
      if (TREASURY_WALLET) {
        try {
          const feeTx = new Transaction().add(
            SystemProgram.transfer({
              fromPubkey: walletPublicKey,
              toPubkey: new PublicKey(TREASURY_WALLET),
              lamports: Math.floor(SERVICE_FEES.createToken * LAMPORTS_PER_SOL),
            }),
          );
          await sendTx(feeTx, connection);
        } catch (feeErr) {
          console.warn("Service fee failed, continuing...", feeErr);
        }
      }

      // ── Create token ──
      setStatus("creating_token");
      const tokenResult = await createToken({
        ...params,
        connection,
        walletPublicKey,
        signTransaction: async (tx) => tx,
        sendTransaction: (tx, conn, kp) => sendTx(tx, conn, kp),
      });

      setResult(tokenResult);
      setStatus("success");
    } catch (err: any) {
      console.error("Create token error:", err);
      setError(
        err?.message || "Something went wrong. Check console for details.",
      );
      setStatus("error");
    }
  };

  const reset = () => {
    setStatus("idle");
    setError(null);
    setResult(null);
  };

  return { create, status, error, result, reset };
};
