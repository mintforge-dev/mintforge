"use client";

import { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { useConnection } from "@solana/wallet-adapter-react";
import { PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";

const STORAGE_KEY = "mintforge_wallet";

const SUPPORTED_WALLETS = [
  {
    name: "Phantom",
    icon: "👻",
    detect: () => !!(window as any)?.phantom?.solana?.isPhantom,
    getProvider: () => (window as any)?.phantom?.solana,
  },
  {
    name: "Solflare",
    icon: "🌞",
    detect: () => !!(window as any)?.solflare?.isSolflare,
    getProvider: () => (window as any)?.solflare,
  },
  {
    name: "OKX Wallet",
    icon: "⭕",
    detect: () => !!(window as any)?.okxwallet?.solana,
    getProvider: () => (window as any)?.okxwallet?.solana,
  },
  {
    name: "Backpack",
    icon: "🎒",
    detect: () => !!(window as any)?.backpack?.isBackpack,
    getProvider: () => (window as any)?.backpack,
  },
  {
    name: "MetaMask",
    icon: "🦊",
    detect: () =>
      !!(window as any)?.ethereum?.isMetaMask &&
      !(window as any)?.ethereum?.isPhantom &&
      !(window as any)?.phantom,
    getProvider: () => (window as any)?.ethereum,
  },
  {
    name: "Trust Wallet",
    icon: "🛡️",
    detect: () =>
      !!(window as any)?.ethereum?.isTrust ||
      !!(window as any)?.trustwallet?.isTrustWallet,
    getProvider: () => (window as any)?.ethereum,
  },
];

interface WalletState {
  connected: boolean;
  publicKey: string | null;
  walletName: string | null;
}

// ── Wallet Modal Component (rendered via Portal) ──
function WalletModal({
  onClose,
  onConnect,
  detectedWallets,
  loading,
}: {
  onClose: () => void;
  onConnect: (wallet: (typeof SUPPORTED_WALLETS)[0]) => void;
  detectedWallets: typeof SUPPORTED_WALLETS;
  loading: boolean;
}) {
  const notInstalled = SUPPORTED_WALLETS.filter(
    (w) => !detectedWallets.find((d) => d.name === w.name),
  );

  return createPortal(
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.8)",
        backdropFilter: "blur(8px)",
        zIndex: 999999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#0d1117",
          border: "1px solid #253347",
          borderRadius: "20px",
          padding: "28px",
          width: "100%",
          maxWidth: "420px",
          maxHeight: "80vh",
          overflowY: "auto",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "6px",
          }}
        >
          <div style={{ fontSize: "20px", fontWeight: 800, color: "#e2e8f0" }}>
            Connect Wallet
          </div>
          <button
            onClick={onClose}
            style={{
              background: "#141c26",
              border: "1px solid #1e2d42",
              borderRadius: "8px",
              width: "32px",
              height: "32px",
              cursor: "pointer",
              color: "#94a3b8",
              fontSize: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ✕
          </button>
        </div>

        <div
          style={{
            fontSize: "13px",
            color: "#64748b",
            fontFamily: "monospace",
            marginBottom: "24px",
          }}
        >
          {detectedWallets.length} wallet
          {detectedWallets.length !== 1 ? "s" : ""} detected
        </div>

        {/* Installed */}
        {detectedWallets.length > 0 && (
          <>
            <div
              style={{
                fontSize: "11px",
                color: "#64748b",
                fontFamily: "monospace",
                textTransform: "uppercase",
                letterSpacing: "1px",
                marginBottom: "10px",
              }}
            >
              ✅ Installed
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
                marginBottom: "20px",
              }}
            >
              {detectedWallets.map((wallet) => (
                <button
                  key={wallet.name}
                  onClick={() => onConnect(wallet)}
                  disabled={loading}
                  style={{
                    background: "#141c26",
                    border: "1px solid #1e2d42",
                    borderRadius: "12px",
                    padding: "20px 16px",
                    cursor: loading ? "wait" : "pointer",
                    textAlign: "center",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#f97316";
                    e.currentTarget.style.background = "rgba(249,115,22,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#1e2d42";
                    e.currentTarget.style.background = "#141c26";
                  }}
                >
                  <div style={{ fontSize: "32px", marginBottom: "10px" }}>
                    {wallet.icon}
                  </div>
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#e2e8f0",
                      marginBottom: "4px",
                    }}
                  >
                    {wallet.name}
                  </div>
                  <div
                    style={{
                      fontSize: "11px",
                      color: "#22c55e",
                      fontFamily: "monospace",
                    }}
                  >
                    ● Detected
                  </div>
                </button>
              ))}
            </div>
          </>
        )}

        {/* Not Installed */}
        {notInstalled.length > 0 && (
          <>
            <div
              style={{
                fontSize: "11px",
                color: "#64748b",
                fontFamily: "monospace",
                textTransform: "uppercase",
                letterSpacing: "1px",
                marginBottom: "10px",
              }}
            >
              Not Installed
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: "8px",
                marginBottom: "20px",
              }}
            >
              {notInstalled.map((wallet) => (
                <button
                  key={wallet.name}
                  onClick={() =>
                    window.open(
                      `https://${wallet.name.toLowerCase().replace(/\s/g, "")}.app`,
                      "_blank",
                    )
                  }
                  style={{
                    background: "#141c26",
                    border: "1px solid #1e2d42",
                    borderRadius: "10px",
                    padding: "12px 8px",
                    cursor: "pointer",
                    textAlign: "center",
                    opacity: 0.55,
                  }}
                >
                  <div style={{ fontSize: "22px", marginBottom: "6px" }}>
                    {wallet.icon}
                  </div>
                  <div
                    style={{
                      fontSize: "11px",
                      fontWeight: 600,
                      color: "#94a3b8",
                    }}
                  >
                    {wallet.name}
                  </div>
                  <div
                    style={{
                      fontSize: "10px",
                      color: "#64748b",
                      fontFamily: "monospace",
                    }}
                  >
                    Install ↗
                  </div>
                </button>
              ))}
            </div>
          </>
        )}

        {/* Trust note */}
        <div
          style={{
            background: "rgba(34,197,94,0.05)",
            border: "1px solid rgba(34,197,94,0.15)",
            borderRadius: "10px",
            padding: "12px 14px",
            fontSize: "12px",
            color: "#94a3b8",
            display: "flex",
            gap: "8px",
            alignItems: "flex-start",
          }}
        >
          <span style={{ color: "#22c55e", flexShrink: 0 }}>✓</span>
          MintForge hanya request tanda tangan transaksi. Tidak pernah meminta
          seed phrase atau private key.
        </div>
      </div>
    </div>,
    document.body, // ← render langsung ke body, bypass semua z-index conflict
  );
}

