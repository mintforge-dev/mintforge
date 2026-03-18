# MintForge ⚒

> Solana Token Factory — Create, Clone & Manage SPL Tokens

[![Deploy](https://img.shields.io/badge/deploy-vercel-black)](https://mintforge.vercel.app)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

## Features

- ⚡ **Create Token** — Deploy SPL token in minutes
- 🔥 **Clone Token** — Copy any token metadata
- 💧 **Add Liquidity** — Raydium CPMM pools
- 🔒 **Lock LP** — Via Streamflow (Mainnet)
- 🛡 **Revoke Authority** — Mint, Freeze & Metadata
- ✏️ **Creator Info** — Update token metadata

## Tech Stack

- Next.js 16 (App Router)
- Solana web3.js + SPL Token
- Metaplex Token Metadata
- Pinata IPFS
- Tailwind CSS

## Getting Started

\`\`\`bash
git clone https://github.com/USERNAME/mintforge
cd mintforge
npm install
cp .env.example .env.local
# Fill in your env vars
npm run dev
\`\`\`

## Environment Variables

\`\`\`env
NEXT_PUBLIC_SOLANA_RPC_MAINNET=
NEXT_PUBLIC_SOLANA_RPC_DEVNET=
NEXT_PUBLIC_PINATA_JWT=
NEXT_PUBLIC_TREASURY_WALLET=
\`\`\`

## Security

- No private keys stored
- All transactions signed by user wallet
- Open source & auditable
- Uses only trusted Solana programs

## License

MIT
```

---

### 🎯 Roadmap Selanjutnya
```
Phase 1 (sekarang) ✅
├── Core token features
├── Deploy production
└── Basic UI polish

Phase 2 (next)
├── Custom domain
├── Mainnet testing dengan SOL asli
├── LP Lock via Streamflow Mainnet
├── Raydium CPMM full integration
└── Phantom trusted apps registration

Phase 3 (future)
├── Rewards/Referral system
├── Token analytics dashboard
├── Multi-wallet support
└── Token scanner/checker tool