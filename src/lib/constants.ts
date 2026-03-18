import { clusterApiUrl } from "@solana/web3.js";

export const NETWORKS = {
  mainnet: {
    name: "Mainnet",
    endpoint:
      process.env.NEXT_PUBLIC_SOLANA_RPC_MAINNET ||
      "https://api.mainnet-beta.solana.com",
    cluster: "mainnet-beta" as const,
  },
  devnet: {
    name: "Devnet",
    endpoint:
      process.env.NEXT_PUBLIC_SOLANA_RPC_DEVNET ||
      "https://api.devnet.solana.com",
    cluster: "devnet" as const,
  },
};

export const DEFAULT_NETWORK = "mainnet" as const;

export const TREASURY_WALLET = process.env.NEXT_PUBLIC_TREASURY_WALLET || "";

export const SERVICE_FEES = {
  createToken: parseFloat(process.env.NEXT_PUBLIC_FEE_CREATE_TOKEN || "0"),
  cloneToken: parseFloat(process.env.NEXT_PUBLIC_FEE_CLONE_TOKEN || "0"),
  addLiquidity: parseFloat(process.env.NEXT_PUBLIC_FEE_ADD_LIQUIDITY || "0"),
  revoke: parseFloat(process.env.NEXT_PUBLIC_FEE_REVOKE || "0"),
  updateMeta: parseFloat(process.env.NEXT_PUBLIC_FEE_UPDATE_META || "0"),
};

export const LAMPORTS_PER_SOL = 1_000_000_000;
