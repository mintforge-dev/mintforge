import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        background: "#0d1117",
        borderTop: "1px solid #1e2d42",
        padding: "40px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1.5fr 1fr 1fr 1fr",
          gap: "40px",
        }}
        className="footer-grid"
      >
        {/* Brand */}
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "12px",
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
              style={{ fontWeight: 800, fontSize: "18px", color: "#e2e8f0" }}
            >
              Mint<span style={{ color: "#f97316" }}>Forge</span>
            </span>
          </div>
          <p
            style={{
              fontSize: "13px",
              color: "#64748b",
              lineHeight: 1.7,
              maxWidth: "220px",
            }}
          >
            The most trusted Solana token factory. Create, clone, and manage SPL
            tokens with zero coding.
          </p>
          <div style={{ display: "flex", gap: "8px", marginTop: "16px" }}>
            {["𝕏", "✈", "👾", "💻"].map((icon, i) => (
              <a
                key={i}
                href="#"
                style={{
                  width: "32px",
                  height: "32px",
                  background: "#141c26",
                  border: "1px solid #1e2d42",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textDecoration: "none",
                  fontSize: "14px",
                  color: "#94a3b8",
                }}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Tools */}
        <div>
          <h4
            style={{
              fontSize: "11px",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "1px",
              color: "#64748b",
              fontFamily: "monospace",
              marginBottom: "14px",
            }}
          >
            Tools
          </h4>
          {[
            { href: "/create", label: "Create Token" },
            { href: "/clone", label: "Clone Token" },
            { href: "/liquidity", label: "Add Liquidity" },
            { href: "/authority", label: "Revoke Authority" },
            { href: "/creator", label: "Creator Info" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                display: "block",
                fontSize: "13.5px",
                color: "#94a3b8",
                textDecoration: "none",
                marginBottom: "8px",
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Resources */}
        <div>
          <h4
            style={{
              fontSize: "11px",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "1px",
              color: "#64748b",
              fontFamily: "monospace",
              marginBottom: "14px",
            }}
          >
            Resources
          </h4>
          {[
            "Documentation",
            "Fee Structure",
            "Token Standards",
            "API Reference",
          ].map((item) => (
            <a
              key={item}
              href="#"
              style={{
                display: "block",
                fontSize: "13.5px",
                color: "#94a3b8",
                textDecoration: "none",
                marginBottom: "8px",
              }}
            >
              {item}
            </a>
          ))}
        </div>

        {/* Company */}
        <div>
          <h4
            style={{
              fontSize: "11px",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "1px",
              color: "#64748b",
              fontFamily: "monospace",
              marginBottom: "14px",
            }}
          >
            Company
          </h4>
          {[
            "About MintForge",
            "Security Audit",
            "Terms of Service",
            "Privacy Policy",
            "Contact",
          ].map((item) => (
            <a
              key={item}
              href="#"
              style={{
                display: "block",
                fontSize: "13.5px",
                color: "#94a3b8",
                textDecoration: "none",
                marginBottom: "8px",
              }}
            >
              {item}
            </a>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "32px auto 0",
          paddingTop: "20px",
          borderTop: "1px solid #1e2d42",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <div
          style={{
            fontSize: "12.5px",
            color: "#64748b",
            fontFamily: "monospace",
          }}
        >
          © 2025 MintForge · Built on Solana · All rights reserved
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          {["Audited", "Open Source", "No Rug"].map((badge) => (
            <div
              key={badge}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                background: "#141c26",
                border: "1px solid #1e2d42",
                borderRadius: "20px",
                padding: "4px 12px",
                fontSize: "12px",
                color: "#94a3b8",
              }}
            >
              <div
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "#22c55e",
                }}
              />
              {badge}
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
