"use client";

import { useState, useRef, useEffect } from "react";
import { useUpdateMetadata } from "@/hooks/useUpdateMetadata";
import Link from "next/link";

const STATUS_MESSAGES: Record<string, string> = {
  fetching: "🔍 Fetching current metadata...",
  uploading_image: "📤 Uploading new logo to IPFS...",
  uploading_metadata: "📦 Uploading metadata to IPFS...",
  sending_fee: "💸 Processing service fee...",
  updating: "✏️ Updating on-chain metadata...",
};

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

const hint: React.CSSProperties = {
  fontSize: "11.5px",
  color: "var(--text3)",
  fontFamily: "var(--font-mono)",
  display: "block",
  marginBottom: "12px",
};

export default function CreatorPage() {
  const {
    fetchCurrentMetadata,
    updateMetadata,
    status,
    error,
    currentMeta,
    txSignature,
    reset,
  } = useUpdateMetadata();
  const [mintInput, setMintInput] = useState("");
  const [activeTab, setActiveTab] = useState<"basic" | "social">("basic");
  const [form, setForm] = useState({
    name: "",
    symbol: "",
    description: "",
    website: "",
    twitter: "",
    telegram: "",
    discord: "",
  });
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  const isLoading = [
    "fetching",
    "uploading_image",
    "uploading_metadata",
    "sending_fee",
    "updating",
  ].includes(status);

  useEffect(() => {
    if (currentMeta) {
      setForm({
        name: currentMeta.name,
        symbol: currentMeta.symbol,
        description: currentMeta.description,
        website: currentMeta.website,
        twitter: currentMeta.twitter,
        telegram: currentMeta.telegram,
        discord: currentMeta.discord,
      });
      setLogoPreview(currentMeta.image || null);
    }
  }, [currentMeta]);

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
    await updateMetadata(mintInput, { ...form, logoFile });
  };

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
              background: "rgba(168,85,247,0.08)",
              border: "1px solid rgba(168,85,247,0.2)",
              borderRadius: "20px",
              padding: "4px 14px",
              fontSize: "12px",
              color: "var(--purple)",
              fontFamily: "var(--font-mono)",
              marginBottom: "10px",
            }}
          >
            ✏️ Creator Info
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
            Modify Creator Info
          </h1>
          <p
            style={{ color: "var(--text2)", fontSize: "14px", lineHeight: 1.7 }}
          >
            Update token name, symbol, logo, description and social links.
            Metadata must be mutable.
          </p>
        </div>

        {/* Mint Input */}
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
              onClick={() => fetchCurrentMetadata(mintInput)}
              disabled={isLoading || !mintInput.trim()}
              style={{
                background: "linear-gradient(135deg,#a855f7,#7c3aed)",
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
              {status === "fetching" ? "⏳ Loading..." : "🔍 Load"}
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
            Only the wallet with Update Authority can modify metadata
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

        {/* Immutable Warning */}
        {currentMeta && !currentMeta.isMutable && (
          <div
            style={{
              background: "rgba(239,68,68,0.08)",
              border: "1px solid rgba(239,68,68,0.2)",
              borderRadius: "14px",
              padding: "18px 20px",
              marginBottom: "20px",
              display: "flex",
              gap: "12px",
            }}
          >
            <span style={{ fontSize: "22px" }}>🔒</span>
            <div>
              <div
                style={{
                  fontWeight: 700,
                  color: "var(--red)",
                  marginBottom: "4px",
                  fontSize: "14px",
                }}
              >
                Metadata is Immutable
              </div>
              <div style={{ fontSize: "13px", color: "var(--text2)" }}>
                This token metadata has been made immutable and cannot be
                updated.
              </div>
            </div>
          </div>
        )}

        {/* Success */}
        {status === "success" && txSignature && (
          <div
            style={{
              background: "rgba(34,197,94,0.06)",
              border: "1px solid rgba(34,197,94,0.25)",
              borderRadius: "20px",
              padding: "28px",
              marginBottom: "24px",
              animation: "fadeUp 0.4s ease",
            }}
          >
            <div style={{ fontSize: "32px", marginBottom: "12px" }}>🎉</div>
            <div
              style={{
                fontFamily: "var(--font-head)",
                fontWeight: 800,
                fontSize: "20px",
                color: "var(--green)",
                marginBottom: "16px",
              }}
            >
              Metadata Updated Successfully!
            </div>
            <div
              style={{
                background: "var(--bg2)",
                border: "1px solid var(--border)",
                borderRadius: "12px",
                padding: "14px 18px",
                marginBottom: "16px",
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
                TRANSACTION
              </div>
              <a
                href={`https://solscan.io/tx/${txSignature}?cluster=devnet`}
                target="_blank"
                rel="noreferrer"
                style={{
                  fontSize: "13px",
                  color: "var(--accent)",
                  fontFamily: "var(--font-mono)",
                  wordBreak: "break-all" as const,
                  textDecoration: "none",
                }}
              >
                {txSignature.slice(0, 32)}... ↗
              </a>
            </div>
            <button
              onClick={() => setMintInput("")}
              style={{
                background: "var(--surface)",
                color: "var(--text)",
                border: "1px solid var(--border2)",
                borderRadius: "10px",
                padding: "10px 20px",
                fontSize: "13.5px",
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "var(--font-body)",
              }}
            >
              Update Another Token
            </button>
          </div>
        )}

        {/* Main Form */}
        {currentMeta && currentMeta.isMutable && status !== "success" && (
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
                }}
              >
                {[
                  { key: "basic" as const, label: "📝 Basic Info" },
                  { key: "social" as const, label: "🌐 Social Links" },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    style={{
                      padding: "14px 24px",
                      fontSize: "13.5px",
                      fontWeight: 600,
                      border: "none",
                      borderBottom: `2px solid ${activeTab === tab.key ? "var(--purple)" : "transparent"}`,
                      color:
                        activeTab === tab.key
                          ? "var(--purple)"
                          : "var(--text2)",
                      cursor: "pointer",
                      background:
                        activeTab === tab.key
                          ? "rgba(168,85,247,0.05)"
                          : "transparent",
                      fontFamily: "var(--font-body)",
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
                        <label style={lbl}>Token Name</label>
                        <input
                          style={inp}
                          value={form.name}
                          onChange={(e) =>
                            setForm((f) => ({ ...f, name: e.target.value }))
                          }
                          maxLength={32}
                          suppressHydrationWarning
                        />
                        <span style={hint}>{form.name.length}/32</span>
                      </div>
                      <div>
                        <label style={lbl}>Symbol</label>
                        <input
                          style={inp}
                          value={form.symbol}
                          onChange={(e) =>
                            setForm((f) => ({
                              ...f,
                              symbol: e.target.value.toUpperCase(),
                            }))
                          }
                          maxLength={10}
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
                          border: `2px dashed ${logoPreview ? "var(--purple)" : "var(--border)"}`,
                          borderRadius: "14px",
                          padding: "24px",
                          textAlign: "center" as const,
                          cursor: "pointer",
                          transition: "all 0.2s",
                        }}
                      >
                        {logoPreview ? (
                          <div>
                            <img
                              src={logoPreview}
                              alt="logo"
                              style={{
                                width: "64px",
                                height: "64px",
                                borderRadius: "50%",
                                objectFit: "cover" as const,
                                margin: "0 auto 10px",
                                display: "block",
                                border: "2px solid var(--purple)",
                              }}
                            />
                            <div
                              style={{
                                fontSize: "13px",
                                color: "var(--purple)",
                              }}
                            >
                              Click to change logo
                            </div>
                          </div>
                        ) : (
                          <div>
                            <div
                              style={{ fontSize: "32px", marginBottom: "8px" }}
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
                              Click to upload new logo
                            </div>
                            <div
                              style={{
                                fontSize: "11px",
                                color: "var(--text3)",
                                fontFamily: "var(--font-mono)",
                              }}
                            >
                              IPFS hosted — permanent
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
                      width: "44px",
                      height: "44px",
                      borderRadius: "50%",
                      overflow: "hidden",
                      border: "1px solid var(--border)",
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "var(--bg2)",
                      fontSize: "20px",
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
                        fontSize: "15px",
                        color: "var(--text)",
                      }}
                    >
                      {form.name || currentMeta.name}
                    </div>
                    <div
                      style={{
                        fontSize: "12px",
                        color: "var(--text3)",
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      {form.symbol || currentMeta.symbol}
                    </div>
                  </div>
                </div>
                {form.description && (
                  <div
                    style={{
                      fontSize: "12.5px",
                      color: "var(--text2)",
                      lineHeight: 1.6,
                      marginBottom: "10px",
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
                  {form.website && <span style={socialTag}>🌐</span>}
                  {form.twitter && <span style={socialTag}>𝕏</span>}
                  {form.telegram && <span style={socialTag}>✈️</span>}
                  {form.discord && <span style={socialTag}>👾</span>}
                </div>
              </div>

              {/* Update Authority Info */}
              <div
                style={{
                  background: "var(--bg2)",
                  border: "1px solid var(--border)",
                  borderRadius: "12px",
                  padding: "14px 16px",
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
                    marginBottom: "8px",
                  }}
                >
                  Update Authority
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    color: "var(--green)",
                    fontFamily: "var(--font-mono)",
                    marginBottom: "4px",
                  }}
                >
                  ✓ Mutable
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    color: "var(--text3)",
                    fontFamily: "var(--font-mono)",
                    wordBreak: "break-all" as const,
                  }}
                >
                  {currentMeta.updateAuthority.slice(0, 16)}...
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
                    marginBottom: "10px",
                  }}
                >
                  Estimated Fees
                </div>
                {[
                  { label: "IPFS Storage", val: "FREE" },
                  { label: "Network fee", val: "~0.000005 SOL" },
                  { label: "Service fee", val: "0.01 SOL" },
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
                      color: "var(--purple)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    ~0.01 SOL
                  </span>
                </div>
              </div>

              {/* Status */}
              {isLoading && (
                <div
                  style={{
                    background: "rgba(168,85,247,0.08)",
                    border: "1px solid rgba(168,85,247,0.2)",
                    borderRadius: "10px",
                    padding: "13px 16px",
                    fontSize: "13px",
                    color: "var(--purple)",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  ⏳ {STATUS_MESSAGES[status]}
                </div>
              )}

              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                style={{
                  background: isLoading
                    ? "var(--surface2)"
                    : "linear-gradient(135deg,#a855f7,#7c3aed)",
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
                    : "0 4px 20px rgba(168,85,247,0.3)",
                  fontFamily: "var(--font-body)",
                  transition: "all 0.2s",
                }}
              >
                {isLoading
                  ? STATUS_MESSAGES[status] || "⏳ Processing..."
                  : "✏️ Update Metadata"}
              </button>

              <p
                style={{
                  fontSize: "11.5px",
                  color: "var(--text3)",
                  textAlign: "center" as const,
                  fontFamily: "var(--font-mono)",
                }}
              >
                Changes stored permanently on IPFS
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const socialTag: React.CSSProperties = {
  background: "rgba(168,85,247,0.08)",
  border: "1px solid rgba(168,85,247,0.2)",
  borderRadius: "8px",
  padding: "4px 10px",
  fontSize: "14px",
  color: "var(--purple)",
};
