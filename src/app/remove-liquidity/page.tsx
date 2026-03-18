"use client";

import Link from "next/link";

const OPTIONS = [
  {
    href: "/remove-liquidity/raydium-v3",
    icon: "⚡",
    iconBg: "rgba(59,130,246,0.15)",
    iconBorder: "rgba(59,130,246,0.3)",
    name: "Raydium V3",
    type: "CLMM Position NFT",
    badge: {
      text: "Coming Soon",
      bg: "rgba(100,116,139,0.15)",
      color: "#64748b",
      border: "1px solid rgba(100,116,139,0.2)",
    },
    disabled: true,
    disabledColor: "var(--blue2)",
    disabledTitle: "Coming Soon",
    disabledDesc: "Remove CLMM positions will be available soon.",
  },
  {
    href: "/remove-liquidity/raydium-v2",
    icon: "🔥",
    iconBg:
      "linear-gradient(135deg,rgba(249,115,22,0.2),rgba(249,115,22,0.05))",
    iconBorder: "rgba(249,115,22,0.3)",
    name: "Raydium V2",
    type: "AMM LP Token",
    badge: {
      text: "✓ Available",
      bg: "rgba(34,197,94,0.15)",
      color: "var(--green)",
      border: "1px solid rgba(34,197,94,0.25)",
    },
    disabled: false,
    featured: true,
    desc: "Burn LP tokens to reclaim your token pair proportionally based on current pool price.",
    features: [
      "Withdraw any % of position",
      "Receive token + SOL",
      "Free to remove",
    ],
    btnBg: "linear-gradient(135deg,#ef4444,#b91c1c)",
    btnShadow: "0 4px 20px rgba(239,68,68,0.3)",
    btnLabel: "Remove Liquidity →",
  },
  {
    href: "/remove-liquidity/meteora",
    icon: "☄️",
    iconBg: "rgba(168,85,247,0.15)",
    iconBorder: "rgba(168,85,247,0.3)",
    name: "Meteora",
    type: "DLMM Position",
    badge: {
      text: "Coming Soon",
      bg: "rgba(100,116,139,0.15)",
      color: "#64748b",
      border: "1px solid rgba(100,116,139,0.2)",
    },
    disabled: true,
    disabledColor: "var(--purple)",
    disabledTitle: "Coming Soon",
    disabledDesc: "Remove Meteora positions will be available soon.",
  },
  {
    href: "/remove-liquidity/orca",
    icon: "🌊",
    iconBg: "rgba(6,182,212,0.15)",
    iconBorder: "rgba(6,182,212,0.3)",
    name: "Orca",
    type: "Whirlpool Position",
    badge: {
      text: "Coming Soon",
      bg: "rgba(100,116,139,0.15)",
      color: "#64748b",
      border: "1px solid rgba(100,116,139,0.2)",
    },
    disabled: true,
    disabledColor: "var(--cyan)",
    disabledTitle: "Coming Soon",
    disabledDesc: "Remove Orca Whirlpool positions will be available soon.",
  },
];

export default function RemoveLiquidityPage() {
  return (
    <div>
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
              "radial-gradient(ellipse,rgba(239,68,68,0.1),transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(239,68,68,0.08)",
            border: "1px solid rgba(239,68,68,0.2)",
            borderRadius: "20px",
            padding: "5px 16px",
            fontSize: "12px",
            fontWeight: 600,
            color: "var(--red)",
            marginBottom: "20px",
            fontFamily: "var(--font-mono)",
          }}
        >
          🔓 Remove Liquidity
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
          Remove <span style={{ color: "var(--red)" }}>Liquidity</span>
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
          Select your pool type and withdraw your liquidity position back to
          your wallet.
        </p>
        <div
          style={{
            background: "rgba(239,68,68,0.06)",
            border: "1px solid rgba(239,68,68,0.15)",
            borderRadius: "12px",
            padding: "12px 18px",
            maxWidth: "500px",
            margin: "0 auto",
            display: "flex",
            gap: "10px",
            fontSize: "13px",
            color: "var(--text2)",
          }}
        >
          <span style={{ color: "var(--red)" }}>⚠️</span>
          Removing liquidity may cause price impact if the pool is small. This
          action cannot be undone.
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: "16px",
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "0 24px 64px",
        }}
      >
        {OPTIONS.map((opt) => (
          <div
            key={opt.href}
            style={{
              background: opt.featured
                ? "linear-gradient(160deg,rgba(239,68,68,0.04) 0%,var(--surface) 60%)"
                : "var(--surface)",
              border: `1px solid ${opt.featured ? "rgba(239,68,68,0.2)" : "var(--border)"}`,
              borderRadius: "20px",
              padding: "22px",
              opacity: opt.disabled ? 0.65 : 1,
              display: "flex",
              flexDirection: "column" as const,
              transition: "all 0.25s",
            }}
          >
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
                  background: opt.iconBg,
                  border: `1px solid ${opt.iconBorder}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "19px",
                }}
              >
                {opt.icon}
              </div>
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: 700,
                  padding: "3px 9px",
                  borderRadius: "20px",
                  fontFamily: "var(--font-mono)",
                  background: opt.badge.bg,
                  color: opt.badge.color,
                  border: opt.badge.border,
                }}
              >
                {opt.badge.text}
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
              {opt.name}
            </div>
            <div
              style={{
                fontSize: "11px",
                color: "var(--text3)",
                fontFamily: "var(--font-mono)",
                marginBottom: "10px",
              }}
            >
              {opt.type}
            </div>

            {opt.disabled ? (
              <div style={{ textAlign: "center", padding: "16px 0", flex: 1 }}>
                <div style={{ fontSize: "26px", marginBottom: "6px" }}>⚠️</div>
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: 700,
                    color: opt.disabledColor,
                    marginBottom: "4px",
                  }}
                >
                  {opt.disabledTitle}
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    color: "var(--text3)",
                    lineHeight: 1.5,
                  }}
                >
                  {opt.disabledDesc}
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
                  {opt.desc}
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
                  {(opt.features || []).map((f: string, i: number) => (
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
                          background: "rgba(34,197,94,0.15)",
                          border: "1px solid rgba(34,197,94,0.25)",
                          color: "var(--green)",
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
              </>
            )}

            <Link href={opt.href} style={{ textDecoration: "none" }}>
              <button
                disabled={opt.disabled}
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "none",
                  borderRadius: "11px",
                  fontSize: "14px",
                  fontWeight: 700,
                  fontFamily: "var(--font-body)",
                  cursor: opt.disabled ? "not-allowed" : "pointer",
                  color: opt.disabled ? "var(--text3)" : "#fff",
                  background: opt.disabled
                    ? "var(--surface2)"
                    : opt.btnBg || "var(--accent)",
                  boxShadow: opt.disabled ? "none" : opt.btnShadow || "none",
                  transition: "all 0.2s",
                }}
              >
                {opt.disabled ? "Coming Soon" : opt.btnLabel}
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
