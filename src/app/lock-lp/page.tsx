"use client";

import { useState } from "react";
import Link from "next/link";

const PRESETS = [
  {
    label: "5 min",
    minutes: 5,
    desc: "Testing only",
    color: "var(--text3)",
    recommended: false,
  },
  {
    label: "1 Month",
    minutes: 43200,
    desc: "Short term",
    color: "var(--yellow)",
    recommended: false,
  },
  {
    label: "3 Months",
    minutes: 129600,
    desc: "Standard",
    color: "var(--accent)",
    recommended: false,
  },
  {
    label: "6 Months",
    minutes: 259200,
    desc: "Recommended",
    color: "var(--green)",
    recommended: true,
  },
  {
    label: "1 Year",
    minutes: 525600,
    desc: "High trust",
    color: "var(--blue2)",
    recommended: false,
  },
  {
    label: "Custom",
    minutes: 0,
    desc: "Set manually",
    color: "var(--purple)",
    recommended: false,
  },
];

export default function LockLPPage() {
  const [lpMint, setLpMint] = useState("");
  const [lpAmount, setLpAmount] = useState("");
  const [selectedPreset, setSelectedPreset] = useState(3); // 6 months default
  const [customDate, setCustomDate] = useState("");
  const [customTime, setCustomTime] = useState("");
  const [recipient, setRecipient] = useState("");
  const [step, setStep] = useState<"form" | "confirm" | "success">("form");
  const [txSig, setTxSig] = useState("");
  const [streamId, setStreamId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const getUnlockDate = () => {
    if (PRESETS[selectedPreset].label === "Custom") {
      if (!customDate) return null;
      return new Date(`${customDate}T${customTime || "00:00"}`);
    }
    const now = new Date();
    now.setMinutes(now.getMinutes() + PRESETS[selectedPreset].minutes);
    return now;
  };

  const unlockDate = getUnlockDate();

  const formatDate = (d: Date | null) => {
    if (!d) return "—";
    return d.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getDuration = () => {
    if (!unlockDate) return "—";
    const now = new Date();
    const diff = unlockDate.getTime() - now.getTime();
    if (diff <= 0) return "Already passed";
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins} minute${mins !== 1 ? "s" : ""}`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""}`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days} day${days !== 1 ? "s" : ""}`;
    const months = Math.floor(days / 30);
    return `${months} month${months !== 1 ? "s" : ""}`;
  };

  const handleLock = async () => {
    if (!lpMint || !lpAmount || !unlockDate) {
      setError("Please fill all required fields");
      return;
    }
    setIsLoading(true);
    setError("");

    try {
      const provider =
        (window as any).phantom?.solana ||
        (window as any).solflare ||
        (window as any).okxwallet?.solana;

      if (!provider?.publicKey) {
        setError("Please connect your wallet first");
        setIsLoading(false);
        return;
      }

      const { Connection, PublicKey, clusterApiUrl } =
        await import("@solana/web3.js");
      const { SolanaStreamClient, getBN, ICluster } =
        await import("@streamflow/stream");

      const connection = new Connection(
        process.env.NEXT_PUBLIC_SOLANA_RPC_DEVNET || clusterApiUrl("devnet"),
        "confirmed",
      );

      // Verify mint exists
      const mintInfo = await connection.getAccountInfo(new PublicKey(lpMint));
      if (!mintInfo) {
        setError("Invalid token mint address — not found on Devnet");
        setIsLoading(false);
        return;
      }

      // Init Streamflow client
      const client = new SolanaStreamClient(
        process.env.NEXT_PUBLIC_SOLANA_RPC_DEVNET || clusterApiUrl("devnet"),
        ICluster.Devnet,
      );

      const unlockTimestamp = Math.floor(unlockDate.getTime() / 1000);
      const nowTimestamp = Math.floor(Date.now() / 1000);
      const recipientAddress =
        recipient.trim() || provider.publicKey.toString();

      // Convert amount — getBN(amount, decimals)
      const decimals = 9;
      const amountBN = getBN(parseFloat(lpAmount), decimals);

      const createParams = {
        recipient: recipientAddress,
        tokenId: lpMint,
        start: nowTimestamp + 10,
        amount: amountBN,
        period: 1,
        cliff: unlockTimestamp,
        cliffAmount: amountBN,
        amountPerPeriod: getBN(0, decimals),
        name: `MintForge LP Lock`,
        canTopup: false,
        cancelableBySender: false,
        cancelableByRecipient: false,
        transferableBySender: false,
        transferableByRecipient: false,
        automaticWithdrawal: false,
      };

      const solanaParams = {
        sender: provider,
        isNative: false,
      };

      const result = await client.create(createParams, solanaParams);

      setTxSig(result.txId);
      setStreamId(result.metadataId || result.txId);
      setStep("success");
    } catch (err: any) {
      console.error("Lock LP error:", err);
      setError(err?.message || "Failed to lock LP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      <div
        style={{
          maxWidth: "800px",
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
              background: "rgba(34,197,94,0.08)",
              border: "1px solid rgba(34,197,94,0.2)",
              borderRadius: "20px",
              padding: "4px 14px",
              fontSize: "12px",
              color: "var(--green)",
              fontFamily: "var(--font-mono)",
              marginBottom: "10px",
            }}
          >
            🔒 LP Lock
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
            Lock Liquidity via Streamflow
          </h1>
          <p
            style={{ color: "var(--text2)", fontSize: "14px", lineHeight: 1.7 }}
          >
            Lock your LP tokens to build investor trust. Locked LP proves you
            cannot rug pull.
          </p>
        </div>

        {/* Why Lock Banner */}
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
            <strong style={{ color: "var(--green)" }}>Why lock LP?</strong>{" "}
            DexScreener dan Birdeye akan menampilkan badge{" "}
            <strong style={{ color: "var(--text)" }}>"LP Locked"</strong> pada
            token kamu. Investor bisa verifikasi lock proof secara on-chain. Ini
            salah satu faktor terpenting untuk membangun trust.
          </div>
        </div>

        {/* Success State */}
        {step === "success" && (
          <div
            style={{
              background: "rgba(34,197,94,0.06)",
              border: "1px solid rgba(34,197,94,0.25)",
              borderRadius: "20px",
              padding: "32px",
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
                marginBottom: "8px",
              }}
            >
              LP Locked Successfully!
            </div>
            <div
              style={{
                fontSize: "14px",
                color: "var(--text2)",
                marginBottom: "24px",
              }}
            >
              LP tokens locked until{" "}
              <strong style={{ color: "var(--text)" }}>
                {formatDate(unlockDate)}
              </strong>{" "}
              ({getDuration()})
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
                  label: "STREAM / LOCK ID",
                  value: streamId,
                  href: `https://app.streamflow.finance/vesting/solana/devnet/${streamId}`,
                },
                {
                  label: "TRANSACTION",
                  value: txSig.slice(0, 32) + "...",
                  href: `https://solscan.io/tx/${txSig}?cluster=devnet`,
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
                      color: "var(--accent)",
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

            {/* Share proof */}
            <div
              style={{
                background: "var(--bg2)",
                border: "1px solid rgba(99,102,241,0.2)",
                borderRadius: "12px",
                padding: "16px 18px",
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "var(--blue2)",
                  marginBottom: "8px",
                }}
              >
                📢 Share This Lock Proof
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: "var(--text3)",
                  fontFamily: "var(--font-mono)",
                  marginBottom: "10px",
                  wordBreak: "break-all" as const,
                }}
              >
                {`https://app.streamflow.finance/vesting/solana/devnet/${streamId}`}
              </div>
              <button
                onClick={() =>
                  navigator.clipboard.writeText(
                    `https://app.streamflow.finance/vesting/solana/devnet/${streamId}`,
                  )
                }
                style={{
                  background: "rgba(99,102,241,0.1)",
                  color: "var(--blue2)",
                  border: "1px solid rgba(99,102,241,0.25)",
                  borderRadius: "8px",
                  padding: "7px 16px",
                  fontSize: "12.5px",
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "var(--font-body)",
                }}
              >
                📋 Copy Link
              </button>
            </div>

            <div
              style={{
                display: "flex",
                gap: "12px",
                flexWrap: "wrap" as const,
              }}
            >
              <a
                href={`https://app.streamflow.finance/vesting/solana/devnet/${streamId}`}
                target="_blank"
                rel="noreferrer"
                style={{
                  background: "linear-gradient(135deg,#22c55e,#15803d)",
                  color: "#fff",
                  borderRadius: "10px",
                  padding: "11px 22px",
                  fontSize: "13.5px",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                View on Streamflow ↗
              </a>
              <button
                onClick={() => {
                  setStep("form");
                  setLpMint("");
                  setLpAmount("");
                  setTxSig("");
                  setStreamId("");
                }}
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
                Lock Another
              </button>
            </div>
          </div>
        )}

        {/* Form */}
        {step === "form" && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 280px",
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
              {/* LP Token Input */}
              <div
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "18px",
                  padding: "24px",
                }}
              >
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "var(--text)",
                    marginBottom: "16px",
                  }}
                >
                  🪙 LP Token Details
                </div>

                <div style={{ marginBottom: "14px" }}>
                  <label style={lbl}>
                    LP Token Mint Address{" "}
                    <span style={{ color: "var(--accent)" }}>*</span>
                  </label>
                  <input
                    value={lpMint}
                    onChange={(e) => setLpMint(e.target.value)}
                    placeholder="LP token mint address from Raydium..."
                    style={inp}
                    suppressHydrationWarning
                  />
                  <span style={hint}>
                    Find in Raydium → My Pools → LP Token Address
                  </span>
                </div>

                <div>
                  <label style={lbl}>
                    Amount to Lock{" "}
                    <span style={{ color: "var(--accent)" }}>*</span>
                  </label>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <input
                      value={lpAmount}
                      onChange={(e) => setLpAmount(e.target.value)}
                      placeholder="e.g. 100"
                      type="number"
                      style={{ ...inp, marginBottom: 0 }}
                      suppressHydrationWarning
                    />
                    <button
                      onClick={() => setLpAmount("100")}
                      style={{
                        background: "rgba(249,115,22,0.1)",
                        color: "var(--accent)",
                        border: "1px solid rgba(249,115,22,0.25)",
                        borderRadius: "8px",
                        padding: "8px 14px",
                        fontSize: "12.5px",
                        fontWeight: 600,
                        cursor: "pointer",
                        whiteSpace: "nowrap" as const,
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      Max
                    </button>
                  </div>
                  <span style={hint}>
                    Enter the amount of LP tokens to lock
                  </span>
                </div>
              </div>

              {/* Lock Duration */}
              <div
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "18px",
                  padding: "24px",
                }}
              >
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "var(--text)",
                    marginBottom: "16px",
                  }}
                >
                  ⏰ Lock Duration
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "10px",
                    marginBottom: "16px",
                  }}
                >
                  {PRESETS.map((preset, i) => (
                    <div
                      key={preset.label}
                      onClick={() => setSelectedPreset(i)}
                      style={{
                        background:
                          selectedPreset === i
                            ? `rgba(34,197,94,0.08)`
                            : "var(--bg2)",
                        border: `1px solid ${selectedPreset === i ? "rgba(34,197,94,0.4)" : "var(--border)"}`,
                        borderRadius: "12px",
                        padding: "12px",
                        cursor: "pointer",
                        position: "relative" as const,
                        transition: "all 0.2s",
                        textAlign: "center" as const,
                      }}
                    >
                      {preset.recommended && (
                        <div
                          style={{
                            position: "absolute" as const,
                            top: "-1px",
                            right: "8px",
                            background: "var(--green)",
                            color: "#fff",
                            fontSize: "9px",
                            fontWeight: 700,
                            padding: "2px 6px",
                            borderRadius: "0 0 6px 6px",
                            fontFamily: "var(--font-mono)",
                          }}
                        >
                          BEST
                        </div>
                      )}
                      <div
                        style={{
                          fontSize: "14px",
                          fontWeight: 700,
                          color:
                            selectedPreset === i
                              ? "var(--green)"
                              : "var(--text)",
                          marginBottom: "3px",
                        }}
                      >
                        {preset.label}
                      </div>
                      <div
                        style={{
                          fontSize: "11px",
                          color:
                            selectedPreset === i
                              ? "var(--green)"
                              : "var(--text3)",
                          fontFamily: "var(--font-mono)",
                        }}
                      >
                        {preset.desc}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Custom date picker */}
                {PRESETS[selectedPreset].label === "Custom" && (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "12px",
                      padding: "16px",
                      background: "var(--bg2)",
                      borderRadius: "12px",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <div>
                      <label style={lbl}>Unlock Date</label>
                      <input
                        type="date"
                        style={inp}
                        value={customDate}
                        onChange={(e) => setCustomDate(e.target.value)}
                        suppressHydrationWarning
                      />
                    </div>
                    <div>
                      <label style={lbl}>Unlock Time</label>
                      <input
                        type="time"
                        style={inp}
                        value={customTime}
                        onChange={(e) => setCustomTime(e.target.value)}
                        suppressHydrationWarning
                      />
                    </div>
                  </div>
                )}

                {/* Unlock preview */}
                {unlockDate && (
                  <div
                    style={{
                      background: "rgba(34,197,94,0.05)",
                      border: "1px solid rgba(34,197,94,0.15)",
                      borderRadius: "10px",
                      padding: "12px 14px",
                      marginTop: "12px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: "11px",
                          color: "var(--text3)",
                          fontFamily: "var(--font-mono)",
                          marginBottom: "3px",
                        }}
                      >
                        UNLOCK DATE
                      </div>
                      <div
                        style={{
                          fontSize: "13.5px",
                          fontWeight: 600,
                          color: "var(--green)",
                        }}
                      >
                        {formatDate(unlockDate)}
                      </div>
                    </div>
                    <div style={{ textAlign: "right" as const }}>
                      <div
                        style={{
                          fontSize: "11px",
                          color: "var(--text3)",
                          fontFamily: "var(--font-mono)",
                          marginBottom: "3px",
                        }}
                      >
                        DURATION
                      </div>
                      <div
                        style={{
                          fontSize: "13.5px",
                          fontWeight: 600,
                          color: "var(--text)",
                        }}
                      >
                        {getDuration()}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Recipient */}
              <div
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "18px",
                  padding: "24px",
                }}
              >
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "var(--text)",
                    marginBottom: "6px",
                  }}
                >
                  👤 Recipient After Unlock
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    color: "var(--text3)",
                    marginBottom: "14px",
                  }}
                >
                  Leave empty to use your own wallet address
                </div>
                <label style={lbl}>Recipient Address (optional)</label>
                <input
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="Default: your connected wallet"
                  style={inp}
                  suppressHydrationWarning
                />
                <span style={hint}>
                  LP tokens will be sent here after unlock date
                </span>
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
              {/* Lock Summary */}
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
                  Lock Summary
                </div>
                {[
                  {
                    label: "LP Token",
                    val: lpMint ? lpMint.slice(0, 8) + "..." : "—",
                  },
                  { label: "Amount", val: lpAmount ? `${lpAmount} LP` : "—" },
                  { label: "Duration", val: getDuration() },
                  {
                    label: "Unlock",
                    val: unlockDate
                      ? formatDate(unlockDate).split(",")[0]
                      : "—",
                  },
                  { label: "Platform", val: "Streamflow" },
                ].map((row) => (
                  <div
                    key={row.label}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "12.5px",
                      padding: "5px 0",
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    <span style={{ color: "var(--text2)" }}>{row.label}</span>
                    <span
                      style={{
                        color: "var(--text)",
                        fontFamily: "var(--font-mono)",
                        fontSize: "12px",
                      }}
                    >
                      {row.val}
                    </span>
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
                  Fees
                </div>
                {[
                  { label: "Streamflow fee", val: "~0.01 SOL" },
                  { label: "Network fee", val: "~0.000005 SOL" },
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
                      color: "var(--green)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    ~0.01 SOL
                  </span>
                </div>
              </div>

              {/* Trust indicators */}
              <div
                style={{
                  background: "rgba(34,197,94,0.05)",
                  border: "1px solid rgba(34,197,94,0.15)",
                  borderRadius: "12px",
                  padding: "14px 16px",
                }}
              >
                <div
                  style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "var(--green)",
                    fontFamily: "var(--font-mono)",
                    marginBottom: "10px",
                  }}
                >
                  AFTER LOCKING
                </div>
                {[
                  "✅ DexScreener shows LP Locked badge",
                  "✅ Birdeye shows lock proof",
                  "✅ Investors can verify on-chain",
                  "✅ Cannot rug pull during lock",
                ].map((item) => (
                  <div
                    key={item}
                    style={{
                      fontSize: "12px",
                      color: "var(--text2)",
                      marginBottom: "5px",
                    }}
                  >
                    {item}
                  </div>
                ))}
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

              {/* Lock Button */}
              <button
                onClick={handleLock}
                disabled={isLoading || !lpMint || !lpAmount || !unlockDate}
                style={{
                  background:
                    !lpMint || !lpAmount || !unlockDate || isLoading
                      ? "var(--surface2)"
                      : "linear-gradient(135deg,#22c55e,#15803d)",
                  color:
                    !lpMint || !lpAmount || !unlockDate || isLoading
                      ? "var(--text3)"
                      : "#fff",
                  border: "none",
                  borderRadius: "13px",
                  padding: "14px",
                  fontSize: "15px",
                  fontWeight: 700,
                  cursor:
                    !lpMint || !lpAmount || !unlockDate || isLoading
                      ? "not-allowed"
                      : "pointer",
                  width: "100%",
                  boxShadow:
                    !lpMint || !lpAmount
                      ? "none"
                      : "0 4px 20px rgba(34,197,94,0.3)",
                  fontFamily: "var(--font-body)",
                  transition: "all 0.2s",
                }}
              >
                {isLoading ? "⏳ Locking LP..." : "🔒 Lock LP Now"}
              </button>

              <p
                style={{
                  fontSize: "11.5px",
                  color: "var(--text3)",
                  textAlign: "center" as const,
                  fontFamily: "var(--font-mono)",
                }}
              >
                Powered by Streamflow · Non-custodial
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
const hint: React.CSSProperties = {
  fontSize: "11.5px",
  color: "var(--text3)",
  fontFamily: "var(--font-mono)",
  display: "block",
  marginBottom: "12px",
};
