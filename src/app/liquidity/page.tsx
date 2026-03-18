"use client";

import Link from "next/link";

const POOLS = [
  {
    href: "/liquidity/raydium-v3",
    icon: "⚡",
    iconBg: "rgba(59,130,246,0.15)",
    iconBorder: "rgba(59,130,246,0.3)",
    name: "Raydium V3",
    type: "CLMM · Concentrated",
    badge: {
      text: "Coming Soon",
      bg: "rgba(100,116,139,0.15)",
      color: "#64748b",
      border: "1px solid rgba(100,116,139,0.2)",
    },
    disabled: true,
    disabledColor: "var(--accent)",
    disabledTitle: "Temporarily Disabled",
    disabledDesc:
      "CLMM pools are currently unavailable. SDK integration in progress.",
  },
  {
    href: "/liquidity/raydium-v2",
    icon: "🔥",
    iconBg:
      "linear-gradient(135deg,rgba(249,115,22,0.2),rgba(249,115,22,0.05))",
    iconBorder: "rgba(249,115,22,0.3)",
    name: "Raydium V2",
    type: "AMM Classic · x×y=k",
    badge: {
      text: "Most Popular",
      bg: "linear-gradient(135deg,rgba(99,102,241,0.2),rgba(99,102,241,0.05))",
      color: "var(--blue2)",
      border: "1px solid rgba(99,102,241,0.3)",
    },
    disabled: false,
    featured: true,
    desc: "Standard AMM pool with full price range coverage. LP always active at any price.",
    features: ["Simple setup", "Full range liquidity", "Passive income"],
    feeColor: "var(--blue2)",
    btnBg: "linear-gradient(135deg,#6366f1,#4f46e5)",
    btnShadow: "0 4px 20px rgba(99,102,241,0.35)",
    btnLabel: "Create Pool →",
    barBg: "linear-gradient(90deg,#6366f1,#818cf8)",
  },
  {
    href: "/liquidity/meteora",
    icon: "☄️",
    iconBg: "rgba(168,85,247,0.15)",
    iconBorder: "rgba(168,85,247,0.3)",
    name: "Meteora",
    type: "DLMM · Dynamic Fee",
    badge: {
      text: "Coming Soon",
      bg: "rgba(100,116,139,0.15)",
      color: "#64748b",
      border: "1px solid rgba(100,116,139,0.2)",
    },
    disabled: true,
    disabledColor: "var(--purple)",
    disabledTitle: "Temporarily Disabled",
    disabledDesc: "DAMMv2 pools are currently unavailable for maintenance.",
  },
  {
    href: "/liquidity/orca",
    icon: "🌊",
    iconBg: "rgba(6,182,212,0.15)",
    iconBorder: "rgba(6,182,212,0.3)",
    name: "Orca",
    type: "Whirlpool · CLMM",
    badge: {
      text: "Coming Soon",
      bg: "rgba(100,116,139,0.15)",
      color: "#64748b",
      border: "1px solid rgba(100,116,139,0.2)",
    },
    disabled: true,
    disabledColor: "var(--cyan)",
    disabledTitle: "Temporarily Disabled",
    disabledDesc: "Orca Whirlpool integration is currently in development.",
  },
];

