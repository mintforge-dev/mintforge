"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
// Tambahkan import di atas
import HeroIllustration from '@/components/HeroIllustration';
import TokenFlowIllustration from '@/components/TokenFlowIllustration';

const STATS = [
  { icon: "🪙", val: 12847, display: "12,847", label: "Tokens Created" },
  { icon: "💧", val: null, display: "$4.2M", label: "Total Liquidity" },
  { icon: "🔒", val: 8391, display: "8,391", label: "Authorities Revoked" },
  { icon: "👛", val: null, display: "9,200+", label: "Wallets Connected" },
];

const FEATURES = [
  {
    href: "/create",
    icon: "✨",
    iconBg: "rgba(249,115,22,0.12)",
    iconBorder: "rgba(249,115,22,0.25)",
    title: "Create Token",
    desc: "Launch your SPL token in minutes. Custom name, symbol, logo, supply.",
    badge: "~0.07 SOL",
    badgeBg: "rgba(34,197,94,0.1)",
    badgeColor: "var(--green)",
    badgeBorder: "rgba(34,197,94,0.2)",
    delay: "0.1s",
  },
  {
    href: "/clone",
    icon: "🔥",
    iconBg: "rgba(239,68,68,0.12)",
    iconBorder: "rgba(239,68,68,0.25)",
    title: "Clone Token",
    desc: "Copy any trending token metadata. Unique mint address instantly.",
    badge: "🔥 Hot",
    badgeBg: "rgba(239,68,68,0.1)",
    badgeColor: "var(--red)",
    badgeBorder: "rgba(239,68,68,0.2)",
    delay: "0.2s",
  },
  {
    href: "/liquidity",
    icon: "💧",
    iconBg: "rgba(99,102,241,0.12)",
    iconBorder: "rgba(99,102,241,0.25)",
    title: "Add Liquidity",
    desc: "Create liquidity pools on Raydium. Pair your token with SOL or USDC.",
    badge: "~1.4 SOL",
    badgeBg: "rgba(99,102,241,0.1)",
    badgeColor: "var(--blue2)",
    badgeBorder: "rgba(99,102,241,0.2)",
    delay: "0.3s",
  },
  {
    href: "/remove-liquidity",
    icon: "🔓",
    iconBg: "rgba(34,197,94,0.12)",
    iconBorder: "rgba(34,197,94,0.25)",
    title: "Remove Liquidity",
    desc: "Withdraw your liquidity from any pool at any time. Reclaim SOL + tokens.",
    badge: "FREE",
    badgeBg: "rgba(34,197,94,0.1)",
    badgeColor: "var(--green)",
    badgeBorder: "rgba(34,197,94,0.2)",
    delay: "0.4s",
  },
  {
    href: "/authority",
    icon: "🛡",
    iconBg: "rgba(234,179,8,0.12)",
    iconBorder: "rgba(234,179,8,0.25)",
    title: "Revoke Authority",
    desc: "Revoke Mint, Freeze & Metadata authority. Build investor trust.",
    badge: "~0.01 SOL",
    badgeBg: "rgba(234,179,8,0.1)",
    badgeColor: "var(--yellow)",
    badgeBorder: "rgba(234,179,8,0.2)",
    delay: "0.5s",
  },
  {
    href: "/creator",
    icon: "✏️",
    iconBg: "rgba(168,85,247,0.12)",
    iconBorder: "rgba(168,85,247,0.25)",
    title: "Creator Info",
    desc: "Update token name, symbol, logo and social links anytime.",
    badge: "~0.01 SOL",
    badgeBg: "rgba(168,85,247,0.1)",
    badgeColor: "var(--purple)",
    badgeBorder: "rgba(168,85,247,0.2)",
    delay: "0.6s",
  },
];

const TRUST = [
  "✓ No Malicious Requests",
  "✓ Wallet-Safe Transactions",
  "✓ Open Source Code",
  "✓ No Seed Phrase Required",
];

// Hook untuk detect element masuk viewport
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

// Counter animation
function AnimatedCounter({
  target,
  duration = 1500,
}: {
  target: number;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
        return;
      }
      setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
}

