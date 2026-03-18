import { Connection, PublicKey } from "@solana/web3.js";

const METADATA_PROGRAM_ID = new PublicKey(
  "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s",
);

export interface TokenMetadata {
  name: string;
  symbol: string;
  description: string;
  image: string;
  uri: string;
  mintAddress: string;
  decimals: number;
  supply: number;
  website?: string;
  twitter?: string;
  telegram?: string;
  discord?: string;
}

export const fetchTokenMetadata = async (
  mintAddress: string,
  connection: Connection,
): Promise<TokenMetadata> => {
  // ── Step 1: Validate mint address ──
  let mintPubkey: PublicKey;
  try {
    mintPubkey = new PublicKey(mintAddress);
  } catch {
    throw new Error("Invalid mint address");
  }

  // ── Step 2: Fetch mint info (decimals + supply) ──
  const mintInfo = await connection.getParsedAccountInfo(mintPubkey);
  if (!mintInfo.value) throw new Error("Token not found on this network");

  const mintData = (mintInfo.value.data as any)?.parsed?.info;
  if (!mintData) throw new Error("Could not parse mint data");

  const decimals = mintData.decimals ?? 9;
  const supply = parseInt(mintData.supply ?? "0") / Math.pow(10, decimals);

  // ── Step 3: Derive metadata PDA ──
  const [metadataPDA] = PublicKey.findProgramAddressSync(
    [
      Buffer.from("metadata"),
      METADATA_PROGRAM_ID.toBuffer(),
      mintPubkey.toBuffer(),
    ],
    METADATA_PROGRAM_ID,
  );

  // ── Step 4: Fetch metadata account ──
  const metadataAccount = await connection.getAccountInfo(metadataPDA);
  if (!metadataAccount) {
    // Token exists but no metadata — return basic info
    return {
      name: "Unknown Token",
      symbol: "???",
      description: "",
      image: "",
      uri: "",
      mintAddress,
      decimals,
      supply,
    };
  }

  // ── Step 5: Parse metadata account data ──
  // Skip first 1 byte (key) + 32 bytes (updateAuthority) + 32 bytes (mint)
  const buffer = metadataAccount.data;
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

  // ── Step 6: Fetch off-chain metadata from URI ──
  let description = "";
  let image = "";
  let website = "";
  let twitter = "";
  let telegram = "";
  let discord = "";

  if (uri) {
    try {
      // Convert IPFS URI if needed
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
      // Off-chain fetch failed — use on-chain data only
    }
  }

  return {
    name,
    symbol,
    description,
    image,
    uri,
    mintAddress,
    decimals,
    supply,
    website,
    twitter,
    telegram,
    discord,
  };
};
