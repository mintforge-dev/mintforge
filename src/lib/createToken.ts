import {
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import {
  createInitializeMintInstruction,
  createAssociatedTokenAccountInstruction,
  createMintToInstruction,
  getAssociatedTokenAddress,
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
  getMinimumBalanceForRentExemptMint,
  createSetAuthorityInstruction,
  AuthorityType,
} from "@solana/spl-token";
import { uploadImageToIPFS, uploadMetadataToIPFS } from "./pinata";

const METADATA_PROGRAM_ID = new PublicKey(
  "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s",
);

export interface CreateTokenParams {
  name: string;
  symbol: string;
  description: string;
  decimals: number;
  supply: number;
  logoFile: File | null;
  logoUrl?: string;
  website?: string;
  twitter?: string;
  telegram?: string;
  discord?: string;
  revokeMint: boolean;
  revokeFreeze: boolean;
  immutableMetadata: boolean;
  connection: Connection;
  walletPublicKey: PublicKey;
  signTransaction: (tx: Transaction) => Promise<Transaction>;
  sendTransaction: (
    tx: Transaction,
    connection: Connection,
    mintKeypair?: Keypair,
  ) => Promise<string>;
}

export interface CreateTokenResult {
  mintAddress: string;
  txSignature: string;
  metadataUri: string;
}

// ── Build metadata instruction manually ──
const buildMetadataInstruction = (
  metadataPDA: PublicKey,
  mintAddress: PublicKey,
  walletPublicKey: PublicKey,
  name: string,
  symbol: string,
  metadataUri: string,
  isMutable: boolean,
): TransactionInstruction => {
  const nameBytes = Buffer.from(name, "utf8");
  const symbolBytes = Buffer.from(symbol, "utf8");
  const uriBytes = Buffer.from(metadataUri, "utf8");

  const data = Buffer.alloc(
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
      1,
  );

  let offset = 0;
  data.writeUInt8(33, offset);
  offset += 1;
  data.writeUInt32LE(nameBytes.length, offset);
  offset += 4;
  nameBytes.copy(data, offset);
  offset += nameBytes.length;
  data.writeUInt32LE(symbolBytes.length, offset);
  offset += 4;
  symbolBytes.copy(data, offset);
  offset += symbolBytes.length;
  data.writeUInt32LE(uriBytes.length, offset);
  offset += 4;
  uriBytes.copy(data, offset);
  offset += uriBytes.length;
  data.writeUInt16LE(0, offset);
  offset += 2;
  data.writeUInt8(0, offset);
  offset += 1;
  data.writeUInt8(0, offset);
  offset += 1;
  data.writeUInt8(0, offset);
  offset += 1;
  data.writeUInt8(isMutable ? 1 : 0, offset);
  offset += 1;
  data.writeUInt8(0, offset);

  return new TransactionInstruction({
    programId: METADATA_PROGRAM_ID,
    keys: [
      { pubkey: metadataPDA, isSigner: false, isWritable: true },
      { pubkey: mintAddress, isSigner: false, isWritable: false },
      { pubkey: walletPublicKey, isSigner: true, isWritable: false },
      { pubkey: walletPublicKey, isSigner: true, isWritable: true },
      { pubkey: walletPublicKey, isSigner: false, isWritable: false },
      {
        pubkey: new PublicKey("11111111111111111111111111111111"),
        isSigner: false,
        isWritable: false,
      },
      {
        pubkey: new PublicKey("SysvarRent111111111111111111111111111111111"),
        isSigner: false,
        isWritable: false,
      },
    ],
    data,
  });
};

export const createToken = async (params: CreateTokenParams): Promise<CreateTokenResult> => {
  const {
    name,
    symbol,
    description,
    decimals,
    supply,
    logoFile,
    logoUrl,
    website,
    twitter,
    telegram,
    discord,
    revokeMint,
    revokeFreeze,
    immutableMetadata,
    connection,
    walletPublicKey,
    sendTransaction,
  } = params;

  // ── Step 1: Upload logo ──
  let imageUri = logoUrl || "";
  if (logoFile) {
    imageUri = await uploadImageToIPFS(logoFile);
  }

  // ── Step 2: Upload metadata ──
  const metadata = {
    name,
    symbol,
    description,
    image: imageUri,
    attributes: [],
    properties: {
      files: [{ uri: imageUri, type: "image/png" }],
      category: "image",
    },
    extensions: {
      website: website || "",
      twitter: twitter || "",
      telegram: telegram || "",
      discord: discord || "",
    },
  };

  const metadataUri = await uploadMetadataToIPFS(metadata);

  // ── Step 3: Generate mint keypair ──
  const mintKeypair = Keypair.generate();
  const lamports = await getMinimumBalanceForRentExemptMint(connection);

  // ── Step 4: Get ATA ──
  const associatedTokenAddress = await getAssociatedTokenAddress(
    mintKeypair.publicKey,
    walletPublicKey,
  );

  // ── Step 5: Derive metadata PDA ──
  const [metadataPDA] = PublicKey.findProgramAddressSync(
    [
      Buffer.from("metadata"),
      METADATA_PROGRAM_ID.toBuffer(),
      mintKeypair.publicKey.toBuffer(),
    ],
    METADATA_PROGRAM_ID,
  );

  const mintAmount = supply * Math.pow(10, decimals);

  // ── Step 6: Build ONE transaction with ALL instructions ──
  // Order: create → init → ATA → mint → metadata → revoke
  const transaction = new Transaction();

  // 1. Create mint account
  transaction.add(
    SystemProgram.createAccount({
      fromPubkey: walletPublicKey,
      newAccountPubkey: mintKeypair.publicKey,
      space: MINT_SIZE,
      lamports,
      programId: TOKEN_PROGRAM_ID,
    }),
  );

  // 2. Initialize mint
  transaction.add(
    createInitializeMintInstruction(
      mintKeypair.publicKey,
      decimals,
      walletPublicKey,
      walletPublicKey,
      TOKEN_PROGRAM_ID,
    ),
  );

  // 3. Create ATA
  transaction.add(
    createAssociatedTokenAccountInstruction(
      walletPublicKey,
      associatedTokenAddress,
      walletPublicKey,
      mintKeypair.publicKey,
    ),
  );

  // 4. Mint tokens to wallet
  transaction.add(
    createMintToInstruction(
      mintKeypair.publicKey,
      associatedTokenAddress,
      walletPublicKey,
      mintAmount,
    ),
  );

  // 5. Add metadata BEFORE revoke (mint authority still valid here)
  transaction.add(
    buildMetadataInstruction(
      metadataPDA,
      mintKeypair.publicKey,
      walletPublicKey,
      name,
      symbol,
      metadataUri,
      !immutableMetadata,
    ),
  );

  // 6. Revoke mint authority AFTER metadata (order matters!)
  if (revokeMint) {
    transaction.add(
      createSetAuthorityInstruction(
        mintKeypair.publicKey,
        walletPublicKey,
        AuthorityType.MintTokens,
        null,
      ),
    );
  }

  // 7. Revoke freeze authority
  if (revokeFreeze) {
    transaction.add(
      createSetAuthorityInstruction(
        mintKeypair.publicKey,
        walletPublicKey,
        AuthorityType.FreezeAccount,
        null,
      ),
    );
  }

  // ── Step 7: Send transaction ──
  // partialSign mintKeypair dilakukan di sendTx
  const signature = await sendTransaction(transaction, connection, mintKeypair);

  return {
    mintAddress: mintKeypair.publicKey.toString(),
    txSignature: signature,
    metadataUri,
  };
};;