export default function HomePage() {
  const statsRef = useInView();
  const featuresRef = useInView();
  const howRef = useInView();
  const ctaRef = useInView();

  return (
    <div>
      {/* ── HERO ── */}
      <div
        style={{
          padding: "80px 40px 60px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background glows */}
        <div
          style={{
            position: "absolute",
            top: "-60px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "700px",
            height: "400px",
            background:
              "radial-gradient(ellipse,rgba(99,102,241,0.12),transparent 70%)",
            pointerEvents: "none",
            animation: "float 6s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "40px",
            left: "10%",
            width: "300px",
            height: "300px",
            background:
              "radial-gradient(ellipse,rgba(249,115,22,0.07),transparent 70%)",
            pointerEvents: "none",
            animation: "float 8s ease-in-out infinite 1s",
          }}
        />

        <div
          className="hero-grid"
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "40px",
            alignItems: "center",
          }}
        >
          {/* Left — Text */}
          <div>
            <div
              className="animate-fade-up"
              style={{
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
                marginBottom: "24px",
                fontFamily: "var(--font-mono)",
              }}
            >
              <div
                className="animate-pulse-dot"
                style={{
                  width: "6px",
                  height: "6px",
                  background: "var(--blue2)",
                  borderRadius: "50%",
                }}
              />
              ⚒ Solana Token Factory · Built on SPL
            </div>

            <h1
              className="animate-fade-up-1"
              style={{
                fontFamily: "var(--font-head)",
                fontWeight: 800,
                fontSize: "clamp(36px,4.5vw,60px)",
                lineHeight: 1.05,
                marginBottom: "20px",
                letterSpacing: "-1px",
                textAlign: "left",
              }}
            >
              <span style={{ color: "var(--text)" }}>Forge Your Token</span>
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg,#f97316,#fb923c,#f59e0b)",
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  animation: "shimmer 3s linear infinite",
                }}
              >
                on Solana
              </span>
            </h1>

            <p
              className="animate-fade-up-2"
              style={{
                color: "var(--text2)",
                fontSize: "16px",
                maxWidth: "480px",
                marginBottom: "32px",
                lineHeight: 1.7,
                textAlign: "left",
              }}
            >
              Create, clone, and manage SPL tokens in minutes. No code required.
              Add liquidity, revoke authority, and launch your project with
              confidence.
            </p>

            {/* CTA buttons */}
            <div
              className="animate-fade-up-3"
              style={{
                display: "flex",
                gap: "12px",
                flexWrap: "wrap",
                marginBottom: "32px",
              }}
            >
              <Link href="/create" style={{ textDecoration: "none" }}>
                <button
                  className="btn-press"
                  style={{
                    background: "linear-gradient(135deg,#f97316,#c2410c)",
                    color: "#fff",
                    border: "none",
                    borderRadius: "12px",
                    padding: "13px 28px",
                    fontSize: "15px",
                    fontWeight: 700,
                    fontFamily: "var(--font-body)",
                    cursor: "pointer",
                    boxShadow: "0 4px 20px rgba(249,115,22,0.35)",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    animation: "glow 3s ease-in-out infinite",
                  }}
                >
                  ⚡ Create Token
                </button>
              </Link>
              <Link href="/clone" style={{ textDecoration: "none" }}>
                <button
                  className="btn-press"
                  style={{
                    background: "var(--surface)",
                    color: "var(--text)",
                    border: "1px solid var(--border2)",
                    borderRadius: "12px",
                    padding: "13px 28px",
                    fontSize: "15px",
                    fontWeight: 700,
                    fontFamily: "var(--font-body)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  🔥 Clone Trending
                </button>
              </Link>
            </div>

            {/* Trust badges */}
            <div
              className="animate-fade-up-4"
              style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}
            >
              {TRUST.map((t, i) => (
                <div
                  key={t}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: "20px",
                    padding: "5px 12px",
                    fontSize: "12px",
                    color: "var(--text2)",
                    animation: `fadeUp 0.5s ease ${0.5 + i * 0.08}s both`,
                  }}
                >
                  <span
                    style={{
                      color: "var(--green)",
                      fontWeight: 700,
                      fontSize: "10px",
                    }}
                  >
                    ✓
                  </span>
                  {t.replace("✓ ", "")}
                </div>
              ))}
            </div>
          </div>

          {/* Right — Illustration */}
          <div
            className="animate-fade-up-3"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <HeroIllustration />
          </div>
        </div>
      </div>

      {/* ── STATS ── */}
      <div
        ref={statsRef.ref}
        style={{
          display: "grid",
          gap: "1px",
          background: "var(--border)",
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
          marginBottom: "80px",
        }}
        className="stats-grid"
      >
        {STATS.map((s, i) => (
          <div
            key={s.label}
            style={{
              background: "var(--bg2)",
              padding: "24px 28px",
              display: "flex",
              alignItems: "center",
              gap: "14px",
              animation: statsRef.inView
                ? `fadeUp 0.5s ease ${i * 0.1}s both`
                : "none",
              opacity: statsRef.inView ? 1 : 0,
            }}
          >
            <div
              style={{
                width: "44px",
                height: "44px",
                background: "rgba(99,102,241,0.1)",
                border: "1px solid rgba(99,102,241,0.2)",
                borderRadius: "11px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                flexShrink: 0,
                transition: "transform 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.transform =
                  "scale(1.1) rotate(5deg)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.transform = "")
              }
            >
              {s.icon}
            </div>
            <div>
              <div
                style={{
                  fontFamily: "var(--font-head)",
                  fontWeight: 800,
                  fontSize: "22px",
                  color: "var(--text)",
                  lineHeight: 1,
                }}
              >
                {s.val ? <AnimatedCounter target={s.val} /> : s.display}
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: "var(--text3)",
                  fontFamily: "var(--font-mono)",
                  marginTop: "3px",
                }}
              >
                {s.label}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Token Flow */}
      <div
        style={{
          maxWidth: "680px",
          margin: "-20px auto 60px",
          padding: "0 24px",
        }}
      >
        <TokenFlowIllustration />
      </div>
      {/* ── FEATURES ── */}
      <div
        ref={featuresRef.ref}
        style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px 80px" }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "40px",
            animation: featuresRef.inView ? "fadeUp 0.5s ease both" : "none",
            opacity: featuresRef.inView ? 1 : 0,
          }}
        >
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
              marginBottom: "14px",
              fontFamily: "var(--font-mono)",
            }}
          >
            ⚙️ All Features
          </div>
          <h2
            style={{
              fontFamily: "var(--font-head)",
              fontWeight: 800,
              fontSize: "clamp(22px,3vw,32px)",
              color: "var(--text)",
              marginBottom: "10px",
            }}
          >
            Everything You Need to Launch
          </h2>
          <p
            style={{
              color: "var(--text2)",
              fontSize: "14.5px",
              maxWidth: "480px",
              margin: "0 auto",
            }}
          >
            Full suite of Solana token tools — from creation to liquidity
            management.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))",
            gap: "16px",
          }}
        >
          {FEATURES.map((f, i) => (
            <Link key={f.href} href={f.href} style={{ textDecoration: "none" }}>
              <div
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "18px",
                  padding: "24px",
                  cursor: "pointer",
                  height: "100%",
                  position: "relative",
                  overflow: "hidden",
                  animation: featuresRef.inView
                    ? `fadeUp 0.5s ease ${i * 0.08}s both`
                    : "none",
                  opacity: featuresRef.inView ? 1 : 0,
                  transition:
                    "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "translateY(-5px)";
                  el.style.boxShadow = "0 20px 50px rgba(0,0,0,0.4)";
                  el.style.borderColor = "var(--border2)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "";
                  el.style.boxShadow = "";
                  el.style.borderColor = "var(--border)";
                }}
              >
                {/* Top shine on hover */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "1px",
                    background: `linear-gradient(90deg,transparent,${f.iconBorder},transparent)`,
                    opacity: 0,
                    transition: "opacity 0.3s",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.opacity = "1")
                  }
                />
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    background: f.iconBg,
                    border: `1px solid ${f.iconBorder}`,
                    borderRadius: "11px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "20px",
                    marginBottom: "14px",
                    transition: "transform 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.transform =
                      "scale(1.1) rotate(5deg)")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.transform = "")
                  }
                >
                  {f.icon}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-head)",
                    fontWeight: 700,
                    fontSize: "15.5px",
                    color: "var(--text)",
                    marginBottom: "8px",
                  }}
                >
                  {f.title}
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    color: "var(--text2)",
                    lineHeight: 1.6,
                    marginBottom: "16px",
                  }}
                >
                  {f.desc}
                </div>
                <span
                  style={{
                    background: f.badgeBg,
                    border: `1px solid ${f.badgeBorder}`,
                    color: f.badgeColor,
                    fontSize: "11px",
                    fontWeight: 600,
                    padding: "3px 10px",
                    borderRadius: "20px",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {f.badge}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ── HOW IT WORKS ── */}
      <div
        ref={howRef.ref}
        style={{
          background: "var(--bg2)",
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
          padding: "64px 24px",
        }}
      >
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div
            style={{
              textAlign: "center",
              marginBottom: "40px",
              animation: howRef.inView ? "fadeUp 0.5s ease both" : "none",
              opacity: howRef.inView ? 1 : 0,
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-head)",
                fontWeight: 800,
                fontSize: "clamp(20px,3vw,28px)",
                color: "var(--text)",
                marginBottom: "8px",
              }}
            >
              How It Works
            </h2>
            <p style={{ color: "var(--text2)", fontSize: "14px" }}>
              Launch your Solana token in 3 simple steps
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
              gap: "20px",
            }}
          >
            {[
              {
                n: "01",
                color: "var(--accent)",
                bg: "rgba(249,115,22,0.1)",
                border: "rgba(249,115,22,0.2)",
                title: "Connect Wallet",
                desc: "Connect Phantom, OKX, Solflare or any Solana wallet. No sign up required.",
                delay: "0.1s",
              },
              {
                n: "02",
                color: "var(--blue2)",
                bg: "rgba(99,102,241,0.1)",
                border: "rgba(99,102,241,0.2)",
                title: "Configure Token",
                desc: "Set name, symbol, supply, upload logo, add social links. All in one form.",
                delay: "0.2s",
              },
              {
                n: "03",
                color: "var(--green)",
                bg: "rgba(34,197,94,0.1)",
                border: "rgba(34,197,94,0.2)",
                title: "Deploy & Launch",
                desc: "Sign one transaction. Token live on Solana in seconds. Add liquidity to start trading.",
                delay: "0.3s",
              },
            ].map((step) => (
              <div
                key={step.n}
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "16px",
                  padding: "24px",
                  animation: howRef.inView
                    ? `fadeUp 0.5s ease ${step.delay} both`
                    : "none",
                  opacity: howRef.inView ? 1 : 0,
                  transition: "transform 0.2s, border-color 0.2s",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "translateY(-3px)";
                  el.style.borderColor = step.border;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "";
                  el.style.borderColor = "var(--border)";
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontWeight: 700,
                    color: step.color,
                    background: step.bg,
                    border: `1px solid ${step.border}`,
                    borderRadius: "12px",
                    width: "52px",
                    height: "52px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "16px",
                    fontSize: "18px",
                    transition: "transform 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.transform =
                      "scale(1.1)")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.transform = "")
                  }
                >
                  {step.n}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-head)",
                    fontWeight: 700,
                    fontSize: "16px",
                    color: "var(--text)",
                    marginBottom: "8px",
                  }}
                >
                  {step.title}
                </div>
                <div
                  style={{
                    fontSize: "13.5px",
                    color: "var(--text2)",
                    lineHeight: 1.65,
                  }}
                >
                  {step.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── BOTTOM CTA ── */}
      <div
        ref={ctaRef.ref}
        style={{
          textAlign: "center",
          padding: "80px 24px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: "500px",
            height: "300px",
            background:
              "radial-gradient(ellipse,rgba(249,115,22,0.08),transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <h2
          style={{
            fontFamily: "var(--font-head)",
            fontWeight: 800,
            fontSize: "clamp(24px,4vw,40px)",
            color: "var(--text)",
            marginBottom: "16px",
            lineHeight: 1.1,
            animation: ctaRef.inView ? "fadeUp 0.5s ease both" : "none",
            opacity: ctaRef.inView ? 1 : 0,
          }}
        >
          Ready to{" "}
          <span
            style={{
              background: "linear-gradient(135deg,#f97316,#fb923c)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Forge
          </span>{" "}
          Your Token?
        </h2>
        <p
          style={{
            color: "var(--text2)",
            fontSize: "15px",
            maxWidth: "440px",
            margin: "0 auto 32px",
            lineHeight: 1.7,
            animation: ctaRef.inView ? "fadeUp 0.5s ease 0.1s both" : "none",
            opacity: ctaRef.inView ? 1 : 0,
          }}
        >
          Join thousands of creators who trust MintForge for secure, fast Solana
          token launches.
        </p>
        <div
          style={{
            display: "flex",
            gap: "12px",
            justifyContent: "center",
            flexWrap: "wrap",
            animation: ctaRef.inView ? "fadeUp 0.5s ease 0.2s both" : "none",
            opacity: ctaRef.inView ? 1 : 0,
          }}
        >
          <Link href="/create" style={{ textDecoration: "none" }}>
            <button
              className="btn-press"
              style={{
                background: "linear-gradient(135deg,#f97316,#c2410c)",
                color: "#fff",
                border: "none",
                borderRadius: "12px",
                padding: "14px 32px",
                fontSize: "15px",
                fontWeight: 700,
                fontFamily: "var(--font-body)",
                cursor: "pointer",
                boxShadow: "0 4px 20px rgba(249,115,22,0.35)",
              }}
            >
              ⚡ Start Creating Now
            </button>
          </Link>
          <Link href="/tokens" style={{ textDecoration: "none" }}>
            <button
              className="btn-press"
              style={{
                background: "var(--surface)",
                color: "var(--text)",
                border: "1px solid var(--border2)",
                borderRadius: "12px",
                padding: "14px 32px",
                fontSize: "15px",
                fontWeight: 700,
                fontFamily: "var(--font-body)",
                cursor: "pointer",
              }}
            >
              View All Tools
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
