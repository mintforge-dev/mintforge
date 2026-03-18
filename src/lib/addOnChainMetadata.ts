import {
  Connection,
  PublicKey,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";

// Program ID Metaplex Token Metadata (hardcode — tidak berubah)
const METADATA_PROGRAM_ID = new PublicKey(
  "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s",
);

export const addOnChainMetadata = async ({
  connection,
  walletPublicKey,
  mintAddress,
  name,
  symbol,
  metadataUri,
  isMutable,
  sendTransaction,
}: {
  connection: Connection;
  walletPublicKey: PublicKey;
  mintAddress: PublicKey;
  name: string;
  symbol: string;
  metadataUri: string;
  isMutable: boolean;
  sendTransaction: (tx: Transaction, connection: Connection) => Promise<string>;
}) => {
  // Derive metadata PDA manual
  const [metadataPDA] = PublicKey.findProgramAddressSync(
    [
      Buffer.from("metadata"),
      METADATA_PROGRAM_ID.toBuffer(),
      mintAddress.toBuffer(),
    ],
    METADATA_PROGRAM_ID,
  );

  // Encode instruction data manual (CreateMetadataAccountV3)
  const nameBytes = Buffer.from(name, "utf8");
  const symbolBytes = Buffer.from(symbol, "utf8");
  const uriBytes = Buffer.from(metadataUri, "utf8");

  // Build data buffer
  const data = Buffer.alloc(
    1 + // instruction discriminator (33 = CreateMetadataAccountV3)
      4 +
      nameBytes.length +
      4 +
      symbolBytes.length +
      4 +
      uriBytes.length +
      2 + // seller_fee_basis_points
      1 + // creators option (None)
      1 + // collection option (None)
      1 + // uses option (None)
      1 + // is_mutable
      1, // collection_details option (None)
  );

  let offset = 0;
  data.writeUInt8(33, offset);
  offset += 1; // discriminator

  // name
  data.writeUInt32LE(nameBytes.length, offset);
  offset += 4;
  nameBytes.copy(data, offset);
  offset += nameBytes.length;

  // symbol
  data.writeUInt32LE(symbolBytes.length, offset);
  offset += 4;
  symbolBytes.copy(data, offset);
  offset += symbolBytes.length;

  // uri
  data.writeUInt32LE(uriBytes.length, offset);
  offset += 4;
  uriBytes.copy(data, offset);
  offset += uriBytes.length;

  // seller_fee_basis_points
  data.writeUInt16LE(0, offset);
  offset += 2;

  // creators = None
  data.writeUInt8(0, offset);
  offset += 1;

  // collection = None
  data.writeUInt8(0, offset);
  offset += 1;

  // uses = None
  data.writeUInt8(0, offset);
  offset += 1;

  // is_mutable
  data.writeUInt8(isMutable ? 1 : 0, offset);
  offset += 1;

  // collection_details = None
  data.writeUInt8(0, offset);

  const instruction = new TransactionInstruction({
    programId: METADATA_PROGRAM_ID,
    keys: [
      { pubkey: metadataPDA, isSigner: false, isWritable: true },
      { pubkey: mintAddress, isSigner: false, isWritable: false },
      { pubkey: walletPublicKey, isSigner: true, isWritable: false }, // mint authority
      { pubkey: walletPublicKey, isSigner: true, isWritable: true }, // payer
      { pubkey: walletPublicKey, isSigner: false, isWritable: false }, // update authority
      {
        pubkey: new PublicKey("11111111111111111111111111111111"),
        isSigner: false,
        isWritable: false,
      }, // system program
      {
        pubkey: new PublicKey("SysvarRent111111111111111111111111111111111"),
        isSigner: false,
        isWritable: false,
      }, // rent
    ],
    data,
  });

  const transaction = new Transaction().add(instruction);
  const { blockhash, lastValidBlockHeight } =
    await connection.getLatestBlockhash();
  transaction.recentBlockhash = blockhash;
  transaction.feePayer = walletPublicKey;

  const signature = await sendTransaction(transaction, connection);
  await connection.confirmTransaction(
    { blockhash, lastValidBlockHeight, signature },
    "confirmed",
  );

  return { signature, metadataPDA: metadataPDA.toString() };
};
