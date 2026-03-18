"use client";

import Link from "next/link";

const s: Record<string, React.CSSProperties> = {
  page: { padding: "0 0 60px", position: "relative" as const },
  hero: {
    textAlign: "center" as const,
    padding: "64px 24px 48px",
    position: "relative" as const,
    overflow: "hidden",
  },
  heroGlow: {
    position: "absolute" as const,
    top: "-40px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "500px",
    height: "200px",
    background:
      "radial-gradient(ellipse,rgba(99,102,241,0.15),transparent 70%)",
    pointerEvents: "none" as const,
  },
  tag: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    background: "rgba(99,102,241,0.08)",
    border: "1px solid rgba(99,102,241,0.2)",
    borderRadius: "20px",
    padding: "5px 16px",
    fontSize: "12px",
    fontWeight: 600,
    color: "var(--blue2)",
    marginBottom: "20px",
    fontFamily: "var(--font-mono)",
  },
  h1: {
    fontFamily: "var(--font-head)",
    fontWeight: 800,
    fontSize: "clamp(28px,5vw,48px)",
    lineHeight: 1.1,
    marginBottom: "16px",
    color: "var(--text)",
  },
  p: {
    color: "var(--text2)",
    fontSize: "15px",
    maxWidth: "500px",
    margin: "0 auto 28px",
    lineHeight: 1.7,
  },
  badges: {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
    flexWrap: "wrap" as const,
  },
  badge: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    background: "var(--surface)",
    border: "1px solid var(--border2)",
    borderRadius: "20px",
    padding: "6px 14px",
    fontSize: "12.5px",
    color: "var(--text2)",
  },
};

export default function TokensPage() {
  return (
    <div style={s.page}>
      {/* Hero */}
      <div style={s.hero}>
        <div style={s.heroGlow} />
        <div style={s.tag}>⚒ Solana Token Factory · SPL Standard</div>
        <h1 style={s.h1}>
          Token <span style={{ color: "var(--accent)" }}>Factory</span>
        </h1>
        <p style={s.p}>
          Choose how you want to create your Solana token.{" "}
          <span style={{ color: "var(--accent)", fontWeight: 600 }}>
            Build from scratch
          </span>{" "}
          or{" "}
          <span style={{ color: "var(--purple)", fontWeight: 600 }}>
            clone existing
          </span>
          .
        </p>
        <div style={s.badges}>
          <div style={s.badge}>⚡ Instant Setup</div>
          <div style={s.badge}>🔒 Secure</div>
          <div style={s.badge}>💎 Premium Quality</div>
        </div>
      </div>

      {/* Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
          gap: "20px",
          maxWidth: "860px",
          margin: "0 auto",
          padding: "0 24px 48px",
        }}
      >
        <TokenCard
          href="/create"
          icon="✨"
          iconStyle={{
            background:
              "linear-gradient(135deg,rgba(249,115,22,0.2),rgba(249,115,22,0.05))",
            border: "1px solid rgba(249,115,22,0.3)",
          }}
          type="Solana Token"
          name="Token Creator"
          badge={{
            text: "⭐ Best",
            style: {
              background: "linear-gradient(135deg,#f97316,#c2410c)",
              color: "#fff",
            },
          }}
          desc="Create a brand new SPL token from scratch with full customization"
          features={[
            "Custom name, symbol & logo",
            "Set your own supply",
            "Add social links & metadata",
            "Revoke authorities option",
          ]}
          checkColor="rgba(249,115,22,0.15)"
          checkBorder="rgba(249,115,22,0.25)"
          checkText="var(--accent)"
          feeColor="var(--accent)"
          btnStyle={{
            background: "linear-gradient(135deg,#f97316,#c2410c)",
            boxShadow: "0 4px 20px rgba(249,115,22,0.35)",
          }}
          btnLabel="Create Token →"
          barStyle={{ background: "linear-gradient(90deg,#f97316,#fb923c)" }}
        />

        <TokenCard
          href="/clone"
          icon="🔥"
          iconStyle={{
            background:
              "linear-gradient(135deg,rgba(168,85,247,0.2),rgba(168,85,247,0.05))",
            border: "1px solid rgba(168,85,247,0.3)",
          }}
          type="Solana Token"
          name="Token Cloner"
          badge={{
            text: "Quick Clone",
            style: {
              background: "linear-gradient(135deg,#a855f7,#7c3aed)",
              color: "#fff",
            },
          }}
          desc="Clone any existing Solana token with identical branding"
          features={[
            "Copy any token's identity",
            "Same name, symbol & image",
            "Custom supply amount",
            "Instant metadata fetching",
          ]}
          checkColor="rgba(168,85,247,0.15)"
          checkBorder="rgba(168,85,247,0.25)"
          checkText="var(--purple)"
          feeColor="var(--purple)"
          btnStyle={{
            background: "linear-gradient(135deg,#a855f7,#7c3aed)",
            boxShadow: "0 4px 20px rgba(168,85,247,0.35)",
          }}
          btnLabel="Clone Token →"
          barStyle={{ background: "linear-gradient(90deg,#a855f7,#ec4899)" }}
        />
      </div>

      {/* How it works */}
      <div
        style={{ maxWidth: "860px", margin: "0 auto", padding: "0 24px 64px" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontFamily: "var(--font-head)",
            fontWeight: 700,
            fontSize: "16px",
            color: "var(--text)",
            marginBottom: "20px",
          }}
        >
          ⚡ How It Works
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
              cls: "rgba(249,115,22,0.15)",
              bc: "rgba(249,115,22,0.25)",
              tc: "var(--accent)",
              title: "Choose Type",
              desc: "Select Token Creator or Token Cloner based on your needs",
            },
            {
              n: "2",
              cls: "rgba(99,102,241,0.15)",
              bc: "rgba(99,102,241,0.25)",
              tc: "var(--blue2)",
              title: "Customize",
              desc: "Set name, symbol, supply & options — no coding needed",
            },
            {
              n: "3",
              cls: "rgba(34,197,94,0.15)",
              bc: "rgba(34,197,94,0.25)",
              tc: "var(--green)",
              title: "Deploy",
              desc: "Sign transaction and deploy on Solana in seconds",
            },
          ].map((step) => (
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
                  background: step.cls,
                  border: `1px solid ${step.bc}`,
                  color: step.tc,
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
          ))}
        </div>
      </div>
    </div>
  );
}

