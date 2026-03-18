"use client";

import { useState } from "react";

export default function RemoveMeteora() {
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
            background: "rgba(168,85,247,0.15)",
            border: "1px solid rgba(168,85,247,0.3)",
            borderRadius: "9px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "18px",
          }}
        >
          ☄️
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
            Remove — Meteora
          </h1>
          <div
            style={{
              fontSize: "12px",
              color: "#64748b",
              fontFamily: "monospace",
            }}
          >
            DLMM Position
          </div>
        </div>
      </div>

      <div
        style={{
          background: "rgba(168,85,247,0.06)",
          border: "1px solid rgba(168,85,247,0.2)",
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
          Meteora DLMM — fees are automatically claimed when you remove
          liquidity from your position.
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
            href="https://app.meteora.ag"
            target="_blank"
            rel="noreferrer"
            style={{ color: "#a855f7" }}
          >
            Meteora directly ↗
          </a>{" "}
          now.
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
          <label style={lbl}>Pool / Position Address</label>
          <input
            style={inp}
            placeholder="Enter your Meteora position address..."
            disabled
          />
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
                  background: pct === p ? "rgba(168,85,247,0.2)" : "#111720",
                  border: `1px solid ${pct === p ? "#a855f7" : "#1e2d42"}`,
                  borderRadius: "8px",
                  padding: "6px 14px",
                  fontSize: "13px",
                  color: pct === p ? "#a855f7" : "#94a3b8",
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
              accentColor: "#a855f7",
              cursor: "not-allowed",
            }}
          />
          <div
            style={{
              textAlign: "center" as const,
              fontFamily: "monospace",
              fontSize: "14px",
              fontWeight: 700,
              color: "#a855f7",
              marginTop: "6px",
            }}
          >
            {pct}%
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
          href="https://app.meteora.ag"
          target="_blank"
          rel="noreferrer"
          style={{
            background: "linear-gradient(135deg,#a855f7,#7c3aed)",
            color: "#fff",
            borderRadius: "10px",
            padding: "11px 24px",
            fontSize: "13.5px",
            fontWeight: 700,
            textDecoration: "none",
            display: "inline-block",
          }}
        >
          Manage on Meteora ↗
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
