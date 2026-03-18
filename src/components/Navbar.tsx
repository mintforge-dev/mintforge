"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import WalletButton from "./WalletButton";

const NAV_MENUS = [
  {
    label: "✨ Create Token",
    items: [
      { href: "/tokens", icon: "📋", label: "All Tokens", badge: null },
      null, // divider
      {
        href: "/create",
        icon: "✨",
        label: "New Token",
        badge: { text: "New", color: "#22c55e" },
      },
      {
        href: "/clone",
        icon: "🔥",
        label: "Clone Token",
        badge: { text: "Hot", color: "#ef4444" },
      },
    ],
  },
  {
    label: "💧 Liquidity",
    items: [
      { href: "/liquidity", icon: "📊", label: "All Pools", badge: null },
      null,
      {
        href: "/liquidity/raydium-v2",
        icon: "🔥",
        label: "Raydium V2",
        badge: { text: "Live", color: "#f97316", outline: true },
      },
      {
        href: "/liquidity/raydium-v3",
        icon: "⚡",
        label: "Raydium V3",
        badge: { text: "Soon", color: "#64748b" },
      },
      {
        href: "/liquidity/orca",
        icon: "🌊",
        label: "Orca",
        badge: { text: "Soon", color: "#64748b" },
      },
      {
        href: "/liquidity/meteora",
        icon: "☄️",
        label: "Meteora",
        badge: { text: "Soon", color: "#64748b" },
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
      null,
      {
        href: "/remove-liquidity/raydium-v2",
        icon: "🔥",
        label: "Raydium V2",
        badge: { text: "Live", color: "#f97316", outline: true },
      },
      {
        href: "/remove-liquidity/raydium-v3",
        icon: "⚡",
        label: "Raydium V3",
        badge: { text: "Soon", color: "#64748b" },
      },
      {
        href: "/remove-liquidity/meteora",
        icon: "☄️",
        label: "Meteora",
        badge: { text: "Soon", color: "#64748b" },
      },
      {
        href: "/remove-liquidity/orca",
        icon: "🌊",
        label: "Orca",
        badge: { text: "Soon", color: "#64748b" },
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
        badge: { text: "New", color: "#22c55e" },
      },
    ],
  },
];

export default function Navbar({ onMenuClick }: { onMenuClick: () => void }) {
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const navRef = useRef<HTMLElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setOpenMenu(null);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <nav
      ref={navRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "60px",
        background: "rgba(7,9,15,0.88)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid var(--border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 28px",
        zIndex: 1000,
        gap: "16px",
      }}
    >
      {/* Logo */}
      <Link
        href="/"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          textDecoration: "none",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: "34px",
            height: "34px",
            background: "linear-gradient(135deg,#f97316,#c2410c)",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "17px",
            boxShadow: "0 0 18px rgba(249,115,22,0.3)",
          }}
        >
          ⚒
        </div>
        <span
          style={{
            fontFamily: "var(--font-head)",
            fontWeight: 800,
            fontSize: "19px",
            color: "var(--text)",
            letterSpacing: "-0.5px",
          }}
        >
          Mint<span style={{ color: "var(--accent)" }}>Forge</span>
        </span>
      </Link>

      {/* Desktop dropdown menus */}
      <div
        className="hide-mobile"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "2px",
          flex: 1,
          justifyContent: "center",
        }}
      >
        {NAV_MENUS.map((menu, i) => (
          <div key={i} style={{ position: "relative" }}>
            <button
              onClick={() => setOpenMenu(openMenu === i ? null : i)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "7px 13px",
                borderRadius: "8px",
                background: openMenu === i ? "var(--surface)" : "none",
                border: "none",
                color: openMenu === i ? "var(--text)" : "var(--text2)",
                fontSize: "13.5px",
                fontWeight: 500,
                fontFamily: "var(--font-body)",
                cursor: "pointer",
                transition: "all 0.18s",
                whiteSpace: "nowrap",
              }}
            >
              {menu.label}
              <span
                style={{
                  fontSize: "10px",
                  opacity: 0.5,
                  transition: "transform 0.2s",
                  transform: openMenu === i ? "rotate(180deg)" : "rotate(0)",
                }}
              >
                ▾
              </span>
            </button>

            {/* Dropdown */}
            {openMenu === i && (
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 8px)",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "var(--bg2)",
                  border: "1px solid var(--border2)",
                  borderRadius: "14px",
                  padding: "8px",
                  minWidth: "210px",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
                  zIndex: 1001,
                  animation: "fadeUp 0.15s ease",
                }}
              >
                {menu.items.map((item, j) =>
                  item === null ? (
                    <div
                      key={j}
                      style={{
                        height: "1px",
                        background: "var(--border)",
                        margin: "6px 0",
                      }}
                    />
                  ) : (
                    <Link
                      key={j}
                      href={item.href}
                      onClick={() => setOpenMenu(null)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        padding: "9px 12px",
                        borderRadius: "9px",
                        color: "var(--text2)",
                        textDecoration: "none",
                        fontSize: "13.5px",
                        fontWeight: 500,
                        transition: "all 0.15s",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.background =
                          "var(--surface)";
                        (e.currentTarget as HTMLElement).style.color =
                          "var(--text)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.background =
                          "transparent";
                        (e.currentTarget as HTMLElement).style.color =
                          "var(--text2)";
                      }}
                    >
                      <div
                        style={{
                          width: "28px",
                          height: "28px",
                          borderRadius: "7px",
                          background: "var(--surface2)",
                          border: "1px solid var(--border)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "14px",
                          flexShrink: 0,
                        }}
                      >
                        {item.icon}
                      </div>
                      <span style={{ flex: 1 }}>{item.label}</span>
                      {item.badge && (
                        <span
                          style={{
                            fontSize: "9px",
                            fontWeight: 700,
                            padding: "2px 7px",
                            borderRadius: "8px",
                            fontFamily: "var(--font-mono)",
                            background: item.badge.outline
                              ? `rgba(${item.badge.color === "#f97316" ? "249,115,22" : "100,116,139"},0.15)`
                              : item.badge.color === "#22c55e"
                                ? "rgba(34,197,94,0.9)"
                                : item.badge.color === "#ef4444"
                                  ? "rgba(239,68,68,0.9)"
                                  : "rgba(100,116,139,0.2)",
                            color: item.badge.outline
                              ? item.badge.color
                              : item.badge.color === "#64748b"
                                ? "#64748b"
                                : "#fff",
                            border: item.badge.outline
                              ? `1px solid ${item.badge.color}44`
                              : "none",
                          }}
                        >
                          {item.badge.text}
                        </span>
                      )}
                    </Link>
                  ),
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Right */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          flexShrink: 0,
        }}
      >
        {/* Network pill — hide on small mobile */}
        <div
          className="hide-mobile"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "20px",
            padding: "5px 12px",
            fontSize: "12px",
            fontFamily: "var(--font-mono)",
            color: "var(--green)",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              width: "6px",
              height: "6px",
              background: "var(--green)",
              borderRadius: "50%",
              animation: "pulse 2s infinite",
            }}
          />
          Devnet
        </div>
        <WalletButton />
        {/* Hamburger */}
        <button
          onClick={onMenuClick}
          className="hide-desktop"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "8px",
            padding: "7px 10px",
            cursor: "pointer",
            color: "var(--text)",
            fontSize: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ☰
        </button>
      </div>
    </nav>
  );
}