function TokenCard({
  href,
  icon,
  iconStyle,
  type,
  name,
  badge,
  desc,
  features,
  checkColor,
  checkBorder,
  checkText,
  feeColor,
  btnStyle,
  btnLabel,
  barStyle,
}: any) {
  return (
    <Link href={href} style={{ textDecoration: "none" }}>
      <div
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "20px",
          padding: "26px",
          transition: "all 0.25s",
          cursor: "pointer",
          height: "100%",
          display: "flex",
          flexDirection: "column" as const,
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
          (e.currentTarget as HTMLElement).style.boxShadow =
            "0 16px 48px rgba(0,0,0,0.4)";
          (e.currentTarget as HTMLElement).style.borderColor = "var(--border2)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "";
          (e.currentTarget as HTMLElement).style.boxShadow = "";
          (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginBottom: "16px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "13px" }}>
            <div
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "13px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "23px",
                ...iconStyle,
              }}
            >
              {icon}
            </div>
            <div>
              <div
                style={{
                  fontSize: "11px",
                  color: "var(--text3)",
                  fontFamily: "var(--font-mono)",
                  marginBottom: "2px",
                }}
              >
                {type}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-head)",
                  fontWeight: 700,
                  fontSize: "19px",
                  color: "var(--text)",
                }}
              >
                {name}
              </div>
            </div>
          </div>
          <span
            style={{
              fontSize: "10px",
              fontWeight: 700,
              padding: "4px 10px",
              borderRadius: "20px",
              fontFamily: "var(--font-mono)",
              flexShrink: 0,
              ...badge.style,
            }}
          >
            {badge.text}
          </span>
        </div>

        <p
          style={{
            fontSize: "13.5px",
            color: "var(--text2)",
            marginBottom: "16px",
            lineHeight: 1.6,
          }}
        >
          {desc}
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column" as const,
            gap: "7px",
            marginBottom: "20px",
            flex: 1,
          }}
        >
          {features.map((f: string, i: number) => (
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
              <div
                style={{
                  width: "17px",
                  height: "17px",
                  borderRadius: "50%",
                  background: checkColor,
                  border: `1px solid ${checkBorder}`,
                  color: checkText,
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
            borderRadius: "12px",
            padding: "13px 15px",
            marginBottom: "14px",
          }}
        >
          <div
            style={{
              fontSize: "11.5px",
              color: "var(--text3)",
              marginBottom: "7px",
            }}
          >
            Service Fee
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "7px",
            }}
          >
            <div
              style={{ display: "flex", alignItems: "baseline", gap: "8px" }}
            >
              <span
                style={{
                  fontFamily: "var(--font-head)",
                  fontWeight: 700,
                  fontSize: "21px",
                  color: feeColor,
                }}
              >
                0.05 SOL
              </span>
              <span
                style={{
                  fontSize: "12px",
                  color: "var(--text3)",
                  textDecoration: "line-through",
                  fontFamily: "var(--font-mono)",
                }}
              >
                0.15 SOL
              </span>
            </div>
            <span
              style={{
                background: "rgba(34,197,94,0.15)",
                border: "1px solid rgba(34,197,94,0.25)",
                color: "var(--green)",
                fontSize: "10px",
                fontWeight: 700,
                padding: "3px 8px",
                borderRadius: "8px",
                fontFamily: "var(--font-mono)",
              }}
            >
              -67% Launch
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
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
                  width: "33%",
                  height: "100%",
                  borderRadius: "2px",
                  ...barStyle,
                }}
              />
            </div>
            <span
              style={{
                fontSize: "11px",
                color: "var(--green)",
                fontFamily: "var(--font-mono)",
                whiteSpace: "nowrap" as const,
              }}
            >
              Save 0.10 SOL
            </span>
          </div>
        </div>

        <button
          style={{
            width: "100%",
            padding: "13px",
            border: "none",
            borderRadius: "12px",
            fontSize: "15px",
            fontWeight: 700,
            fontFamily: "var(--font-body)",
            cursor: "pointer",
            color: "#fff",
            transition: "all 0.2s",
            ...btnStyle,
          }}
        >
          {btnLabel}
        </button>
      </div>
    </Link>
  );
}
