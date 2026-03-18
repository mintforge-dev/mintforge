"use client";

import { useState, useRef } from "react";
import { useCreateToken, CreateTokenStatus } from "@/hooks/useCreateToken";
import Link from "next/link";
import WalletButton from "@/components/WalletButton";
import { useNetwork } from "@/components/WalletProvider";

const STATUS_MESSAGES: Record<CreateTokenStatus, string> = {
  idle: "",
  uploading_image: "📤 Uploading logo to IPFS...",
  uploading_metadata: "📦 Uploading metadata to IPFS...",
  creating_token: "⚡ Creating token on Solana...",
  adding_metadata: "🏷 Attaching on-chain metadata...",
  sending_fee: "💸 Processing service fee...",
  confirming: "⏳ Confirming transaction...",
  success: "🎉 Token created successfully!",
  error: "❌ Something went wrong",
};

export default function CreateTokenPage() {
  const { create, status, error, result, reset } = useCreateToken();
  const { network } = useNetwork();
  const clusterParam = network === "devnet" ? "?cluster=devnet" : "";
  const [activeTab, setActiveTab] = useState<
    "basic" | "supply" | "social" | "authority"
  >("basic");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState({
    name: "",
    symbol: "",
    description: "",
    decimals: 9,
    supply: 1_000_000_000,
    website: "",
    twitter: "",
    telegram: "",
    discord: "",
    revokeMint: true,
    revokeFreeze: true,
    immutableMetadata: false,
  });

  const isLoading = !["idle", "success", "error"].includes(status);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 1_000_000) {
      alert("Logo must be under 1MB");
      return;
    }
    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    if (!form.name || !form.symbol) {
      alert("Token name and symbol are required");
      return;
    }
    await create({ ...form, logoFile });
  };

  const TABS = [
    { key: "basic", label: "📝 Token Info" },
    { key: "supply", label: "🪙 Supply" },
    { key: "social", label: "🌐 Social" },
    { key: "authority", label: "🔒 Authority" },
  ] as const;

  return (
    <div style={{ minHeight: "100vh" }}>
      <div
        style={{
          maxWidth: "1100px",
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
              alignItems: "center",
              gap: "8px",
              background: "rgba(249,115,22,0.08)",
              border: "1px solid rgba(249,115,22,0.2)",
              borderRadius: "20px",
              padding: "4px 14px",
              fontSize: "12px",
              color: "var(--accent)",
              fontFamily: "var(--font-mono)",
              display: "block",
              marginBottom: "10px",
              width: "fit-content",
            }}
          >
            ⚡ Create SPL Token
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
            Create Your Token
          </h1>
          <p style={{ color: "var(--text2)", fontSize: "14px" }}>
            Deploy your Solana SPL token in minutes. No coding required.
          </p>
        </div>

        {/* Success State */}
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
              Token Created Successfully!
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
                  label: "MINT ADDRESS",
                  value: result.mintAddress,
                  href: `https://solscan.io/token/${result.mintAddress}${clusterParam}`,
                  color: "var(--text)",
                },
                {
                  label: "TRANSACTION",
                  value: result.txSignature.slice(0, 32) + "...",
                  href: `https://solscan.io/tx/${result.txSignature}${clusterParam}`,
                  color: "var(--accent)",
                },
                {
                  label: "METADATA URI",
                  value: result.metadataUri.slice(0, 40) + "...",
                  href: result.metadataUri,
                  color: "var(--blue2)",
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
                href={`https://solscan.io/token/${result.mintAddress}${clusterParam}`}
                target="_blank"
                rel="noreferrer"
                style={{
                  background: "linear-gradient(135deg,#f97316,#c2410c)",
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
                Create Another
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
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                💧 Add Liquidity →
              </Link>
            </div>
          </div>
        )}

        {/* Main Form */}
        {status !== "success" && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 320px",
              gap: "24px",
              alignItems: "start",
            }}
            className="form-layout"
          >
            {/* Left — Form Panel */}
            <div
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "20px",
                overflow: "hidden",
              }}
            >
              {/* Tabs */}
              <div
                style={{
                  display: "flex",
                  borderBottom: "1px solid var(--border)",
                  overflowX: "auto",
                  scrollbarWidth: "none" as const,
                }}
              >
                {TABS.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    style={{
                      padding: "14px 20px",
                      fontSize: "13.5px",
                      fontWeight: 600,
                      border: "none",
                      borderBottom: `2px solid ${activeTab === tab.key ? "var(--accent)" : "transparent"}`,
                      color:
                        activeTab === tab.key
                          ? "var(--accent)"
                          : "var(--text2)",
                      cursor: "pointer",
                      whiteSpace: "nowrap" as const,
                      fontFamily: "var(--font-body)",
                      background:
                        activeTab === tab.key
                          ? "rgba(249,115,22,0.05)"
                          : "transparent",
                      transition: "all 0.2s",
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div style={{ padding: "28px" }}>
                {/* TAB: BASIC */}
                {activeTab === "basic" && (
                  <div>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "16px",
                        marginBottom: "16px",
                      }}
                    >
                      <div>
                        <label style={lbl}>
                          Token Name{" "}
                          <span style={{ color: "var(--accent)" }}>*</span>
                        </label>
                        <input
                          style={inp}
                          placeholder="e.g. MintForge Token"
                          value={form.name}
                          maxLength={32}
                          onChange={(e) =>
                            setForm((f) => ({ ...f, name: e.target.value }))
                          }
                          suppressHydrationWarning
                        />
                        <span style={hint}>{form.name.length}/32</span>
                      </div>
                      <div>
                        <label style={lbl}>
                          Symbol{" "}
                          <span style={{ color: "var(--accent)" }}>*</span>
                        </label>
                        <input
                          style={inp}
                          placeholder="e.g. MFG"
                          value={form.symbol}
                          maxLength={10}
                          onChange={(e) =>
                            setForm((f) => ({
                              ...f,
                              symbol: e.target.value.toUpperCase(),
                            }))
                          }
                          suppressHydrationWarning
                        />
                        <span style={hint}>{form.symbol.length}/10</span>
                      </div>
                    </div>
                    <div style={{ marginBottom: "16px" }}>
                      <label style={lbl}>Description</label>
                      <textarea
                        style={{
                          ...inp,
                          minHeight: "80px",
                          resize: "vertical" as const,
                        }}
                        placeholder="Describe your token..."
                        value={form.description}
                        onChange={(e) =>
                          setForm((f) => ({
                            ...f,
                            description: e.target.value,
                          }))
                        }
                        suppressHydrationWarning
                      />
                    </div>
                    <div>
                      <label style={lbl}>
                        Token Logo{" "}
                        <span
                          style={{
                            color: "var(--text3)",
                            fontSize: "11px",
                            textTransform: "none" as const,
                            letterSpacing: 0,
                            fontWeight: 400,
                          }}
                        >
                          (PNG/JPG, max 1MB)
                        </span>
                      </label>
                      <div
                        onClick={() => logoInputRef.current?.click()}
                        style={{
                          background: "var(--bg2)",
                          border: `2px dashed ${logoPreview ? "var(--accent)" : "var(--border)"}`,
                          borderRadius: "14px",
                          padding: "28px",
                          textAlign: "center" as const,
                          cursor: "pointer",
                          transition: "all 0.2s",
                        }}
                      >
                        {logoPreview ? (
                          <div>
                            <img
                              src={logoPreview}
                              alt="preview"
                              style={{
                                width: "72px",
                                height: "72px",
                                borderRadius: "50%",
                                objectFit: "cover" as const,
                                margin: "0 auto 10px",
                                display: "block",
                                border: "2px solid var(--accent)",
                              }}
                            />
                            <div
                              style={{
                                fontSize: "13px",
                                color: "var(--accent)",
                              }}
                            >
                              Click to change
                            </div>
                          </div>
                        ) : (
                          <div>
                            <div
                              style={{ fontSize: "36px", marginBottom: "8px" }}
                            >
                              🖼
                            </div>
                            <div
                              style={{
                                fontSize: "13px",
                                color: "var(--text2)",
                                marginBottom: "4px",
                              }}
                            >
                              Click to upload token logo
                            </div>
                            <div
                              style={{
                                fontSize: "11.5px",
                                color: "var(--text3)",
                                fontFamily: "var(--font-mono)",
                              }}
                            >
                              Recommended: 200×200px PNG
                            </div>
                          </div>
                        )}
                      </div>
                      <input
                        ref={logoInputRef}
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={handleLogoChange}
                      />
                    </div>
                  </div>
                )}

                {/* TAB: SUPPLY */}
                {activeTab === "supply" && (
                  <div>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "16px",
                        marginBottom: "16px",
                      }}
                    >
                      <div>
                        <label style={lbl}>
                          Total Supply{" "}
                          <span style={{ color: "var(--accent)" }}>*</span>
                        </label>
                        <input
                          style={inp}
                          type="number"
                          value={form.supply}
                          onChange={(e) =>
                            setForm((f) => ({
                              ...f,
                              supply: Number(e.target.value),
                            }))
                          }
                          suppressHydrationWarning
                        />
                        <span style={hint}>
                          {form.supply >= 1e9
                            ? (form.supply / 1e9).toFixed(2) + "B"
                            : form.supply >= 1e6
                              ? (form.supply / 1e6).toFixed(2) + "M"
                              : form.supply.toLocaleString()}{" "}
                          tokens
                        </span>
                      </div>
                      <div>
                        <label style={lbl}>Decimals</label>
                        <select
                          style={inp}
                          value={form.decimals}
                          onChange={(e) =>
                            setForm((f) => ({
                              ...f,
                              decimals: Number(e.target.value),
                            }))
                          }
                        >
                          <option value={9}>9 — Standard (like SOL)</option>
                          <option value={6}>6 — Like USDC</option>
                          <option value={4}>4</option>
                          <option value={2}>2</option>
                          <option value={0}>0 — Whole only</option>
                        </select>
                        <span style={hint}>Divisibility of your token</span>
                      </div>
                    </div>
                    <div>
                      <label style={lbl}>Quick Presets</label>
                      <div
                        style={{
                          display: "flex",
                          gap: "8px",
                          flexWrap: "wrap" as const,
                        }}
                      >
                        {[
                          { val: 1_000_000, label: "1M" },
                          { val: 100_000_000, label: "100M" },
                          { val: 1_000_000_000, label: "1B" },
                          { val: 1_000_000_000_000, label: "1T" },
                        ].map((p) => (
                          <button
                            key={p.val}
                            onClick={() =>
                              setForm((f) => ({ ...f, supply: p.val }))
                            }
                            style={{
                              background:
                                form.supply === p.val
                                  ? "rgba(249,115,22,0.15)"
                                  : "var(--bg2)",
                              border: `1px solid ${form.supply === p.val ? "var(--accent)" : "var(--border)"}`,
                              borderRadius: "8px",
                              padding: "7px 16px",
                              fontSize: "13px",
                              color:
                                form.supply === p.val
                                  ? "var(--accent)"
                                  : "var(--text2)",
                              cursor: "pointer",
                              fontFamily: "var(--font-mono)",
                              fontWeight: 600,
                            }}
                          >
                            {p.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB: SOCIAL */}
                {activeTab === "social" && (
                  <div>
                    <div style={{ marginBottom: "14px" }}>
                      <label style={lbl}>Website</label>
                      <input
                        style={inp}
                        type="url"
                        placeholder="https://yourproject.com"
                        value={form.website}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, website: e.target.value }))
                        }
                        suppressHydrationWarning
                      />
                    </div>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "14px",
                        marginBottom: "14px",
                      }}
                    >
                      <div>
                        <label style={lbl}>Twitter / X</label>
                        <input
                          style={inp}
                          placeholder="https://x.com/..."
                          value={form.twitter}
                          onChange={(e) =>
                            setForm((f) => ({ ...f, twitter: e.target.value }))
                          }
                          suppressHydrationWarning
                        />
                      </div>
                      <div>
                        <label style={lbl}>Telegram</label>
                        <input
                          style={inp}
                          placeholder="https://t.me/..."
                          value={form.telegram}
                          onChange={(e) =>
                            setForm((f) => ({ ...f, telegram: e.target.value }))
                          }
                          suppressHydrationWarning
                        />
                      </div>
                    </div>
                    <div>
                      <label style={lbl}>Discord</label>
                      <input
                        style={inp}
                        placeholder="https://discord.gg/..."
                        value={form.discord}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, discord: e.target.value }))
                        }
                        suppressHydrationWarning
                      />
                    </div>
                  </div>
                )}

                {/* TAB: AUTHORITY */}
                {activeTab === "authority" && (
                  <div>
                    <p
                      style={{
                        fontSize: "13px",
                        color: "var(--text2)",
                        marginBottom: "20px",
                        lineHeight: 1.7,
                        background: "rgba(99,102,241,0.06)",
                        border: "1px solid rgba(99,102,241,0.15)",
                        borderRadius: "10px",
                        padding: "12px 14px",
                      }}
                    >
                      💡 Revoking authorities builds investor trust by making
                      your token immutable. Recommended for most projects.
                    </p>
                    {[
                      {
                        key: "revokeMint" as const,
                        icon: "🔒",
                        title: "Revoke Mint Authority",
                        desc: "No additional tokens can ever be minted. Supply becomes permanently fixed.",
                        recommended: true,
                      },
                      {
                        key: "revokeFreeze" as const,
                        icon: "❄️",
                        title: "Revoke Freeze Authority",
                        desc: "Prevents freezing user wallets. Required for most DEX listings.",
                        recommended: true,
                      },
                      {
                        key: "immutableMetadata" as const,
                        icon: "📌",
                        title: "Immutable Metadata",
                        desc: "Token name, symbol, and image cannot be changed after creation.",
                        recommended: false,
                      },
                    ].map((item) => (
                      <div
                        key={item.key}
                        onClick={() =>
                          setForm((f) => ({ ...f, [item.key]: !f[item.key] }))
                        }
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "14px",
                          padding: "14px 16px",
                          background: form[item.key]
                            ? "rgba(249,115,22,0.05)"
                            : "var(--bg2)",
                          border: `1px solid ${form[item.key] ? "rgba(249,115,22,0.3)" : "var(--border)"}`,
                          borderRadius: "12px",
                          marginBottom: "10px",
                          cursor: "pointer",
                          transition: "all 0.18s",
                        }}
                      >
                        <span style={{ fontSize: "20px" }}>{item.icon}</span>
                        <div style={{ flex: 1 }}>
                          <div
                            style={{
                              fontSize: "14px",
                              fontWeight: 600,
                              color: "var(--text)",
                              marginBottom: "2px",
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                            }}
                          >
                            {item.title}
                            {item.recommended && (
                              <span
                                style={{
                                  fontSize: "10px",
                                  background: "rgba(34,197,94,0.1)",
                                  color: "var(--green)",
                                  border: "1px solid rgba(34,197,94,0.2)",
                                  borderRadius: "8px",
                                  padding: "1px 7px",
                                  fontFamily: "var(--font-mono)",
                                }}
                              >
                                Recommended
                              </span>
                            )}
                          </div>
                          <div
                            style={{
                              fontSize: "12px",
                              color: "var(--text3)",
                              lineHeight: 1.5,
                            }}
                          >
                            {item.desc}
                          </div>
                        </div>
                        <div
                          style={{
                            width: "40px",
                            height: "22px",
                            background: form[item.key]
                              ? "var(--accent)"
                              : "var(--border2)",
                            borderRadius: "11px",
                            position: "relative" as const,
                            flexShrink: 0,
                            transition: "background 0.2s",
                          }}
                        >
                          <div
                            style={{
                              position: "absolute" as const,
                              width: "16px",
                              height: "16px",
                              background: "#fff",
                              borderRadius: "50%",
                              top: "3px",
                              left: form[item.key] ? "21px" : "3px",
                              transition: "left 0.2s",
                            }}
                          />
                        </div>
                      </div>
                    ))}
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
                  Preview
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "12px",
                  }}
                >
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      background: "rgba(249,115,22,0.1)",
                      border: "1px solid rgba(249,115,22,0.25)",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "22px",
                      overflow: "hidden",
                      flexShrink: 0,
                    }}
                  >
                    {logoPreview ? (
                      <img
                        src={logoPreview}
                        alt="logo"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover" as const,
                        }}
                      />
                    ) : (
                      "🪙"
                    )}
                  </div>
                  <div>
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: "16px",
                        color: "var(--text)",
                      }}
                    >
                      {form.name || "Token Name"}
                    </div>
                    <div
                      style={{
                        fontSize: "12px",
                        color: "var(--text3)",
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      {form.symbol || "SYMBOL"}
                    </div>
                  </div>
                </div>
                {form.description && (
                  <div
                    style={{
                      fontSize: "12.5px",
                      color: "var(--text2)",
                      marginBottom: "12px",
                      lineHeight: 1.6,
                    }}
                  >
                    {form.description}
                  </div>
                )}
                <div
                  style={{
                    display: "flex",
                    gap: "6px",
                    flexWrap: "wrap" as const,
                  }}
                >
                  <span style={tag}>
                    {form.supply >= 1e9
                      ? (form.supply / 1e9).toFixed(1) + "B"
                      : (form.supply / 1e6).toFixed(0) + "M"}{" "}
                    Supply
                  </span>
                  <span style={tag}>{form.decimals} Decimals</span>
                  <span
                    style={{
                      ...tag,
                      background: "rgba(34,197,94,0.08)",
                      border: "1px solid rgba(34,197,94,0.15)",
                      color: "var(--green)",
                    }}
                  >
                    Solana SPL
                  </span>
                </div>
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
                    marginBottom: "12px",
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
                      padding: "5px 0",
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
                      color: "var(--accent)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    ~0.07 SOL
                  </span>
                </div>
              </div>

              {/* Status */}
              {isLoading && (
                <div
                  style={{
                    background: "rgba(99,102,241,0.08)",
                    border: "1px solid rgba(99,102,241,0.2)",
                    borderRadius: "10px",
                    padding: "13px 16px",
                    fontSize: "13px",
                    color: "var(--blue2)",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <span
                    style={{
                      animation: "rotateSlow 1s linear infinite",
                      display: "inline-block",
                    }}
                  >
                    ⏳
                  </span>
                  {STATUS_MESSAGES[status]}
                </div>
              )}

              {/* Error */}
              {status === "error" && error && (
                <div
                  style={{
                    background: "rgba(239,68,68,0.08)",
                    border: "1px solid rgba(239,68,68,0.2)",
                    borderRadius: "10px",
                    padding: "13px 16px",
                    fontSize: "13px",
                    color: "var(--red)",
                  }}
                >
                  ❌ {error}
                </div>
              )}

              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                style={{
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
                  width: "100%",
                  boxShadow: isLoading
                    ? "none"
                    : "0 4px 20px rgba(249,115,22,0.3)",
                  fontFamily: "var(--font-body)",
                  transition: "all 0.2s",
                }}
              >
                {isLoading
                  ? STATUS_MESSAGES[status] || "⏳ Processing..."
                  : "⚡ Create Token Now"}
              </button>

              <p
                style={{
                  fontSize: "11.5px",
                  color: "var(--text3)",
                  textAlign: "center" as const,
                  fontFamily: "var(--font-mono)",
                }}
              >
                Safe · No hidden permissions · Wallet-standard compliant
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
  transition: "border-color 0.2s",
};
const hint: React.CSSProperties = {
  fontSize: "11.5px",
  color: "var(--text3)",
  fontFamily: "var(--font-mono)",
  display: "block",
  marginBottom: "12px",
};
const tag: React.CSSProperties = {
  background: "var(--bg2)",
  border: "1px solid var(--border)",
  borderRadius: "8px",
  padding: "3px 10px",
  fontSize: "11.5px",
  color: "var(--text3)",
  fontFamily: "var(--font-mono)",
};