export default function LiquidityPage() {
  return (
    <div>
      {/* Hero */}
      <div
        style={{
          textAlign: "center",
          padding: "64px 24px 48px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-40px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "500px",
            height: "200px",
            background:
              "radial-gradient(ellipse,rgba(249,115,22,0.12),transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(249,115,22,0.08)",
            border: "1px solid rgba(249,115,22,0.2)",
            borderRadius: "20px",
            padding: "5px 16px",
            fontSize: "12px",
            fontWeight: 600,
            color: "var(--accent)",
            marginBottom: "20px",
            fontFamily: "var(--font-mono)",
          }}
        >
          💧 Liquidity Pools
        </div>
        <h1
          style={{
            fontFamily: "var(--font-head)",
            fontWeight: 800,
            fontSize: "clamp(28px,5vw,48px)",
            color: "var(--text)",
            marginBottom: "16px",
            lineHeight: 1.1,
          }}
        >
          Create <span style={{ color: "var(--accent)" }}>Liquidity</span> Pool
        </h1>
        <p
          style={{
            color: "var(--text2)",
            fontSize: "15px",
            maxWidth: "500px",
            margin: "0 auto 28px",
            lineHeight: 1.7,
          }}
        >
          Choose your preferred pool type and add liquidity to your token.{" "}
          <span style={{ color: "var(--accent)", fontWeight: 600 }}>
            Simple setup
          </span>{" "}
          with optimal defaults.
        </p>
        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {["⚡ Instant Setup", "🔒 Secure", "💰 Low Fees"].map((b) => (
            <div
              key={b}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                background: "var(--surface)",
                border: "1px solid var(--border2)",
                borderRadius: "20px",
                padding: "6px 14px",
                fontSize: "12.5px",
                color: "var(--text2)",
              }}
            >
              {b}
            </div>
          ))}
        </div>
      </div>

      {/* Pool Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: "16px",
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "0 24px 48px",
        }}
      >
        {POOLS.map((pool) => (
          <PoolCard key={pool.href} pool={pool} />
        ))}
      </div>

      {/* How it works */}
      <div
        style={{ maxWidth: "860px", margin: "0 auto", padding: "0 24px 64px" }}
      >
        <div
          style={{
            fontFamily: "var(--font-head)",
            fontWeight: 700,
            fontSize: "16px",
            color: "var(--text)",
            marginBottom: "20px",
          }}
        >
          ℹ️ How It Works
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
            gap: "14px",
          }}
        >
          {[
            {
              n: "1",
              title: "Select Token",
              desc: "Choose from created tokens or enter mint address",
            },
            {
              n: "2",
              title: "Enter Amounts",
              desc: "Set your token and SOL liquidity amounts",
            },
            {
              n: "3",
              title: "Create Pool",
              desc: "Review and confirm your pool creation",
            },
          ].map((step, i) => {
            const colors = [
              {
                bg: "rgba(249,115,22,0.15)",
                border: "rgba(249,115,22,0.25)",
                color: "var(--accent)",
              },
              {
                bg: "rgba(99,102,241,0.15)",
                border: "rgba(99,102,241,0.25)",
                color: "var(--blue2)",
              },
              {
                bg: "rgba(34,197,94,0.15)",
                border: "rgba(34,197,94,0.25)",
                color: "var(--green)",
              },
            ][i];
            return (
              <div
                key={step.n}
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "14px",
                  padding: "18px",
                  display: "flex",
                  gap: "14px",
                }}
              >
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    background: colors.bg,
                    border: `1px solid ${colors.border}`,
                    color: colors.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "13px",
                    fontWeight: 700,
                    fontFamily: "var(--font-mono)",
                    flexShrink: 0,
                  }}
                >
                  {step.n}
                </div>
                <div>
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "var(--text)",
                      marginBottom: "3px",
                    }}
                  >
                    {step.title}
                  </div>
                  <div
                    style={{
                      fontSize: "12.5px",
                      color: "var(--text3)",
                      lineHeight: 1.5,
                    }}
                  >
                    {step.desc}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function PoolCard({ pool }: { pool: any }) {
  return (
    <div
      style={{
        background: pool.featured
          ? "linear-gradient(160deg,rgba(99,102,241,0.06) 0%,var(--surface) 60%)"
          : "var(--surface)",
        border: `1px solid ${pool.featured ? "rgba(99,102,241,0.3)" : "var(--border)"}`,
        borderRadius: "20px",
        padding: "22px",
        opacity: pool.disabled ? 0.65 : 1,
        transition: "all 0.25s",
        display: "flex",
        flexDirection: "column" as const,
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "13px",
        }}
      >
        <div
          style={{
            width: "42px",
            height: "42px",
            borderRadius: "11px",
            background: pool.iconBg,
            border: `1px solid ${pool.iconBorder}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "19px",
          }}
        >
          {pool.icon}
        </div>
        <span
          style={{
            fontSize: "10px",
            fontWeight: 700,
            padding: "3px 9px",
            borderRadius: "20px",
            fontFamily: "var(--font-mono)",
            background: pool.badge.bg,
            color: pool.badge.color,
            border: pool.badge.border,
          }}
        >
          {pool.badge.text}
        </span>
      </div>

      <div
        style={{
          fontFamily: "var(--font-head)",
          fontWeight: 700,
          fontSize: "17px",
          color: "var(--text)",
          marginBottom: "2px",
        }}
      >
        {pool.name}
      </div>
      <div
        style={{
          fontSize: "11px",
          color: "var(--text3)",
          fontFamily: "var(--font-mono)",
          marginBottom: "10px",
        }}
      >
        {pool.type}
      </div>

      {pool.disabled ? (
        <div style={{ textAlign: "center", padding: "16px 0", flex: 1 }}>
          <div style={{ fontSize: "26px", marginBottom: "6px" }}>⚠️</div>
          <div
            style={{
              fontSize: "13px",
              fontWeight: 700,
              color: pool.disabledColor,
              marginBottom: "4px",
            }}
          >
            {pool.disabledTitle}
          </div>
          <div
            style={{ fontSize: "12px", color: "var(--text3)", lineHeight: 1.5 }}
          >
            {pool.disabledDesc}
          </div>
        </div>
      ) : (
        <>
          <p
            style={{
              fontSize: "13px",
              color: "var(--text2)",
              lineHeight: 1.6,
              marginBottom: "14px",
            }}
          >
            {pool.desc}
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "column" as const,
              gap: "6px",
              marginBottom: "16px",
              flex: 1,
            }}
          >
            {pool.features.map((f: string, i: number) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "7px",
                  fontSize: "12.5px",
                  color: "var(--text2)",
                }}
              >
                <div
                  style={{
                    width: "16px",
                    height: "16px",
                    borderRadius: "50%",
                    background: "rgba(99,102,241,0.15)",
                    border: "1px solid rgba(99,102,241,0.25)",
                    color: "var(--blue2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "9px",
                    flexShrink: 0,
                  }}
                >
                  ✓
                </div>
                {f}
              </div>
            ))}
          </div>
          {/* Fee */}
          <div
            style={{
              background: "var(--bg2)",
              border: "1px solid var(--border)",
              borderRadius: "11px",
              padding: "12px 14px",
              marginBottom: "13px",
            }}
          >
            <div
              style={{
                fontSize: "11px",
                color: "var(--text3)",
                marginBottom: "6px",
              }}
            >
              Service Fee
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "6px",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "baseline", gap: "7px" }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-head)",
                    fontWeight: 700,
                    fontSize: "19px",
                    color: pool.feeColor,
                  }}
                >
                  0.1 SOL
                </span>
                <span
                  style={{
                    fontSize: "12px",
                    color: "var(--text3)",
                    textDecoration: "line-through",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  0.35 SOL
                </span>
              </div>
              <span
                style={{
                  background: "rgba(34,197,94,0.15)",
                  border: "1px solid rgba(34,197,94,0.25)",
                  color: "var(--green)",
                  fontSize: "10px",
                  fontWeight: 700,
                  padding: "2px 7px",
                  borderRadius: "7px",
                  fontFamily: "var(--font-mono)",
                }}
              >
                -71%
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div
                style={{
                  flex: 1,
                  height: "4px",
                  background: "var(--border2)",
                  borderRadius: "2px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: "29%",
                    height: "100%",
                    borderRadius: "2px",
                    background: pool.barBg,
                  }}
                />
              </div>
              <span
                style={{
                  fontSize: "10.5px",
                  color: "var(--green)",
                  fontFamily: "var(--font-mono)",
                  whiteSpace: "nowrap" as const,
                }}
              >
                Save 0.25 SOL
              </span>
            </div>
          </div>
        </>
      )}

      <Link href={pool.href} style={{ textDecoration: "none" }}>
        <button
          disabled={pool.disabled}
          style={{
            width: "100%",
            padding: "12px",
            border: "none",
            borderRadius: "11px",
            fontSize: "14px",
            fontWeight: 700,
            fontFamily: "var(--font-body)",
            cursor: pool.disabled ? "not-allowed" : "pointer",
            color: pool.disabled ? "var(--text3)" : "#fff",
            background: pool.disabled ? "var(--surface2)" : pool.btnBg,
            boxShadow: pool.disabled ? "none" : pool.btnShadow,
            transition: "all 0.2s",
          }}
        >
          {pool.disabled ? "Coming Soon" : pool.btnLabel}
        </button>
      </Link>
    </div>
  );
}
