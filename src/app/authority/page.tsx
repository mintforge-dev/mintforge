"use client";

import { useState } from "react";
import { useRevokeAuthority } from "@/hooks/useRevokeAuthority";
import Link from "next/link";

export default function AuthorityPage() {
  const {
    fetchAuthorityInfo,
    revokeAuthority,
    revokeAll,
    status,
    error,
    authorityInfo,
    revokedList,
    reset,
  } = useRevokeAuthority();
  const [mintInput, setMintInput] = useState("");
  const isLoading = status === "revoking" || status === "checking";

  const shortAddr = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-6)}`;

  const authorities = authorityInfo
    ? [
        {
          key: "mint" as const,
          icon: "🔵",
          iconBg: "rgba(59,130,246,0.12)",
          label: "Mint Authority",
          desc: "Controls whether new tokens can be minted. Revoking makes supply permanently fixed — no rug pull risk.",
          value: authorityInfo.mintAuthority,
          revoked: !authorityInfo.mintAuthority,
          justRevoked: revokedList.includes("mint"),
        },
        {
          key: "freeze" as const,
          icon: "❄️",
          iconBg: "rgba(6,182,212,0.12)",
          label: "Freeze Authority",
          desc: "Controls whether user wallets can be frozen. Required to be revoked for most DEX listings.",
          value: authorityInfo.freezeAuthority,
          revoked: !authorityInfo.freezeAuthority,
          justRevoked: revokedList.includes("freeze"),
        },
        {
          key: "metadata" as const,
          icon: "✏️",
          iconBg: "rgba(249,115,22,0.12)",
          label: "Metadata Update Authority",
          desc: "Controls whether token name, symbol, or image can be changed. Revoking makes metadata immutable forever.",
          value: authorityInfo.updateAuthority,
          revoked: !authorityInfo.isMutable || !authorityInfo.updateAuthority,
          justRevoked: revokedList.includes("metadata"),
        },
      ]
    : [];

  const hasAnyActive =
    authorityInfo &&
    (authorityInfo.mintAuthority ||
      authorityInfo.freezeAuthority ||
      authorityInfo.isMutable);
  const allRevoked =
    authorityInfo &&
    !authorityInfo.mintAuthority &&
    !authorityInfo.freezeAuthority &&
    !authorityInfo.isMutable;

  return (
    <div style={{ minHeight: "100vh" }}>
      <div
        style={{
          maxWidth: "760px",
          margin: "0 auto",
          padding: "40px 24px 80px",
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: "32px" }}>
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              color: "var(--text3)",
              textDecoration: "none",
              fontSize: "13px",
              fontFamily: "var(--font-mono)",
              marginBottom: "16px",
            }}
          >
            ← Back
          </Link>
          <div
            style={{
              display: "inline-block",
              background: "rgba(234,179,8,0.08)",
              border: "1px solid rgba(234,179,8,0.2)",
              borderRadius: "20px",
              padding: "4px 14px",
              fontSize: "12px",
              color: "var(--yellow)",
              fontFamily: "var(--font-mono)",
              marginBottom: "10px",
            }}
          >
            🛡 Authority Manager
          </div>
          <h1
            style={{
              fontFamily: "var(--font-head)",
              fontWeight: 800,
              fontSize: "28px",
              color: "var(--text)",
              marginBottom: "6px",
            }}
          >
            Revoke Authority
          </h1>
          <p
            style={{ color: "var(--text2)", fontSize: "14px", lineHeight: 1.7 }}
          >
            Revoke token authorities to build trust with investors. Makes your
            token immutable and rug-proof.
          </p>
        </div>

        {/* Why Revoke Info */}
        <div
          style={{
            background: "rgba(34,197,94,0.05)",
            border: "1px solid rgba(34,197,94,0.15)",
            borderRadius: "14px",
            padding: "18px 20px",
            marginBottom: "28px",
            display: "flex",
            gap: "14px",
          }}
        >
          <span style={{ fontSize: "22px", flexShrink: 0 }}>💡</span>
          <div
            style={{ fontSize: "13px", color: "var(--text2)", lineHeight: 1.7 }}
          >
            <strong style={{ color: "var(--green)" }}>Why revoke?</strong> Most
            traders and DEX aggregators check authority status before investing.
            Revoking{" "}
            <strong style={{ color: "var(--text)" }}>Mint Authority</strong>{" "}
            means no new tokens can ever be created. Revoking{" "}
            <strong style={{ color: "var(--text)" }}>Freeze Authority</strong>{" "}
            means no one can freeze user wallets.
          </div>
        </div>

        {/* Input */}
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "18px",
            padding: "24px",
            marginBottom: "24px",
          }}
        >
          <label style={lbl}>Token Mint Address</label>
          <div style={{ display: "flex", gap: "10px" }}>
            <input
              value={mintInput}
              onChange={(e) => {
                setMintInput(e.target.value);
                reset();
              }}
              placeholder="Enter your token mint address..."
              style={{
                flex: 1,
                background: "var(--bg2)",
                border: "1px solid var(--border)",
                borderRadius: "10px",
                padding: "10px 14px",
                color: "var(--text)",
                fontSize: "13px",
                outline: "none",
                fontFamily: "var(--font-mono)",
              }}
              suppressHydrationWarning
            />
            <button
              onClick={() => fetchAuthorityInfo(mintInput)}
              disabled={isLoading || !mintInput.trim()}
              style={{
                background: "linear-gradient(135deg,#eab308,#a16207)",
                color: "#fff",
                border: "none",
                borderRadius: "10px",
                padding: "10px 18px",
                fontSize: "13.5px",
                fontWeight: 600,
                cursor: mintInput.trim() ? "pointer" : "not-allowed",
                whiteSpace: "nowrap" as const,
                fontFamily: "var(--font-body)",
                opacity: !mintInput.trim() ? 0.5 : 1,
              }}
            >
              {status === "checking" ? "⏳ Checking..." : "🔍 Check"}
            </button>
          </div>
          <div
            style={{
              fontSize: "12px",
              color: "var(--text3)",
              fontFamily: "var(--font-mono)",
              marginTop: "6px",
            }}
          >
            The wallet that created this token must be connected
          </div>
        </div>

        {/* Error */}
        {error && (
          <div
            style={{
              background: "rgba(239,68,68,0.08)",
              border: "1px solid rgba(239,68,68,0.2)",
              borderRadius: "12px",
              padding: "14px 16px",
              fontSize: "13px",
              color: "var(--red)",
              marginBottom: "20px",
            }}
          >
            ❌ {error}
          </div>
        )}

        {/* Token Info */}
        {authorityInfo && (
          <>
            <div
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "14px",
                padding: "16px 20px",
                marginBottom: "20px",
                display: "flex",
                alignItems: "center",
                gap: "14px",
              }}
            >
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  background: "rgba(249,115,22,0.1)",
                  border: "1px solid rgba(249,115,22,0.2)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "20px",
                  flexShrink: 0,
                }}
              >
                🪙
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: "15px",
                    color: "var(--text)",
                  }}
                >
                  {authorityInfo.name}
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    color: "var(--text3)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {authorityInfo.symbol} · {authorityInfo.decimals} decimals ·{" "}
                  {(
                    parseInt(authorityInfo.supply) /
                    Math.pow(10, authorityInfo.decimals)
                  ).toLocaleString()}{" "}
                  supply
                </div>
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: "var(--green)",
                  fontFamily: "var(--font-mono)",
                  background: "rgba(34,197,94,0.1)",
                  border: "1px solid rgba(34,197,94,0.2)",
                  borderRadius: "8px",
                  padding: "4px 10px",
                }}
              >
                ✓ Verified
              </div>
            </div>

            {/* Authority Cards */}
            <div
              style={{
                display: "flex",
                flexDirection: "column" as const,
                gap: "12px",
                marginBottom: "24px",
              }}
            >
              {authorities.map((auth) => (
                <div
                  key={auth.key}
                  style={{
                    background: "var(--surface)",
                    border: `1px solid ${auth.revoked || auth.justRevoked ? "rgba(34,197,94,0.2)" : "var(--border)"}`,
                    borderRadius: "16px",
                    padding: "20px",
                    transition: "all 0.2s",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "14px",
                    }}
                  >
                    <div
                      style={{
                        width: "44px",
                        height: "44px",
                        background: auth.iconBg,
                        borderRadius: "11px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "20px",
                        flexShrink: 0,
                      }}
                    >
                      {auth.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontSize: "14px",
                          fontWeight: 600,
                          color: "var(--text)",
                          marginBottom: "3px",
                        }}
                      >
                        {auth.label}
                      </div>
                      <div
                        style={{
                          fontSize: "12px",
                          color: "var(--text3)",
                          lineHeight: 1.5,
                          marginBottom:
                            auth.value && !auth.revoked ? "6px" : "0",
                        }}
                      >
                        {auth.desc}
                      </div>
                      {auth.value && !auth.revoked && (
                        <div
                          style={{
                            fontSize: "11px",
                            color: "var(--text3)",
                            fontFamily: "var(--font-mono)",
                          }}
                        >
                          Current: {shortAddr(auth.value)}
                        </div>
                      )}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column" as const,
                        alignItems: "flex-end",
                        gap: "8px",
                        flexShrink: 0,
                      }}
                    >
                      {auth.revoked || auth.justRevoked ? (
                        <div
                          style={{
                            background: "rgba(34,197,94,0.1)",
                            border: "1px solid rgba(34,197,94,0.25)",
                            color: "var(--green)",
                            fontSize: "12px",
                            fontWeight: 600,
                            padding: "4px 12px",
                            borderRadius: "20px",
                            fontFamily: "var(--font-mono)",
                          }}
                        >
                          ✓ Revoked
                        </div>
                      ) : (
                        <>
                          <div
                            style={{
                              background: "rgba(239,68,68,0.1)",
                              border: "1px solid rgba(239,68,68,0.25)",
                              color: "var(--red)",
                              fontSize: "12px",
                              fontWeight: 600,
                              padding: "4px 12px",
                              borderRadius: "20px",
                              fontFamily: "var(--font-mono)",
                            }}
                          >
                            ● Active
                          </div>
                          <button
                            onClick={() => revokeAuthority(mintInput, auth.key)}
                            disabled={isLoading}
                            style={{
                              background: "rgba(239,68,68,0.1)",
                              color: "var(--red)",
                              border: "1px solid rgba(239,68,68,0.3)",
                              borderRadius: "8px",
                              padding: "7px 16px",
                              fontSize: "12.5px",
                              fontWeight: 600,
                              cursor: isLoading ? "wait" : "pointer",
                              fontFamily: "var(--font-body)",
                            }}
                          >
                            {isLoading ? "⏳" : "Revoke"}
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Fee */}
            <div
              style={{
                background: "var(--bg2)",
                border: "1px solid var(--border)",
                borderRadius: "14px",
                padding: "16px 18px",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  fontSize: "10px",
                  fontWeight: 600,
                  color: "var(--text3)",
                  fontFamily: "var(--font-mono)",
                  textTransform: "uppercase" as const,
                  letterSpacing: "1px",
                  marginBottom: "10px",
                }}
              >
                Fee per Revocation
              </div>
              {[
                { label: "Network fee", val: "~0.000005 SOL" },
                { label: "Service fee", val: "0.01 SOL" },
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
                    style={{
                      color: "var(--text)",
                      fontFamily: "var(--font-mono)",
                    }}
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
                <span style={{ color: "var(--text)" }}>Per revocation</span>
                <span
                  style={{
                    color: "var(--yellow)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  ~0.01 SOL
                </span>
              </div>
            </div>

            {/* All Revoked success */}
            {allRevoked ? (
              <div
                style={{
                  background: "rgba(34,197,94,0.08)",
                  border: "1px solid rgba(34,197,94,0.2)",
                  borderRadius: "14px",
                  padding: "20px",
                  textAlign: "center" as const,
                }}
              >
                <div style={{ fontSize: "28px", marginBottom: "8px" }}>🎉</div>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: "16px",
                    color: "var(--green)",
                    marginBottom: "4px",
                  }}
                >
                  All Authorities Revoked!
                </div>
                <div style={{ fontSize: "13px", color: "var(--text2)" }}>
                  This token is fully immutable and trustworthy.
                </div>
              </div>
            ) : hasAnyActive ? (
              <button
                onClick={() => revokeAll(mintInput)}
                disabled={isLoading}
                style={{
                  width: "100%",
                  background: isLoading
                    ? "var(--surface2)"
                    : "linear-gradient(135deg,#f97316,#c2410c)",
                  color: isLoading ? "var(--text3)" : "#fff",
                  border: "none",
                  borderRadius: "13px",
                  padding: "14px",
                  fontSize: "15px",
                  fontWeight: 700,
                  cursor: isLoading ? "wait" : "pointer",
                  fontFamily: "var(--font-body)",
                  boxShadow: isLoading
                    ? "none"
                    : "0 4px 20px rgba(249,115,22,0.3)",
                  transition: "all 0.2s",
                }}
              >
                {isLoading ? "⏳ Revoking..." : "🔒 Revoke All Authorities"}
              </button>
            ) : null}

            <p
              style={{
                fontSize: "11.5px",
                color: "var(--text3)",
                textAlign: "center" as const,
                fontFamily: "var(--font-mono)",
                marginTop: "12px",
              }}
            >
              ⚠️ Revocation is permanent and cannot be undone
            </p>
          </>
        )}
      </div>
    </div>
  );
}

const lbl: React.CSSProperties = {
  display: "block",
  fontSize: "11.5px",
  fontWeight: 600,
  color: "var(--text2)",
  fontFamily: "var(--font-mono)",
  textTransform: "uppercase",
  letterSpacing: "0.8px",
  marginBottom: "7px",
};
