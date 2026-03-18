"use client";

export default function MeteoraPage() {
  return (
    <div style={{ padding: "40px", maxWidth: "1000px" }}>
      <div style={{ marginBottom: "28px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "16px",
          }}
        >
          <div
            style={{
              width: "36px",
              height: "36px",
              background: "rgba(168,85,247,0.15)",
              border: "1px solid rgba(168,85,247,0.3)",
              borderRadius: "9px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "18px",
            }}
          >
            ☄️
          </div>
          <div>
            <h1
              style={{
                fontWeight: 800,
                fontSize: "22px",
                color: "#e2e8f0",
                lineHeight: 1,
              }}
            >
              Meteora DLMM
            </h1>
            <div
              style={{
                fontSize: "12px",
                color: "#64748b",
                fontFamily: "monospace",
              }}
            >
              Dynamic Fee · Auto-adjusts to volatility
            </div>
          </div>
        </div>

        <div
          style={{
            background: "rgba(168,85,247,0.06)",
            border: "1px solid rgba(168,85,247,0.2)",
            borderRadius: "12px",
            padding: "14px 18px",
            marginBottom: "20px",
            display: "flex",
            gap: "12px",
          }}
        >
          <span style={{ fontSize: "20px" }}>🚧</span>
          <div>
            <div
              style={{
                fontWeight: 600,
                color: "#a855f7",
                fontSize: "13.5px",
                marginBottom: "3px",
              }}
            >
              SDK Integration Coming Soon
            </div>
            <div style={{ fontSize: "12.5px", color: "#94a3b8" }}>
              Use{" "}
              <a
                href="https://app.meteora.ag/dlmm/create"
                target="_blank"
                rel="noreferrer"
                style={{ color: "#a855f7" }}
              >
                Meteora directly ↗
              </a>{" "}
              while we integrate the SDK.
            </div>
          </div>
        </div>

        <div
          style={{
            background: "#141c26",
            border: "1px solid rgba(168,85,247,0.2)",
            borderRadius: "12px",
            padding: "18px 20px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              fontWeight: 700,
              color: "#a855f7",
              fontSize: "13.5px",
              marginBottom: "12px",
            }}
          >
            ☄️ Why Meteora DLMM?
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "10px",
            }}
          >
            {[
              { icon: "✅", text: "Cheapest setup (~0.1 SOL)" },
              { icon: "✅", text: "Dynamic fee = higher earnings" },
              { icon: "✅", text: "Great for token launch day" },
              { icon: "✅", text: "Fee auto-increases on volatility" },
              { icon: "❌", text: "Most complex to configure" },
              { icon: "❌", text: "Requires active monitoring" },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "13px",
                  color: "#94a3b8",
                }}
              >
                <span>{item.icon}</span>
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 300px",
          gap: "24px",
          alignItems: "start",
        }}
      >
        <div
          style={{
            background: "#141c26",
            border: "1px solid #1e2d42",
            borderRadius: "18px",
            padding: "28px",
            opacity: 0.7,
          }}
        >
          {[
            {
              label: "Token Address",
              placeholder: "Your token mint address...",
            },
            { label: "Pair With", type: "select" },
            {
              label: "Bin Step",
              placeholder: "10 (lower = more precise)",
              type: "number",
            },
            { label: "Initial Price", placeholder: "0.000001", type: "number" },
            { label: "Token Amount", placeholder: "0.00", type: "number" },
            { label: "SOL Amount", placeholder: "0.00", type: "number" },
          ].map((f) => (
            <div key={f.label} style={{ marginBottom: "16px" }}>
              <label style={lbl}>{f.label}</label>
              {f.type === "select" ? (
                <select style={inp} disabled>
                  <option>SOL</option>
                  <option>USDC</option>
                </select>
              ) : (
                <input
                  style={inp}
                  type={f.type || "text"}
                  placeholder={f.placeholder}
                  disabled
                />
              )}
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column" as const,
            gap: "14px",
          }}
        >
          <div
            style={{
              background: "#111720",
              border: "1px solid #1e2d42",
              borderRadius: "12px",
              padding: "16px 18px",
            }}
          >
            <div
              style={{
                fontSize: "11px",
                fontWeight: 600,
                color: "#64748b",
                fontFamily: "monospace",
                textTransform: "uppercase" as const,
                letterSpacing: "1px",
                marginBottom: "10px",
              }}
            >
              Est. Cost
            </div>
            {[
              { label: "Init DLMM Pool", val: "~0.1 SOL" },
              { label: "Service Fee", val: "0.1 SOL" },
            ].map((r) => (
              <div
                key={r.label}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "13px",
                  padding: "4px 0",
                  borderBottom: "1px solid #1e2d42",
                }}
              >
                <span style={{ color: "#94a3b8" }}>{r.label}</span>
                <span style={{ color: "#e2e8f0", fontFamily: "monospace" }}>
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
              <span style={{ color: "#e2e8f0" }}>Total</span>
              <span style={{ color: "#a855f7", fontFamily: "monospace" }}>
                ~0.2 SOL
              </span>
            </div>
          </div>

          <a
            href="https://app.meteora.ag/dlmm/create"
            target="_blank"
            rel="noreferrer"
            style={{
              background: "linear-gradient(135deg,#a855f7,#7c3aed)",
              color: "#fff",
              borderRadius: "12px",
              padding: "14px",
              fontSize: "14px",
              fontWeight: 700,
              textDecoration: "none",
              textAlign: "center" as const,
              display: "block",
            }}
          >
            Open Meteora ↗
          </a>
          <p
            style={{
              fontSize: "11.5px",
              color: "#64748b",
              textAlign: "center" as const,
              fontFamily: "monospace",
            }}
          >
            SDK integration coming soon
          </p>
        </div>
      </div>
    </div>
  );
}

const lbl: React.CSSProperties = {
  display: "block",
  fontSize: "12px",
  fontWeight: 600,
  color: "#94a3b8",
  fontFamily: "monospace",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
  marginBottom: "6px",
};
const inp: React.CSSProperties = {
  width: "100%",
  background: "#0d1117",
  border: "1px solid #1e2d42",
  borderRadius: "10px",
  padding: "10px 14px",
  color: "#e2e8f0",
  fontSize: "14px",
  outline: "none",
  fontFamily: "inherit",
  cursor: "not-allowed",
};