// ── Main WalletButton Component ──
export default function WalletButton() {
  const { connection } = useConnection();
  const [mounted, setMounted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [walletState, setWalletState] = useState<WalletState>({
    connected: false,
    publicKey: null,
    walletName: null,
  });
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [detectedWallets, setDetectedWallets] = useState<
    typeof SUPPORTED_WALLETS
  >([]);

  const fetchBalance = useCallback(
    async (pubkey: string) => {
      try {
        const pk = new PublicKey(pubkey);
        const bal = await connection.getBalance(pk);
        setBalance(bal / LAMPORTS_PER_SOL);
      } catch {
        setBalance(null);
      }
    },
    [connection],
  );

  useEffect(() => {
    setMounted(true);

    setTimeout(() => {
      const detected = SUPPORTED_WALLETS.filter((w) => {
        try {
          return w.detect();
        } catch {
          return false;
        }
      });
      setDetectedWallets(detected);
    }, 500);

    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;
    const { walletName, publicKey } = JSON.parse(saved);
    if (!walletName || !publicKey) return;

    setTimeout(async () => {
      try {
        const wallet = SUPPORTED_WALLETS.find((w) => w.name === walletName);
        if (!wallet) return;
        const provider = wallet.getProvider();
        if (!provider) return;

        if (provider.isConnected && provider.publicKey) {
          const pk = provider.publicKey.toString();
          setWalletState({ connected: true, publicKey: pk, walletName });
          fetchBalance(pk);
          return;
        }

        const resp = await provider.connect({ onlyIfTrusted: true });
        const pk = resp?.publicKey?.toString();
        if (pk) {
          setWalletState({ connected: true, publicKey: pk, walletName });
          fetchBalance(pk);
        }
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }, 800);
  }, []);

  useEffect(() => {
    if (walletState.publicKey) fetchBalance(walletState.publicKey);
  }, [walletState.publicKey, fetchBalance]);

  const connectWallet = async (wallet: (typeof SUPPORTED_WALLETS)[0]) => {
    try {
      setLoading(true);
      const provider = wallet.getProvider();
      if (!provider) throw new Error("Provider not found");

      const resp = await provider.connect();
      const pk = resp?.publicKey?.toString() || provider?.publicKey?.toString();
      if (!pk) throw new Error("No public key returned");

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          walletName: wallet.name,
          publicKey: pk,
        }),
      );

      setWalletState({
        connected: true,
        publicKey: pk,
        walletName: wallet.name,
      });
      setShowModal(false);

      provider.on?.("disconnect", () => {
        localStorage.removeItem(STORAGE_KEY);
        setWalletState({ connected: false, publicKey: null, walletName: null });
        setBalance(null);
      });

      provider.on?.("accountChanged", (newPubkey: any) => {
        if (newPubkey) {
          const newPk = newPubkey.toString();
          localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({ walletName: wallet.name, publicKey: newPk }),
          );
          setWalletState((s) => ({ ...s, publicKey: newPk }));
        } else {
          localStorage.removeItem(STORAGE_KEY);
          setWalletState({
            connected: false,
            publicKey: null,
            walletName: null,
          });
          setBalance(null);
        }
      });
    } catch (err: any) {
      console.error(`${wallet.name} connect failed:`, err?.message);
    } finally {
      setLoading(false);
    }
  };

  const disconnect = async () => {
    try {
      const wallet = SUPPORTED_WALLETS.find(
        (w) => w.name === walletState.walletName,
      );
      await wallet?.getProvider()?.disconnect?.();
    } catch {}
    localStorage.removeItem(STORAGE_KEY);
    setWalletState({ connected: false, publicKey: null, walletName: null });
    setBalance(null);
  };

  if (!mounted) {
    return (
      <button style={btnStyle} suppressHydrationWarning>
        Connect Wallet
      </button>
    );
  }

  const shortAddress = walletState.publicKey
    ? `${walletState.publicKey.slice(0, 4)}...${walletState.publicKey.slice(-4)}`
    : "";

  const activeWallet = SUPPORTED_WALLETS.find(
    (w) => w.name === walletState.walletName,
  );

  if (walletState.connected && walletState.publicKey) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        {balance !== null && (
          <span
            style={{
              background: "#141c26",
              border: "1px solid #1e2d42",
              borderRadius: "20px",
              padding: "5px 12px",
              fontSize: "12px",
              color: "#94a3b8",
              fontFamily: "monospace",
            }}
          >
            {balance.toFixed(3)} SOL
          </span>
        )}
        <button
          onClick={disconnect}
          style={{
            background: "#141c26",
            color: "#22c55e",
            border: "1px solid #22c55e",
            borderRadius: "10px",
            padding: "9px 16px",
            fontSize: "13px",
            fontWeight: 600,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <span>{activeWallet?.icon}</span>
          <span>● {shortAddress}</span>
        </button>
      </div>
    );
  }

  return (
    <>
      <button onClick={() => setShowModal(true)} style={btnStyle}>
        Connect Wallet
      </button>

      {showModal && (
        <WalletModal
          onClose={() => setShowModal(false)}
          onConnect={connectWallet}
          detectedWallets={detectedWallets}
          loading={loading}
        />
      )}
    </>
  );
}

const btnStyle: React.CSSProperties = {
  background: "linear-gradient(135deg, #f97316, #c2410c)",
  color: "#fff",
  border: "none",
  borderRadius: "10px",
  padding: "9px 20px",
  fontSize: "13.5px",
  fontWeight: 600,
  cursor: "pointer",
  boxShadow: "0 4px 16px rgba(249,115,22,0.25)",
};
