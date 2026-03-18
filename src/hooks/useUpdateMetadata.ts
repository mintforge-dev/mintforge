import { useState } from "react";
import { useConnection } from "@solana/wallet-adapter-react";
import {
  PublicKey,
  Transaction,
  Connection,
  TransactionInstruction,
} from "@solana/web3.js";
import { uploadImageToIPFS, uploadMetadataToIPFS } from "@/lib/pinata";
import { SERVICE_FEES, TREASURY_WALLET } from "@/lib/constants";
import { SystemProgram, LAMPORTS_PER_SOL } from "@solana/web3.js";

const METADATA_PROGRAM_ID = new PublicKey(
  "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s",
);

// Fixed offset for isMutable byte in Metaplex metadata account
const METADATA_IS_MUTABLE_OFFSET =
  1 + // key
  32 + // updateAuthority
  32 + // mint
  36 + // name (4 len + 32 max padded)
  14 + // symbol (4 len + 10 max padded)
  204 + // uri (4 len + 200 max padded)
  2 + // seller_fee_basis_points
  1 + // creators option
  1 + // collection option
  1; // uses option

export type UpdateMetaStatus =
  | "idle"
  | "fetching"
  | "uploading_image"
  | "uploading_metadata"
  | "sending_fee"
  | "updating"
  | "success"
  | "error";

export interface CurrentMetadata {
  name: string;
  symbol: string;
  description: string;
  image: string;
  uri: string;
  website: string;
  twitter: string;
  telegram: string;
  discord: string;
  updateAuthority: string;
  isMutable: boolean;
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
): Promise<string> => {
  const provider = getWalletProvider();
  if (!provider) throw new Error("No wallet connected");

  const { blockhash, lastValidBlockHeight } =
    await connection.getLatestBlockhash();
  transaction.recentBlockhash = blockhash;
  transaction.feePayer = new PublicKey(provider.publicKey.toString());

  const { signature } = await provider.signAndSendTransaction(transaction);
  await connection.confirmTransaction(
    { blockhash, lastValidBlockHeight, signature },
    "confirmed",
  );
  return signature;
};

