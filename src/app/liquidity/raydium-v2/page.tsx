'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';

export default function RaydiumV2LiquidityPage() {
  const [step, setStep] = useState<'info' | 'redirect'>('info');

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", padding: "48px 24px" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "28px",
        }}
      >
        <Link
          href="/liquidity"
          style={{
            color: "var(--text3)",
            textDecoration: "none",
            fontSize: "13px",
            fontFamily: "var(--font-mono)",
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          ← Back
        </Link>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "24px",
        }}
      >
        <div
          style={{
            width: "44px",
            height: "44px",
            background:
              "linear-gradient(135deg,rgba(249,115,22,0.2),rgba(249,115,22,0.05))",
            border: "1px solid rgba(249,115,22,0.3)",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "22px",
          }}
        >
          🔥
        </div>
        <div>
          <h1
            style={{
              fontFamily: "var(--font-head)",
              fontWeight: 800,
              fontSize: "22px",
              color: "var(--text)",
              lineHeight: 1,
            }}
          >
            Raydium V2 AMM
          </h1>
          <div
            style={{
              fontSize: "12px",
              color: "var(--text3)",
              fontFamily: "var(--font-mono)",
            }}
          >
            AMM Classic · x×y=k · Full Range Liquidity
          </div>
        </div>
        <span
          style={{
            marginLeft: "auto",
            background: "rgba(249,115,22,0.15)",
            border: "1px solid rgba(249,115,22,0.3)",
            color: "var(--accent)",
            fontSize: "11px",
            fontWeight: 700,
            padding: "4px 12px",
            borderRadius: "20px",
            fontFamily: "var(--font-mono)",
          }}
        >
          Meme Coin ✓
        </span>
      </div>

      {/* Why V2 */}
      <div
        style={{
          background: "var(--surface)",
          border: "1px solid rgba(249,115,22,0.2)",
          borderRadius: "16px",
          padding: "20px",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            fontWeight: 700,
            color: "var(--accent)",
            fontSize: "14px",
            marginBottom: "14px",
          }}
        >
          🔥 Why Raydium V2 for Meme Coins?
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "8px",
          }}
        >
          {[
            { ok: true, text: "LP always active at any price" },
            { ok: true, text: "No need to manage price range" },
            { ok: true, text: "Huge user base & volume" },
            { ok: true, text: "Set and forget strategy" },
            { ok: false, text: "Costs ~2.3 SOL to setup" },
            { ok: false, text: "Requires OpenBook Market ID" },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "13px",
                color: "var(--text2)",
              }}
            >
              <span
                style={{
                  color: item.ok ? "var(--green)" : "var(--red)",
                  flexShrink: 0,
                }}
              >
                {item.ok ? "✅" : "❌"}
              </span>
              {item.text}
            </div>
          ))}
        </div>
      </div>

      {/* Steps */}
      <div
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "16px",
          padding: "20px",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            fontWeight: 700,
            color: "var(--text)",
            fontSize: "14px",
            marginBottom: "14px",
          }}
        >
          📋 Setup Steps on Raydium
        </div>
        {[
          {
            n: "1",
            title: "Go to Raydium CPMM",
            desc: "Open Raydium pool creation page",
            cost: "Free",
          },
          {
            n: "2",
            title: "Initialize CPMM Pool",
            desc: "Create pool — no OpenBook needed",
            cost: "~0.20 SOL",
          },
          {
            n: "3",
            title: "Add Initial Liquidity",
            desc: "Deposit token + SOL to activate pool",
            cost: "0.5 SOL (kamu)",
          },
          {
            n: "4",
            title: "Live on Jupiter & Raydium",
            desc: "Token bisa di-trade dalam ~5 menit",
            cost: "~5 min",
          },
        ].map((step) => (
          <div
            key={step.n}
            style={{
              display: "flex",
              gap: "12px",
              padding: "10px 0",
              borderBottom: "1px solid var(--border)",
            }}
          >
            <div
              style={{
                width: "24px",
                height: "24px",
                background: "rgba(249,115,22,0.15)",
                border: "1px solid rgba(249,115,22,0.25)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "11px",
                fontWeight: 700,
                color: "var(--accent)",
                fontFamily: "var(--font-mono)",
                flexShrink: 0,
                marginTop: "2px",
              }}
            >
              {step.n}
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: "13.5px",
                  fontWeight: 600,
                  color: "var(--text)",
                  marginBottom: "2px",
                }}
              >
                {step.title}
              </div>
              <div style={{ fontSize: "12px", color: "var(--text3)" }}>
                {step.desc}
              </div>
            </div>
            <div
              style={{
                fontSize: "12px",
                color: "var(--text2)",
                fontFamily: "var(--font-mono)",
                flexShrink: 0,
              }}
            >
              {step.cost}
            </div>
          </div>
        ))}
      </div>

      {/* Fee summary */}
      <div
        style={{
          background: "var(--bg2)",
          border: "1px solid var(--border)",
          borderRadius: "12px",
          padding: "16px 18px",
          marginBottom: "24px",
        }}
      >
        <div
          style={{
            fontSize: "11px",
            fontWeight: 600,
            color: "var(--text3)",
            fontFamily: "var(--font-mono)",
            textTransform: "uppercase",
            letterSpacing: "1px",
            marginBottom: "10px",
          }}
        >
          Total Estimated Cost
        </div>
        {[
          { label: "Pool Creation Fee", val: "~0.20 SOL" },
          { label: "Network Rent", val: "~0.04 SOL" },
          { label: "Initial Liquidity", val: "Your amount" },
          { label: "MintForge Service Fee", val: "0.10 SOL" },
          { label: "Network tx fee", val: "~0.000005 SOL" },
        ].map((r) => (
          <div
            key={r.label}
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "13px",
              padding: "4px 0",
              borderBottom: "1px solid var(--border)",
            }}
          >
            <span style={{ color: "var(--text2)" }}>{r.label}</span>
            <span
              style={{ color: "var(--text)", fontFamily: "var(--font-mono)" }}
            >
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
          <span style={{ color: "var(--text)" }}>Total (excl. liquidity)</span>
          <span
            style={{ color: "var(--accent)", fontFamily: "var(--font-mono)" }}
          >
            ~0.34 SOL
          </span>
        </div>
      </div>

      {/* Redirect button */}
      <a
        href="https://raydium.io/liquidity/create-pool/?defaultPath=standard"
        target="_blank"
        rel="noreferrer"
        style={{ textDecoration: "none", display: "block" }}
      >
        <button
          style={{
            width: "100%",
            background: "linear-gradient(135deg,#f97316,#c2410c)",
            color: "#fff",
            border: "none",
            borderRadius: "13px",
            padding: "15px",
            fontSize: "15px",
            fontWeight: 700,
            fontFamily: "var(--font-body)",
            cursor: "pointer",
            boxShadow: "0 4px 20px rgba(249,115,22,0.35)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          🔥 Create Pool on Raydium V2 ↗
        </button>
      </a>
      <p
        style={{
          textAlign: "center",
          fontSize: "12px",
          color: "var(--text3)",
          fontFamily: "var(--font-mono)",
          marginTop: "10px",
        }}
      >
        Opens Raydium in new tab · SDK integration coming soon
      </p>
    </div>
  );
}