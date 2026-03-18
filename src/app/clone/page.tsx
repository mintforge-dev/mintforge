"use client";

import { useState, useEffect } from "react";
import { useCloneToken } from "@/hooks/useCloneToken";
import Link from "next/link";

const TRENDING = [
  {
    name: "Dogwifhat",
    symbol: "WIF",
    emoji: "🐕",
    change: "+12.4%",
    hot: true,
  },
  { name: "Bonk", symbol: "BONK", emoji: "🔨", change: "+8.7%", hot: false },
  {
    name: "Popcat",
    symbol: "POPCAT",
    emoji: "🐱",
    change: "+31.2%",
    hot: true,
  },
  { name: "Goat", symbol: "GOAT", emoji: "🐐", change: "+19.8%", hot: true },
  {
    name: "Moo Deng",
    symbol: "MOODENG",
    emoji: "🦛",
    change: "-4.1%",
    hot: false,
  },
  {
    name: "Fartcoin",
    symbol: "FARTCOIN",
    emoji: "💨",
    change: "+5.3%",
    hot: false,
  },
];

export default function CloneTokenPage() {
  const { fetchMeta, clone, status, error, fetchedMeta, result, reset } =
    useCloneToken();
  const [mintInput, setMintInput] = useState("");
  const [selectedTrending, setSelectedTrending] = useState<string | null>(null);
  const [overrides, setOverrides] = useState({
    name: "",
    symbol: "",
    supply: 1_000_000_000,
    decimals: 9,
    revokeMint: true,
    revokeFreeze: true,
    immutableMetadata: false,
  });

  const isLoading = ["fetching", "sending_fee", "cloning"].includes(status);

  useEffect(() => {
    if (fetchedMeta) {
      setOverrides((o) => ({
        ...o,
        name: fetchedMeta.name,
        symbol: fetchedMeta.symbol,
        supply: fetchedMeta.supply > 0 ? fetchedMeta.supply : 1_000_000_000,
        decimals: fetchedMeta.decimals,
      }));
    }
  }, [fetchedMeta]);

  const handleSelectTrending = (token: (typeof TRENDING)[0]) => {
    setSelectedTrending(token.name);
    setOverrides((o) => ({ ...o, name: "", symbol: "" }));
  };

  const handleClone = () =>
    clone({
      ...overrides,
      name: overrides.name || fetchedMeta?.name,
      symbol: overrides.symbol || fetchedMeta?.symbol,
    });

  return (
    <div style={{ minHeight: "100vh" }}>
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          padding: "40px 24px 80px",
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: "32px" }}>
          <Link
            href="/tokens"
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
            ← Back to Token Tools
          </Link>
          <div
            style={{
              display: "inline-block",
              background: "rgba(239,68,68,0.08)",
              border: "1px solid rgba(239,68,68,0.2)",
              borderRadius: "20px",
              padding: "4px 14px",
              fontSize: "12px",
              color: "var(--red)",
              fontFamily: "var(--font-mono)",
              marginBottom: "10px",
            }}
          >
            🔥 Clone Token
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
            Clone Trending Token
          </h1>
          <p style={{ color: "var(--text2)", fontSize: "14px" }}>
            Copy metadata from any token. Your clone gets a unique mint address.
          </p>
        </div>

        {/* Success */}
        {status === "success" && result && (
          <div
            style={{
              background: "rgba(34,197,94,0.06)",
              border: "1px solid rgba(34,197,94,0.25)",
              borderRadius: "20px",
              padding: "32px",
              marginBottom: "28px",
              animation: "fadeUp 0.4s ease",
            }}
          >
            <div style={{ fontSize: "40px", marginBottom: "14px" }}>🎉</div>
            <div
              style={{
                fontFamily: "var(--font-head)",
                fontWeight: 800,
                fontSize: "22px",
                color: "var(--green)",
                marginBottom: "20px",
              }}
            >
              Token Clone Berhasil!
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column" as const,
                gap: "10px",
                marginBottom: "24px",
              }}
            >
              {[
                {
                  label: "NEW MINT ADDRESS",
                  value: result.mintAddress,
                  href: `https://solscan.io/token/${result.mintAddress}?cluster=devnet`,
                  color: "var(--text)",
                },
                {
                  label: "TRANSACTION",
                  value: result.txSignature.slice(0, 32) + "...",
                  href: `https://solscan.io/tx/${result.txSignature}?cluster=devnet`,
                  color: "var(--accent)",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    background: "var(--bg2)",
                    border: "1px solid var(--border)",
                    borderRadius: "12px",
                    padding: "14px 18px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "10px",
                      color: "var(--text3)",
                      fontFamily: "var(--font-mono)",
                      marginBottom: "5px",
                      letterSpacing: "1px",
                    }}
                  >
                    {item.label}
                  </div>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      fontSize: "13px",
                      color: item.color,
                      fontFamily: "var(--font-mono)",
                      wordBreak: "break-all" as const,
                      textDecoration: "none",
                    }}
                  >
                    {item.value} ↗
                  </a>
                </div>
              ))}
            </div>
            <div
              style={{
                display: "flex",
                gap: "12px",
                flexWrap: "wrap" as const,
              }}
            >
              <a
                href={`https://solscan.io/token/${result.mintAddress}?cluster=devnet`}
                target="_blank"
                rel="noreferrer"
                style={{
                  background: "linear-gradient(135deg,#ef4444,#b91c1c)",
                  color: "#fff",
                  borderRadius: "10px",
                  padding: "11px 22px",
                  fontSize: "13.5px",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                View on Solscan ↗
              </a>
              <button
                onClick={reset}
                style={{
                  background: "var(--surface)",
                  color: "var(--text)",
                  border: "1px solid var(--border2)",
                  borderRadius: "10px",
                  padding: "11px 22px",
                  fontSize: "13.5px",
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "var(--font-body)",
                }}
              >
                Clone Another
              </button>
              <Link
                href="/liquidity/raydium-v2"
                style={{
                  background: "rgba(99,102,241,0.1)",
                  color: "var(--blue2)",
                  border: "1px solid rgba(99,102,241,0.25)",
                  borderRadius: "10px",
                  padding: "11px 22px",
                  fontSize: "13.5px",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                💧 Add Liquidity →
              </Link>
            </div>
          </div>
        )}

        {status !== "success" && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 300px",
              gap: "24px",
              alignItems: "start",
            }}
            className="form-layout"
          >
            {/* Left */}
            <div
              style={{
                display: "flex",
                flexDirection: "column" as const,
                gap: "20px",
              }}
            >
              {/* Trending Grid */}
              <div
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "20px",
                  padding: "24px",
                }}
              >
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "var(--text)",
                    marginBottom: "16px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  🔥 Trending Now
                  <span
                    style={{
                      fontSize: "11px",
                      color: "var(--text3)",
                      fontFamily: "var(--font-mono)",
                      fontWeight: 400,
                    }}
                  >
                    Click to quick-fill
                  </span>
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3,1fr)",
                    gap: "10px",
                  }}
                >
                  {TRENDING.map((token) => (
                    <div
                      key={token.name}
                      onClick={() => handleSelectTrending(token)}
                      style={{
                        background:
                          selectedTrending === token.name
                            ? "rgba(249,115,22,0.08)"
                            : "var(--bg2)",
                        border: `1px solid ${selectedTrending === token.name ? "rgba(249,115,22,0.4)" : "var(--border)"}`,
                        borderRadius: "12px",
                        padding: "14px",
                        cursor: "pointer",
                        position: "relative" as const,
                        transition: "all 0.2s",
                      }}
                    >
                      {token.hot && (
                        <div
                          style={{
                            position: "absolute" as const,
                            top: "-1px",
                            right: "10px",
                            background: "var(--red)",
                            color: "#fff",
                            fontSize: "9px",
                            fontWeight: 700,
                            padding: "2px 7px",
                            borderRadius: "0 0 6px 6px",
                            fontFamily: "var(--font-mono)",
                          }}
                        >
                          HOT
                        </div>
                      )}
                      <div style={{ fontSize: "24px", marginBottom: "8px" }}>
                        {token.emoji}
                      </div>
                      <div
                        style={{
                          fontSize: "13px",
                          fontWeight: 700,
                          color: "var(--text)",
                          marginBottom: "2px",
                        }}
                      >
                        {token.name}
                      </div>
                      <div
                        style={{
                          fontSize: "11px",
                          color: "var(--text3)",
                          fontFamily: "var(--font-mono)",
                          marginBottom: "6px",
                        }}
                      >
                        {token.symbol}
                      </div>
                      <div
                        style={{
                          fontSize: "12px",
                          fontWeight: 600,
                          color: token.change.startsWith("+")
                            ? "var(--green)"
                            : "var(--red)",
                          fontFamily: "var(--font-mono)",
                        }}
                      >
                        {token.change}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fetch Input */}
              <div
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "20px",
                  padding: "24px",
                }}
              >
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "var(--text)",
                    marginBottom: "14px",
                  }}
                >
                  🔗 Enter Mint Address
                </div>
                <div
                  style={{ display: "flex", gap: "10px", marginBottom: "16px" }}
                >
                  <input
                    value={mintInput}
                    onChange={(e) => setMintInput(e.target.value)}
                    placeholder="Enter Solana token mint address..."
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
                    onClick={() => fetchMeta(mintInput)}
                    disabled={isLoading || !mintInput.trim()}
                    style={{
                      background: "linear-gradient(135deg,#3b82f6,#1d4ed8)",
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
                    {status === "fetching" ? "⏳ Fetching..." : "🔍 Fetch"}
                  </button>
                </div>

                {/* Fetched metadata */}
                {fetchedMeta && (
                  <div
                    style={{
                      background: "var(--bg2)",
                      border: "1px solid rgba(34,197,94,0.2)",
                      borderRadius: "12px",
                      padding: "16px",
                      marginBottom: "20px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "10px",
                        color: "var(--green)",
                        fontFamily: "var(--font-mono)",
                        marginBottom: "10px",
                        letterSpacing: "1px",
                      }}
                    >
                      ✓ METADATA FETCHED
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        marginBottom: "10px",
                      }}
                    >
                      {fetchedMeta.image ? (
                        <img
                          src={fetchedMeta.image}
                          alt="token"
                          style={{
                            width: "42px",
                            height: "42px",
                            borderRadius: "50%",
                            objectFit: "cover" as const,
                            border: "1px solid var(--border)",
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            width: "42px",
                            height: "42px",
                            background: "var(--border)",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "20px",
                          }}
                        >
                          🪙
                        </div>
                      )}
                      <div>
                        <div
                          style={{
                            fontWeight: 700,
                            fontSize: "15px",
                            color: "var(--text)",
                          }}
                        >
                          {fetchedMeta.name}
                        </div>
                        <div
                          style={{
                            fontSize: "12px",
                            color: "var(--text3)",
                            fontFamily: "var(--font-mono)",
                          }}
                        >
                          {fetchedMeta.symbol} · {fetchedMeta.decimals} decimals
                        </div>
                      </div>
                      <div
                        style={{
                          marginLeft: "auto",
                          fontSize: "12px",
                          color: "var(--green)",
                          fontFamily: "var(--font-mono)",
                        }}
                      >
                        ✓ Verified
                      </div>
                    </div>
                  </div>
                )}

                {/* Overrides */}
                {fetchedMeta && (
                  <div>
                    <div
                      style={{
                        fontSize: "11px",
                        fontWeight: 600,
                        color: "var(--text3)",
                        fontFamily: "var(--font-mono)",
                        textTransform: "uppercase" as const,
                        letterSpacing: "1px",
                        marginBottom: "12px",
                      }}
                    >
                      Override Settings
                    </div>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "12px",
                        marginBottom: "12px",
                      }}
                    >
                      <div>
                        <label style={lbl}>New Name</label>
                        <input
                          style={inp}
                          value={overrides.name}
                          onChange={(e) =>
                            setOverrides((o) => ({
                              ...o,
                              name: e.target.value,
                            }))
                          }
                          placeholder={fetchedMeta.name}
                          suppressHydrationWarning
                        />
                      </div>
                      <div>
                        <label style={lbl}>New Symbol</label>
                        <input
                          style={inp}
                          value={overrides.symbol}
                          onChange={(e) =>
                            setOverrides((o) => ({
                              ...o,
                              symbol: e.target.value.toUpperCase(),
                            }))
                          }
                          placeholder={fetchedMeta.symbol}
                          maxLength={10}
                          suppressHydrationWarning
                        />
                      </div>
                    </div>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "12px",
                      }}
                    >
                      <div>
                        <label style={lbl}>Supply</label>
                        <input
                          style={inp}
                          type="number"
                          value={overrides.supply}
                          onChange={(e) =>
                            setOverrides((o) => ({
                              ...o,
                              supply: Number(e.target.value),
                            }))
                          }
                          suppressHydrationWarning
                        />
                      </div>
                      <div>
                        <label style={lbl}>Decimals</label>
                        <select
                          style={inp}
                          value={overrides.decimals}
                          onChange={(e) =>
                            setOverrides((o) => ({
                              ...o,
                              decimals: Number(e.target.value),
                            }))
                          }
                        >
                          <option value={9}>9 — Standard</option>
                          <option value={6}>6 — Like USDC</option>
                          <option value={0}>0 — Whole only</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Panel */}
            <div
              style={{
                display: "flex",
                flexDirection: "column" as const,
                gap: "16px",
                position: "sticky" as const,
                top: "80px",
              }}
            >
              {/* Preview */}
              <div
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "16px",
                  padding: "20px",
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
                    marginBottom: "14px",
                  }}
                >
                  Clone Preview
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "10px",
                  }}
                >
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      background: "rgba(239,68,68,0.1)",
                      border: "1px solid rgba(239,68,68,0.25)",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "20px",
                      overflow: "hidden",
                      flexShrink: 0,
                    }}
                  >
                    {fetchedMeta?.image ? (
                      <img
                        src={fetchedMeta.image}
                        alt="logo"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover" as const,
                        }}
                      />
                    ) : (
                      "🔥"
                    )}
                  </div>
                  <div>
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: "15px",
                        color: "var(--text)",
                      }}
                    >
                      {overrides.name || fetchedMeta?.name || "Token Name"}
                    </div>
                    <div
                      style={{
                        fontSize: "12px",
                        color: "var(--text3)",
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      {overrides.symbol || fetchedMeta?.symbol || "SYMBOL"}
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    fontSize: "11.5px",
                    color: "var(--text3)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  New unique mint address will be generated
                </div>
              </div>

              {/* Authority toggles */}
              <div
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "16px",
                  padding: "18px",
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
                    marginBottom: "12px",
                  }}
                >
                  Authority
                </div>
                {[
                  { key: "revokeMint" as const, label: "Revoke Mint" },
                  { key: "revokeFreeze" as const, label: "Revoke Freeze" },
                  {
                    key: "immutableMetadata" as const,
                    label: "Immutable Metadata",
                  },
                ].map((item) => (
                  <div
                    key={item.key}
                    onClick={() =>
                      setOverrides((o) => ({ ...o, [item.key]: !o[item.key] }))
                    }
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "8px 0",
                      cursor: "pointer",
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    <span style={{ fontSize: "13px", color: "var(--text2)" }}>
                      {item.label}
                    </span>
                    <div
                      style={{
                        width: "36px",
                        height: "20px",
                        background: overrides[item.key]
                          ? "var(--accent)"
                          : "var(--border2)",
                        borderRadius: "10px",
                        position: "relative" as const,
                        transition: "background 0.2s",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute" as const,
                          width: "14px",
                          height: "14px",
                          background: "#fff",
                          borderRadius: "50%",
                          top: "3px",
                          left: overrides[item.key] ? "19px" : "3px",
                          transition: "left 0.2s",
                        }}
                      />
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
                  Estimated Fees
                </div>
                {[
                  { label: "Network Rent", val: "~0.002 SOL" },
                  { label: "Metadata Storage", val: "~0.012 SOL" },
                  { label: "Service Fee", val: "0.05 SOL" },
                ].map((row) => (
                  <div
                    key={row.label}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "13px",
                      padding: "4px 0",
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    <span style={{ color: "var(--text2)" }}>{row.label}</span>
                    <span
                      style={{
                        color: "var(--text)",
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      {row.val}
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
                  <span style={{ color: "var(--text)" }}>Total</span>
                  <span
                    style={{
                      color: "var(--red)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    ~0.07 SOL
                  </span>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div
                  style={{
                    background: "rgba(239,68,68,0.08)",
                    border: "1px solid rgba(239,68,68,0.2)",
                    borderRadius: "10px",
                    padding: "12px 14px",
                    fontSize: "13px",
                    color: "var(--red)",
                  }}
                >
                  ❌ {error}
                </div>
              )}

              {/* Status */}
              {isLoading && (
                <div
                  style={{
                    background: "rgba(99,102,241,0.08)",
                    border: "1px solid rgba(99,102,241,0.2)",
                    borderRadius: "10px",
                    padding: "12px 14px",
                    fontSize: "13px",
                    color: "var(--blue2)",
                    display: "flex",
                    gap: "8px",
                  }}
                >
                  ⏳{" "}
                  {status === "fetching"
                    ? "Fetching metadata..."
                    : status === "sending_fee"
                      ? "Processing fee..."
                      : "Cloning token..."}
                </div>
              )}

              {/* Clone Button */}
              <button
                onClick={handleClone}
                disabled={isLoading || !fetchedMeta}
                style={{
                  background:
                    !fetchedMeta || isLoading
                      ? "var(--surface2)"
                      : "linear-gradient(135deg,#ef4444,#b91c1c)",
                  color: !fetchedMeta || isLoading ? "var(--text3)" : "#fff",
                  border: "none",
                  borderRadius: "13px",
                  padding: "14px",
                  fontSize: "15px",
                  fontWeight: 700,
                  cursor: !fetchedMeta || isLoading ? "not-allowed" : "pointer",
                  width: "100%",
                  boxShadow: !fetchedMeta
                    ? "none"
                    : "0 4px 20px rgba(239,68,68,0.3)",
                  fontFamily: "var(--font-body)",
                  transition: "all 0.2s",
                }}
              >
                {isLoading
                  ? "⏳ Processing..."
                  : !fetchedMeta
                    ? "Fetch Token First"
                    : "🔥 Clone Token"}
              </button>

              <p
                style={{
                  fontSize: "11.5px",
                  color: "var(--text3)",
                  textAlign: "center" as const,
                  fontFamily: "var(--font-mono)",
                }}
              >
                Clone gets unique mint address · Original unaffected
              </p>
            </div>
          </div>
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
const inp: React.CSSProperties = {
  width: "100%",
  background: "var(--bg2)",
  border: "1px solid var(--border)",
  borderRadius: "10px",
  padding: "10px 14px",
  color: "var(--text)",
  fontSize: "14px",
  outline: "none",
  fontFamily: "var(--font-body)",
  marginBottom: "4px",
};
