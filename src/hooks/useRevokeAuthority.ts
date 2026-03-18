import { useState } from "react";
import { useConnection } from "@solana/wallet-adapter-react";
import {
  PublicKey,
  Transaction,
  Connection,
  Keypair,
  TransactionInstruction,
} from "@solana/web3.js";
import {
  createSetAuthorityInstruction,
  AuthorityType,
} from "@solana/spl-token";
import { SERVICE_FEES, TREASURY_WALLET } from "@/lib/constants";
import { SystemProgram, LAMPORTS_PER_SOL } from "@solana/web3.js";

const METADATA_PROGRAM_ID = new PublicKey(
  "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s",
);

// Metaplex pads strings to max length — offset is fixed
const METADATA_IS_MUTABLE_OFFSET =
  1 + // key
  32 + // updateAuthority
  32 + // mint
  36 + // name (4 len + 32 max)
  14 + // symbol (4 len + 10 max)
  204 + // uri (4 len + 200 max)
  2 + // seller_fee_basis_points
  1 + // creators option
  1 + // collection option
  1; // uses option

export type RevokeStatus =
  | "idle"
  | "checking"
  | "revoking"
  | "success"
  | "error";

export interface AuthorityInfo {
  mintAuthority: string | null;
  freezeAuthority: string | null;
  updateAuthority: string | null;
  isMutable: boolean;
  decimals: number;
  supply: string;
  name: string;
  symbol: string;
}

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

  if (mintKeypair) transaction.partialSign(mintKeypair);

  const { signature } = await provider.signAndSendTransaction(transaction);
  await connection.confirmTransaction(
    { blockhash, lastValidBlockHeight, signature },
    "confirmed",
  );
  return signature;
};

