"use client";

import { useState } from "react";

export default function RemoveRaydiumV3Page() {
  const [lpAddress, setLpAddress] = useState("");
  const [pct, setPct] = useState(100);

  return (
    <div style={{ padding: "40px", maxWidth: "700px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "20px",
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
            Remove — Raydium V3
          </h1>
          <div
            style={{
              fontSize: "12px",
              color: "#64748b",
              fontFamily: "monospace",
            }}
          >
            CLMM Position NFT
          </div>
        </div>
      </div>

      <div
        style={{
          background: "rgba(59,130,246,0.06)",
          border: "1px solid rgba(59,130,246,0.2)",
          borderRadius: "12px",
          padding: "14px 18px",
          marginBottom: "20px",
          display: "flex",
          gap: "10px",
          fontSize: "13px",
          color: "#94a3b8",
        }}
      >
        <span>ℹ️</span>
        <span>
          V3 positions are NFTs. If price is outside your range, you may only
          receive one token type (impermanent loss).
        </span>
      </div>

      <div
        style={{
          background: "rgba(239,68,68,0.06)",
          border: "1px solid rgba(239,68,68,0.15)",
          borderRadius: "12px",
          padding: "14px 18px",
          marginBottom: "24px",
          display: "flex",
          gap: "10px",
          fontSize: "13px",
          color: "#94a3b8",
        }}
      >
        <span>🚧</span>
        <div>
          <strong style={{ color: "#ef4444" }}>
            SDK Integration Coming Soon.
          </strong>{" "}
          Use{" "}
          <a
            href="https://raydium.io/portfolio/"
            target="_blank"
            rel="noreferrer"
            style={{ color: "#3b82f6" }}
          >
            Raydium Portfolio ↗
          </a>{" "}
          to manage positions now.
        </div>
      </div>

      <div
        style={{
          background: "#141c26",
          border: "1px solid #1e2d42",
          borderRadius: "18px",
          padding: "28px",
          opacity: 0.7,
        }}
      >
        <div style={{ marginBottom: "20px" }}>
          <label style={lbl}>LP Position Address / Pool ID</label>
          <input
            style={inp}
            placeholder="Enter your V3 position address..."
            value={lpAddress}
            onChange={(e) => setLpAddress(e.target.value)}
            disabled
          />
          <span
            style={{
              fontSize: "11.5px",
              color: "#64748b",
              fontFamily: "monospace",
            }}
          >
            Find in Raydium Portfolio or your wallet NFTs
          </span>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={lbl}>Remove Percentage</label>
          <div
            style={{
              display: "flex",
              gap: "8px",
              marginBottom: "10px",
              flexWrap: "wrap" as const,
            }}
          >
            {[25, 50, 75, 100].map((p) => (
              <button
                key={p}
                disabled
                style={{
                  background: pct === p ? "rgba(59,130,246,0.2)" : "#111720",
                  border: `1px solid ${pct === p ? "#3b82f6" : "#1e2d42"}`,
                  borderRadius: "8px",
                  padding: "6px 14px",
                  fontSize: "13px",
                  color: pct === p ? "#3b82f6" : "#94a3b8",
                  cursor: "not-allowed",
                }}
              >
                {p}%
              </button>
            ))}
          </div>
          <input
            type="range"
            min="1"
            max="100"
            value={pct}
            onChange={(e) => setPct(Number(e.target.value))}
            disabled
            style={{
              width: "100%",
              accentColor: "#3b82f6",
              cursor: "not-allowed",
            }}
          />
          <div
            style={{
              textAlign: "center" as const,
              fontFamily: "monospace",
              fontSize: "14px",
              fontWeight: 700,
              color: "#3b82f6",
              marginTop: "6px",
            }}
          >
            {pct}%
          </div>
        </div>

        <div
          style={{
            background: "#111720",
            border: "1px solid #1e2d42",
            borderRadius: "10px",
            padding: "14px 16px",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              fontSize: "12px",
              color: "#64748b",
              fontFamily: "monospace",
              marginBottom: "10px",
            }}
          >
            Est. You Will Receive
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "13px",
              padding: "4px 0",
            }}
          >
            <span style={{ color: "#94a3b8" }}>Your Token</span>
            <span style={{ color: "#64748b", fontFamily: "monospace" }}>
              — (depends on pool)
            </span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "13px",
              padding: "4px 0",
            }}
          >
            <span style={{ color: "#94a3b8" }}>SOL</span>
            <span style={{ color: "#64748b", fontFamily: "monospace" }}>
              — (depends on price)
            </span>
          </div>
        </div>

        <button
          disabled
          style={{
            width: "100%",
            background: "#253347",
            color: "#64748b",
            border: "none",
            borderRadius: "12px",
            padding: "14px",
            fontSize: "15px",
            fontWeight: 700,
            cursor: "not-allowed",
          }}
        >
          🔓 Remove Liquidity (Coming Soon)
        </button>
      </div>

      <div style={{ marginTop: "16px", textAlign: "center" as const }}>
        <a
          href="https://raydium.io/portfolio/"
          target="_blank"
          rel="noreferrer"
          style={{
            background: "linear-gradient(135deg,#3b82f6,#1d4ed8)",
            color: "#fff",
            borderRadius: "10px",
            padding: "11px 24px",
            fontSize: "13.5px",
            fontWeight: 700,
            textDecoration: "none",
            display: "inline-block",
          }}
        >
          Manage on Raydium Portfolio ↗
        </a>
      </div>
    </div>
  );
}

const lbl: React.CSSProperties = {
  display: "block",
  fontSize: "12px",
  fontWeight: 600,
  color: "#94a3b8",
  fontFamily: "monospace",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
  marginBottom: "6px",
};
const inp: React.CSSProperties = {
  width: "100%",
  background: "#0d1117",
  border: "1px solid #1e2d42",
  borderRadius: "10px",
  padding: "10px 14px",
  color: "#e2e8f0",
  fontSize: "14px",
  outline: "none",
  fontFamily: "inherit",
  cursor: "not-allowed",
  marginBottom: "4px",
};