export const useUpdateMetadata = () => {
  const { connection } = useConnection();
  const [status, setStatus] = useState<UpdateMetaStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [currentMeta, setCurrentMeta] = useState<CurrentMetadata | null>(null);
  const [txSignature, setTxSignature] = useState<string | null>(null);

  const fetchCurrentMetadata = async (mintAddress: string) => {
    if (!mintAddress.trim()) {
      setError("Please enter a mint address");
      return;
    }

    try {
      setStatus("fetching");
      setError(null);
      setCurrentMeta(null);

      const mintPubkey = new PublicKey(mintAddress.trim());

      const [metadataPDA] = PublicKey.findProgramAddressSync(
        [
          Buffer.from("metadata"),
          METADATA_PROGRAM_ID.toBuffer(),
          mintPubkey.toBuffer(),
        ],
        METADATA_PROGRAM_ID,
      );

      const metadataAccount = await connection.getAccountInfo(metadataPDA);
      if (!metadataAccount) throw new Error("No metadata found for this token");

      const buffer = metadataAccount.data;

      // Parse name, symbol, uri — variable length
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

      const name = readString();
      const symbol = readString();
      const uri = readString();

      // updateAuthority at bytes 1-33
      const updateAuthority = new PublicKey(
        metadataAccount.data.slice(1, 33),
      ).toString();

      // isMutable at fixed offset
      let isMutable = true;
      try {
        isMutable = metadataAccount.data[METADATA_IS_MUTABLE_OFFSET] === 1;
      } catch {
        isMutable = true;
      }

      // Fetch off-chain metadata
      let description = "";
      let image = "";
      let website = "";
      let twitter = "";
      let telegram = "";
      let discord = "";

      if (uri) {
        try {
          const fetchUri = uri.startsWith("ipfs://")
            ? uri.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/")
            : uri;
          const res = await fetch(fetchUri);
          if (res.ok) {
            const json = await res.json();
            description = json.description || "";
            image = json.image || "";
            website = json.extensions?.website || json.external_url || "";
            twitter = json.extensions?.twitter || "";
            telegram = json.extensions?.telegram || "";
            discord = json.extensions?.discord || "";
          }
        } catch {
          // Off-chain fetch failed
        }
      }

      setCurrentMeta({
        name,
        symbol,
        description,
        image,
        uri,
        website,
        twitter,
        telegram,
        discord,
        updateAuthority,
        isMutable,
      });

      setStatus("idle");
    } catch (err: any) {
      setError(err?.message || "Failed to fetch metadata");
      setStatus("error");
    }
  };

  const updateMetadata = async (
    mintAddress: string,
    updates: {
      name: string;
      symbol: string;
      description: string;
      logoFile: File | null;
      website: string;
      twitter: string;
      telegram: string;
      discord: string;
    },
  ) => {
    const provider = getWalletProvider();
    if (!provider?.publicKey) {
      setError("Wallet not connected");
      setStatus("error");
      return;
    }

    if (!currentMeta) {
      setError("Fetch current metadata first");
      return;
    }

    if (!currentMeta.isMutable) {
      setError("This token metadata is immutable and cannot be updated");
      setStatus("error");
      return;
    }

    const walletPublicKey = new PublicKey(provider.publicKey.toString());
    const mintPubkey = new PublicKey(mintAddress.trim());

    try {
      setError(null);
      setTxSignature(null);

      // Upload new logo if provided
      let imageUri = currentMeta.image;
      if (updates.logoFile) {
        setStatus("uploading_image");
        imageUri = await uploadImageToIPFS(updates.logoFile);
      }

      // Upload new metadata JSON
      setStatus("uploading_metadata");
      const newMetadata = {
        name: updates.name || currentMeta.name,
        symbol: updates.symbol || currentMeta.symbol,
        description: updates.description,
        image: imageUri,
        attributes: [],
        properties: {
          files: [{ uri: imageUri, type: "image/png" }],
          category: "image",
        },
        extensions: {
          website: updates.website,
          twitter: updates.twitter,
          telegram: updates.telegram,
          discord: updates.discord,
        },
      };

      const newMetadataUri = await uploadMetadataToIPFS(newMetadata);

      // Service fee
      setStatus("sending_fee");
      if (TREASURY_WALLET && SERVICE_FEES.updateMeta > 0) {
        const feeTx = new Transaction().add(
          SystemProgram.transfer({
            fromPubkey: walletPublicKey,
            toPubkey: new PublicKey(TREASURY_WALLET),
            lamports: Math.floor(SERVICE_FEES.updateMeta * LAMPORTS_PER_SOL),
          }),
        );
        await sendTx(feeTx, connection);
      }

      // Build UpdateMetadataAccountV2 instruction
      setStatus("updating");

      const [metadataPDA] = PublicKey.findProgramAddressSync(
        [
          Buffer.from("metadata"),
          METADATA_PROGRAM_ID.toBuffer(),
          mintPubkey.toBuffer(),
        ],
        METADATA_PROGRAM_ID,
      );

      const nameBytes = Buffer.from(updates.name || currentMeta.name, "utf8");
      const symbolBytes = Buffer.from(
        updates.symbol || currentMeta.symbol,
        "utf8",
      );
      const uriBytes = Buffer.from(newMetadataUri, "utf8");

      const dataBuffer = Buffer.alloc(
        1 +
          1 +
          4 +
          nameBytes.length +
          4 +
          symbolBytes.length +
          4 +
          uriBytes.length +
          2 +
          1 +
          1 +
          1 +
          1 +
          1 +
          1,
      );

      let off = 0;
      dataBuffer.writeUInt8(15, off);
      off += 1; // discriminator
      dataBuffer.writeUInt8(1, off);
      off += 1; // data = Some
      dataBuffer.writeUInt32LE(nameBytes.length, off);
      off += 4;
      nameBytes.copy(dataBuffer, off);
      off += nameBytes.length;
      dataBuffer.writeUInt32LE(symbolBytes.length, off);
      off += 4;
      symbolBytes.copy(dataBuffer, off);
      off += symbolBytes.length;
      dataBuffer.writeUInt32LE(uriBytes.length, off);
      off += 4;
      uriBytes.copy(dataBuffer, off);
      off += uriBytes.length;
      dataBuffer.writeUInt16LE(0, off);
      off += 2; // seller_fee
      dataBuffer.writeUInt8(0, off);
      off += 1; // creators = None
      dataBuffer.writeUInt8(0, off);
      off += 1; // collection = None
      dataBuffer.writeUInt8(0, off);
      off += 1; // uses = None
      dataBuffer.writeUInt8(0, off);
      off += 1; // new_update_authority = None
      dataBuffer.writeUInt8(0, off);
      off += 1; // primary_sale_happened = None
      dataBuffer.writeUInt8(0, off); // is_mutable = None

      const updateIx = new TransactionInstruction({
        programId: METADATA_PROGRAM_ID,
        keys: [
          { pubkey: metadataPDA, isSigner: false, isWritable: true },
          { pubkey: walletPublicKey, isSigner: true, isWritable: false },
        ],
        data: dataBuffer,
      });

      const transaction = new Transaction().add(updateIx);
      const signature = await sendTx(transaction, connection);

      setTxSignature(signature);
      setCurrentMeta((prev) =>
        prev
          ? {
              ...prev,
              name: updates.name || prev.name,
              symbol: updates.symbol || prev.symbol,
              description: updates.description,
              image: imageUri,
              uri: newMetadataUri,
              website: updates.website,
              twitter: updates.twitter,
              telegram: updates.telegram,
              discord: updates.discord,
            }
          : null,
      );

      setStatus("success");
    } catch (err: any) {
      console.error("Update metadata error:", err);
      setError(err?.message || "Update failed");
      setStatus("error");
    }
  };

  const reset = () => {
    setStatus("idle");
    setError(null);
    setCurrentMeta(null);
    setTxSignature(null);
  };

  return {
    fetchCurrentMetadata,
    updateMetadata,
    status,
    error,
    currentMeta,
    txSignature,
    reset,
  };
};