export const useRevokeAuthority = () => {
  const { connection } = useConnection();
  const [status, setStatus] = useState<RevokeStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [authorityInfo, setAuthorityInfo] = useState<AuthorityInfo | null>(
    null,
  );
  const [revokedList, setRevokedList] = useState<string[]>([]);

  const fetchAuthorityInfo = async (mintAddress: string) => {
    if (!mintAddress.trim()) {
      setError("Please enter a mint address");
      return;
    }

    try {
      setStatus("checking");
      setError(null);
      setAuthorityInfo(null);
      setRevokedList([]);

      const mintPubkey = new PublicKey(mintAddress.trim());

      // Fetch mint account
      const mintInfo = await connection.getParsedAccountInfo(mintPubkey);
      if (!mintInfo.value) throw new Error("Token not found on this network");
      const mintData = (mintInfo.value.data as any)?.parsed?.info;
      if (!mintData) throw new Error("Could not parse mint data");

      // Derive metadata PDA
      const [metadataPDA] = PublicKey.findProgramAddressSync(
        [
          Buffer.from("metadata"),
          METADATA_PROGRAM_ID.toBuffer(),
          mintPubkey.toBuffer(),
        ],
        METADATA_PROGRAM_ID,
      );

      let name = "Unknown";
      let symbol = "???";
      let updateAuthority: string | null = null;
      let isMutable = false;

      const metadataAccount = await connection.getAccountInfo(metadataPDA);
      if (metadataAccount) {
        const buffer = metadataAccount.data;

        // Parse name and symbol
        let offset = 1 + 32 + 32;
        const readString = (): string => {
          const len = buffer.readUInt32LE(offset);
          offset += 4;
          const str = buffer
            .slice(offset, offset + len)
            .toString("utf8")
            .replace(/\0/g, "")
            .trim();
          offset += len;
          return str;
        };
        name = readString();
        symbol = readString();

        // updateAuthority at bytes 1-33
        updateAuthority = new PublicKey(
          metadataAccount.data.slice(1, 33),
        ).toString();

        // isMutable at fixed offset
        try {
          isMutable = metadataAccount.data[METADATA_IS_MUTABLE_OFFSET] === 1;
        } catch {
          isMutable = true;
        }
      }

      setAuthorityInfo({
        mintAuthority: mintData.mintAuthority ?? null,
        freezeAuthority: mintData.freezeAuthority ?? null,
        updateAuthority,
        isMutable,
        decimals: mintData.decimals,
        supply: mintData.supply,
        name,
        symbol,
      });

      setStatus("idle");
    } catch (err: any) {
      setError(err?.message || "Failed to fetch token info");
      setStatus("error");
    }
  };

  const revokeAuthority = async (
    mintAddress: string,
    authorityType: "mint" | "freeze" | "metadata",
  ) => {
    const provider = getWalletProvider();
    if (!provider?.publicKey) {
      setError("Wallet not connected");
      return;
    }

    const walletPublicKey = new PublicKey(provider.publicKey.toString());
    const mintPubkey = new PublicKey(mintAddress.trim());

    try {
      setStatus("revoking");
      setError(null);

      // Service fee
      if (TREASURY_WALLET && SERVICE_FEES.revoke > 0) {
        const feeTx = new Transaction().add(
          SystemProgram.transfer({
            fromPubkey: walletPublicKey,
            toPubkey: new PublicKey(TREASURY_WALLET),
            lamports: Math.floor(SERVICE_FEES.revoke * LAMPORTS_PER_SOL),
          }),
        );
        await sendTx(feeTx, connection);
      }

      if (authorityType === "mint") {
        const tx = new Transaction().add(
          createSetAuthorityInstruction(
            mintPubkey,
            walletPublicKey,
            AuthorityType.MintTokens,
            null,
          ),
        );
        await sendTx(tx, connection);
        setRevokedList((prev) => [...prev, "mint"]);
        setAuthorityInfo((prev) =>
          prev ? { ...prev, mintAuthority: null } : null,
        );
      } else if (authorityType === "freeze") {
        const tx = new Transaction().add(
          createSetAuthorityInstruction(
            mintPubkey,
            walletPublicKey,
            AuthorityType.FreezeAccount,
            null,
          ),
        );
        await sendTx(tx, connection);
        setRevokedList((prev) => [...prev, "freeze"]);
        setAuthorityInfo((prev) =>
          prev ? { ...prev, freezeAuthority: null } : null,
        );
      } else if (authorityType === "metadata") {
        const [metadataPDA] = PublicKey.findProgramAddressSync(
          [
            Buffer.from("metadata"),
            METADATA_PROGRAM_ID.toBuffer(),
            mintPubkey.toBuffer(),
          ],
          METADATA_PROGRAM_ID,
        );

        // UpdateMetadataAccountV2 instruction
        // Discriminator = 15 (UpdateMetadataAccountV2)
        // Set isMutable = false, keep everything else null (no change)
        const data = Buffer.alloc(1 + 1 + 1 + 1 + 1);
        let offset = 0;

        // instruction discriminator = 15
        data.writeUInt8(15, offset);
        offset += 1;
        // data option = 0 (None — don't change name/symbol/uri)
        data.writeUInt8(0, offset);
        offset += 1;
        // update_authority option = 0 (None — don't change)
        data.writeUInt8(0, offset);
        offset += 1;
        // primary_sale_happened option = 0 (None)
        data.writeUInt8(0, offset);
        offset += 1;
        // is_mutable option = 1 (Some) + value = 0 (false)
        data.writeUInt8(1, offset);
        offset += 1;

        // Append the actual bool value (false = 0)
        const fullData = Buffer.concat([data, Buffer.from([0])]);

        const ix = new TransactionInstruction({
          programId: METADATA_PROGRAM_ID,
          keys: [
            { pubkey: metadataPDA, isSigner: false, isWritable: true },
            { pubkey: walletPublicKey, isSigner: true, isWritable: false },
          ],
          data: fullData,
        });

        const tx = new Transaction();

        // Add compute budget to avoid timeout
        const { ComputeBudgetProgram } = await import("@solana/web3.js");
        tx.add(
          ComputeBudgetProgram.setComputeUnitLimit({ units: 100_000 }),
          ComputeBudgetProgram.setComputeUnitPrice({ microLamports: 1_000 }),
          ix,
        );

        await sendTx(tx, connection);
        setRevokedList((prev) => [...prev, "metadata"]);
        setAuthorityInfo((prev) =>
          prev ? { ...prev, isMutable: false } : null,
        );
      }

      setStatus("success");
      setTimeout(() => setStatus("idle"), 2000);
    } catch (err: any) {
      console.error("Revoke error:", err);
      setError(err?.message || "Revoke failed");
      setStatus("error");
    }
  };

  const revokeAll = async (mintAddress: string) => {
    const provider = getWalletProvider();
    if (!provider?.publicKey) {
      setError("Wallet not connected");
      return;
    }

    if (!authorityInfo) {
      setError("Fetch token info first");
      return;
    }

    const walletPublicKey = new PublicKey(provider.publicKey.toString());
    const mintPubkey = new PublicKey(mintAddress.trim());

    try {
      setStatus("revoking");
      setError(null);

      const transaction = new Transaction();

      if (authorityInfo.mintAuthority) {
        transaction.add(
          createSetAuthorityInstruction(
            mintPubkey,
            walletPublicKey,
            AuthorityType.MintTokens,
            null,
          ),
        );
      }

      if (authorityInfo.freezeAuthority) {
        transaction.add(
          createSetAuthorityInstruction(
            mintPubkey,
            walletPublicKey,
            AuthorityType.FreezeAccount,
            null,
          ),
        );
      }

      if (transaction.instructions.length > 0) {
        await sendTx(transaction, connection);
      }

      setRevokedList(["mint", "freeze"]);
      setAuthorityInfo((prev) =>
        prev ? { ...prev, mintAuthority: null, freezeAuthority: null } : null,
      );

      setStatus("success");
      setTimeout(() => setStatus("idle"), 2000);
    } catch (err: any) {
      console.error("Revoke all error:", err);
      setError(err?.message || "Revoke all failed");
      setStatus("error");
    }
  };

  const reset = () => {
    setStatus("idle");
    setError(null);
    setAuthorityInfo(null);
    setRevokedList([]);
  };

  return {
    fetchAuthorityInfo,
    revokeAuthority,
    revokeAll,
    status,
    error,
    authorityInfo,
    revokedList,
    reset,
  };
};
