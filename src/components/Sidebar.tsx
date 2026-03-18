"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { createPortal } from "react-dom";

const MENUS = [
  {
    label: "✨ Create Token",
    items: [
      { href: "/tokens", icon: "📋", label: "All Tokens", badge: null },
      {
        href: "/create",
        icon: "✨",
        label: "New Token",
        badge: { text: "New", bg: "#22c55e", color: "#fff" },
      },
      {
        href: "/clone",
        icon: "🔥",
        label: "Clone Token",
        badge: { text: "Hot", bg: "#ef4444", color: "#fff" },
      },
    ],
  },
  {
    label: "💧 Liquidity",
    items: [
      { href: "/liquidity", icon: "📊", label: "All Pools", badge: null },
      {
        href: "/liquidity/raydium-v2",
        icon: "🔥",
        label: "Raydium V2",
        badge: {
          text: "Live",
          bg: "rgba(249,115,22,0.2)",
          color: "#f97316",
          border: "1px solid rgba(249,115,22,0.3)",
        },
      },
      {
        href: "/liquidity/raydium-v3",
        icon: "⚡",
        label: "Raydium V3",
        badge: { text: "Soon", bg: "rgba(100,116,139,0.2)", color: "#64748b" },
      },
      {
        href: "/liquidity/orca",
        icon: "🌊",
        label: "Orca",
        badge: { text: "Soon", bg: "rgba(100,116,139,0.2)", color: "#64748b" },
      },
      {
        href: "/liquidity/meteora",
        icon: "☄️",
        label: "Meteora",
        badge: { text: "Soon", bg: "rgba(100,116,139,0.2)", color: "#64748b" },
      },
    ],
  },
  {
    label: "🔓 Remove Liquidity",
    items: [
      {
        href: "/remove-liquidity",
        icon: "📊",
        label: "All Options",
        badge: null,
      },
      {
        href: "/remove-liquidity/raydium-v2",
        icon: "🔥",
        label: "Raydium V2",
        badge: {
          text: "Live",
          bg: "rgba(249,115,22,0.2)",
          color: "#f97316",
          border: "1px solid rgba(249,115,22,0.3)",
        },
      },
      {
        href: "/remove-liquidity/raydium-v3",
        icon: "⚡",
        label: "Raydium V3",
        badge: { text: "Soon", bg: "rgba(100,116,139,0.2)", color: "#64748b" },
      },
      {
        href: "/remove-liquidity/meteora",
        icon: "☄️",
        label: "Meteora",
        badge: { text: "Soon", bg: "rgba(100,116,139,0.2)", color: "#64748b" },
      },
      {
        href: "/remove-liquidity/orca",
        icon: "🌊",
        label: "Orca",
        badge: { text: "Soon", bg: "rgba(100,116,139,0.2)", color: "#64748b" },
      },
    ],
  },
  {
    label: "🛠 Tools",
    items: [
      {
        href: "/authority",
        icon: "🛡",
        label: "Revoke Authority",
        badge: null,
      },
      {
        href: "/creator",
        icon: "✏️",
        label: "Modify Creator Info",
        badge: null,
      },
      {
        href: "/lock-lp",
        icon: "🔒",
        label: "Lock LP",
        badge: { text: "New", bg: "#22c55e", color: "#fff" },
      },
    ],
  },
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: Props) {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState<string[]>(MENUS.map((m) => m.label));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggle = (label: string) => {
    setExpanded((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label],
    );
  };

  if (!mounted) return null;

  return createPortal(
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.7)",
            zIndex: 9998,
            backdropFilter: "blur(4px)",
          }}
        />
      )}

      {/* Sidebar */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          width: "280px",
          background: "var(--bg2)",
          borderRight: "1px solid var(--border)",
          zIndex: 9999,
          transform: isOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s ease",
          overflowY: "auto",
          padding: "16px 12px",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "8px 10px",
            marginBottom: "16px",
          }}
        >
          <div
            style={{
              width: "32px",
              height: "32px",
              background: "linear-gradient(135deg,#f97316,#c2410c)",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "16px",
            }}
          >
            ⚒
          </div>
          <span
            style={{
              fontFamily: "var(--font-head)",
              fontWeight: 800,
              fontSize: "18px",
              color: "var(--text)",
            }}
          >
            Mint<span style={{ color: "var(--accent)" }}>Forge</span>
          </span>
          <button
            onClick={onClose}
            style={{
              marginLeft: "auto",
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              width: "30px",
              height: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "var(--text2)",
              fontSize: "14px",
            }}
          >
            ✕
          </button>
        </div>

        {/* Menu sections */}
        {MENUS.map((menu, i) => {
          const isExp = expanded.includes(menu.label);
          return (
            <div key={i} style={{ marginBottom: "4px" }}>
              <button
                onClick={() => toggle(menu.label)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  width: "100%",
                  padding: "10px 12px",
                  background: "none",
                  border: "none",
                  borderRadius: "10px",
                  color: "var(--text)",
                  fontSize: "13.5px",
                  fontWeight: 700,
                  fontFamily: "var(--font-head)",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.background =
                    "var(--surface)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.background =
                    "transparent")
                }
              >
                <span style={{ flex: 1 }}>{menu.label}</span>
                <span
                  style={{
                    fontSize: "10px",
                    color: "var(--text3)",
                    transition: "transform 0.2s",
                    transform: isExp ? "rotate(0)" : "rotate(-90deg)",
                  }}
                >
                  ▾
                </span>
              </button>

              {isExp && (
                <div style={{ paddingLeft: "8px" }}>
                  {menu.items.map((item, j) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={j}
                        href={item.href}
                        onClick={onClose}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "9px",
                          padding: "8px 12px",
                          borderRadius: "8px",
                          color: isActive ? "var(--accent)" : "var(--text2)",
                          textDecoration: "none",
                          fontSize: "13px",
                          fontWeight: isActive ? 600 : 400,
                          marginBottom: "1px",
                          background: isActive
                            ? "rgba(249,115,22,0.08)"
                            : "transparent",
                          border: `1px solid ${isActive ? "rgba(249,115,22,0.2)" : "transparent"}`,
                          transition: "all 0.15s",
                        }}
                        onMouseEnter={(e) => {
                          if (!isActive) {
                            (e.currentTarget as HTMLElement).style.background =
                              "var(--surface)";
                            (e.currentTarget as HTMLElement).style.color =
                              "var(--text)";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isActive) {
                            (e.currentTarget as HTMLElement).style.background =
                              "transparent";
                            (e.currentTarget as HTMLElement).style.color =
                              "var(--text2)";
                          }
                        }}
                      >
                        <span
                          style={{
                            fontSize: "15px",
                            width: "18px",
                            textAlign: "center",
                            flexShrink: 0,
                          }}
                        >
                          {item.icon}
                        </span>
                        <span style={{ flex: 1 }}>{item.label}</span>
                        {item.badge && (
                          <span
                            style={{
                              fontSize: "9px",
                              fontWeight: 700,
                              padding: "1px 6px",
                              borderRadius: "8px",
                              fontFamily: "var(--font-mono)",
                              background: (item.badge as any).bg,
                              color: (item.badge as any).color,
                              border: (item.badge as any).border || "none",
                            }}
                          >
                            {item.badge.text}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              )}

              <div
                style={{
                  height: "1px",
                  background: "var(--border)",
                  margin: "6px 4px",
                }}
              />
            </div>
          );
        })}

        {/* Network */}
        <div
          style={{
            padding: "10px 12px",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "10px",
            marginTop: "8px",
          }}
        >
          <div
            style={{
              fontSize: "10px",
              color: "var(--text3)",
              fontFamily: "var(--font-mono)",
              textTransform: "uppercase",
              letterSpacing: "1px",
              marginBottom: "8px",
            }}
          >
            Network
          </div>
          {[
            { label: "Mainnet", color: "#22c55e" },
            { label: "Devnet", color: "#eab308" },
          ].map((n) => (
            <div
              key={n.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "5px 6px",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "13px",
                color: "var(--text2)",
                marginBottom: "2px",
              }}
            >
              <div
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: n.color,
                }}
              />
              {n.label}
            </div>
          ))}
        </div>
      </div>
    </>,
    document.body,
  );
}
