'use client';

import { useState } from 'react';
import WalletButton from '@/components/WalletButton';

export default function RaydiumV3Page() {
  const [tokenAddress, setTokenAddress] = useState('');
  const [pairWith, setPairWith] = useState('SOL');
  const [tokenAmt, setTokenAmt] = useState('');
  const [solAmt, setSolAmt] = useState('');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [feeTier, setFeeTier] = useState('0.25');

  const price = tokenAmt && solAmt
    ? (parseFloat(solAmt) / parseFloat(tokenAmt)).toFixed(8)
    : '';

  return (
    <div style={{ padding: "40px", maxWidth: "1000px" }}>
      <div style={{ marginBottom: "28px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "12px",
          }}
        >
          <div
            style={{
              width: "36px",
              height: "36px",
              background: "rgba(59,130,246,0.15)",
              border: "1px solid rgba(59,130,246,0.3)",
              borderRadius: "9px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "18px",
            }}
          >
            ⚡
          </div>
          <div>
            <h1
              style={{
                fontWeight: 800,
                fontSize: "22px",
                color: "#e2e8f0",
                lineHeight: 1,
              }}
            >
              Raydium V3 CLMM
            </h1>
            <div
              style={{
                fontSize: "12px",
                color: "#64748b",
                fontFamily: "monospace",
              }}
            >
              Concentrated Liquidity · No OpenBook ID required
            </div>
          </div>
        </div>

        {/* Coming Soon Banner */}
        <div
          style={{
            background: "rgba(59,130,246,0.06)",
            border: "1px solid rgba(59,130,246,0.2)",
            borderRadius: "12px",
            padding: "14px 18px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "24px",
          }}
        >
          <span style={{ fontSize: "20px" }}>🚧</span>
          <div>
            <div
              style={{
                fontWeight: 600,
                color: "#3b82f6",
                fontSize: "13.5px",
                marginBottom: "3px",
              }}
            >
              SDK Integration Coming Soon
            </div>
            <div style={{ fontSize: "12.5px", color: "#94a3b8" }}>
              Raydium V3 requires Mainnet SOL. Integration will be live after
              deployment. In the meantime, you can use{" "}
              <a
                href="https://raydium.io/liquidity/create-pool/"
                target="_blank"
                rel="noreferrer"
                style={{ color: "#3b82f6" }}
              >
                Raydium directly ↗
              </a>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 300px",
          gap: "24px",
          alignItems: "start",
        }}
      >
        <div
          style={{
            background: "#141c26",
            border: "1px solid #1e2d42",
            borderRadius: "18px",
            padding: "28px",
            opacity: 0.7,
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
              marginBottom: "16px",
            }}
          >
            <div>
              <label style={label}>DEX</label>
              <input style={input} value="Raydium V3 CLMM" disabled />
            </div>
            <div>
              <label style={label}>Fee Tier</label>
              <select
                style={input}
                value={feeTier}
                onChange={(e) => setFeeTier(e.target.value)}
                disabled
              >
                <option value="0.01">0.01% — Stablecoin</option>
                <option value="0.05">0.05% — Low volatility</option>
                <option value="0.25">0.25% — Standard</option>
                <option value="1">1% — High volatility</option>
              </select>
            </div>
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label style={label}>Token Address</label>
            <input
              style={input}
              placeholder="Your token mint address..."
              value={tokenAddress}
              onChange={(e) => setTokenAddress(e.target.value)}
              disabled
            />
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label style={label}>Pair With</label>
            <select
              style={input}
              value={pairWith}
              onChange={(e) => setPairWith(e.target.value)}
              disabled
            >
              <option>SOL</option>
              <option>USDC</option>
              <option>USDT</option>
            </select>
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label style={label}>Price Range</label>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px",
              }}
            >
              <input
                style={input}
                placeholder="Min Price"
                value={priceMin}
                onChange={(e) => setPriceMin(e.target.value)}
                disabled
              />
              <input
                style={input}
                placeholder="Max Price"
                value={priceMax}
                onChange={(e) => setPriceMax(e.target.value)}
                disabled
              />
            </div>
            <div
              style={{
                fontSize: "12px",
                color: "#64748b",
                marginTop: "6px",
                fontFamily: "monospace",
              }}
            >
              💡 Set wide range for new volatile tokens
            </div>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
            }}
          >
            <div>
              <label style={label}>Token Amount</label>
              <input
                style={input}
                type="number"
                placeholder="0.00"
                value={tokenAmt}
                onChange={(e) => setTokenAmt(e.target.value)}
                disabled
              />
            </div>
            <div>
              <label style={label}>SOL Amount</label>
              <input
                style={input}
                type="number"
                placeholder="0.00"
                value={solAmt}
                onChange={(e) => setSolAmt(e.target.value)}
                disabled
              />
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div
          style={{
            display: "flex",
            flexDirection: "column" as const,
            gap: "14px",
          }}
        >
          <div
            style={{
              background: "#111720",
              border: "1px solid #1e2d42",
              borderRadius: "12px",
              padding: "16px 18px",
            }}
          >
            <div
              style={{
                fontSize: "11px",
                fontWeight: 600,
                color: "#64748b",
                fontFamily: "monospace",
                textTransform: "uppercase" as const,
                letterSpacing: "1px",
                marginBottom: "12px",
              }}
            >
              Setup Steps
            </div>
            {[
              { label: "Set Price Range", cost: "Free" },
              { label: "Initialize CLMM Pool", cost: "~0.3 SOL" },
              { label: "Deposit Token Pair", cost: "Your tokens" },
              { label: "Live on Jupiter & DEXs", cost: "~5 min" },
            ].map((s) => (
              <div
                key={s.label}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "13px",
                  padding: "5px 0",
                  borderBottom: "1px solid #1e2d42",
                }}
              >
                <span
                  style={{
                    color: "#94a3b8",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <span style={{ color: "#22c55e" }}>✓</span>
                  {s.label}
                </span>
                <span
                  style={{
                    color: "#e2e8f0",
                    fontFamily: "monospace",
                    fontSize: "12px",
                  }}
                >
                  {s.cost}
                </span>
              </div>
            ))}
          </div>

          <div
            style={{
              background: "#111720",
              border: "1px solid #1e2d42",
              borderRadius: "12px",
              padding: "16px 18px",
            }}
          >
            <div
              style={{
                fontSize: "11px",
                fontWeight: 600,
                color: "#64748b",
                fontFamily: "monospace",
                textTransform: "uppercase" as const,
                letterSpacing: "1px",
                marginBottom: "10px",
              }}
            >
              Est. Cost
            </div>
            {[
              { label: "Init Pool", val: "0.3 SOL" },
              { label: "Service Fee", val: "0.1 SOL" },
            ].map((r) => (
              <div
                key={r.label}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "13px",
                  padding: "4px 0",
                  borderBottom: "1px solid #1e2d42",
                }}
              >
                <span style={{ color: "#94a3b8" }}>{r.label}</span>
                <span style={{ color: "#e2e8f0", fontFamily: "monospace" }}>
                  {r.val}
                </span>
              </div>
            ))}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "14px",
                fontWeight: 700,
                padding: "8px 0 0",
              }}
            >
              <span style={{ color: "#e2e8f0" }}>Total</span>
              <span style={{ color: "#3b82f6", fontFamily: "monospace" }}>
                ~0.4 SOL
              </span>
            </div>
          </div>

          <a
            href="https://raydium.io/liquidity/create-pool/"
            target="_blank"
            rel="noreferrer"
            style={{
              background: "linear-gradient(135deg,#3b82f6,#1d4ed8)",
              color: "#fff",
              borderRadius: "12px",
              padding: "14px",
              fontSize: "14px",
              fontWeight: 700,
              textDecoration: "none",
              textAlign: "center" as const,
              display: "block",
            }}
          >
            Open Raydium V3 ↗
          </a>
          <p
            style={{
              fontSize: "11.5px",
              color: "#64748b",
              textAlign: "center" as const,
              fontFamily: "monospace",
            }}
          >
            SDK integration coming soon
          </p>
        </div>
      </div>
    </div>
  );
}

const label: React.CSSProperties = { display: 'block', fontSize: '12px', fontWeight: 600, color: '#94a3b8', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' };
const input: React.CSSProperties = { width: '100%', background: '#0d1117', border: '1px solid #1e2d42', borderRadius: '10px', padding: '10px 14px', color: '#e2e8f0', fontSize: '14px', outline: 'none', fontFamily: 'inherit', marginBottom: '4px', cursor: 'not-allowed' };