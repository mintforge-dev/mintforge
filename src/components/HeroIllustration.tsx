"use client";

export default function HeroIllustration() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "480px",
        margin: "0 auto",
      }}
    >
      <svg
        width="100%"
        viewBox="0 0 480 320"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="coinGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f97316" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="purpleGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="blueGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
          </radialGradient>
          <filter id="softBlur">
            <feGaussianBlur stdDeviation="2" />
          </filter>
        </defs>

        {/* Background glow blobs */}
        <ellipse cx="240" cy="160" rx="180" ry="100" fill="url(#blueGlow)" />
        <ellipse cx="120" cy="80" rx="80" ry="60" fill="url(#purpleGlow)" />
        <ellipse cx="360" cy="240" rx="80" ry="60" fill="url(#coinGlow)" />

        {/* ── BLOCKCHAIN NODES (background) ── */}
        {/* Connection lines */}
        <line
          x1="80"
          y1="60"
          x2="180"
          y2="120"
          stroke="#1e2d42"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
        <line
          x1="180"
          y1="120"
          x2="300"
          y2="80"
          stroke="#1e2d42"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
        <line
          x1="300"
          y1="80"
          x2="400"
          y2="140"
          stroke="#1e2d42"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
        <line
          x1="180"
          y1="120"
          x2="240"
          y2="220"
          stroke="#1e2d42"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
        <line
          x1="300"
          y1="80"
          x2="240"
          y2="220"
          stroke="#1e2d42"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
        <line
          x1="400"
          y1="140"
          x2="360"
          y2="250"
          stroke="#1e2d42"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
        <line
          x1="240"
          y1="220"
          x2="360"
          y2="250"
          stroke="#1e2d42"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
        <line
          x1="80"
          y1="60"
          x2="240"
          y2="220"
          stroke="#1a2540"
          strokeWidth="1"
          strokeDasharray="2 6"
        />

        {/* Small block nodes */}
        {[
          { x: 80, y: 60, color: "#6366f1", size: 10 },
          { x: 180, y: 120, color: "#8b5cf6", size: 8 },
          { x: 300, y: 80, color: "#6366f1", size: 9 },
          { x: 400, y: 140, color: "#a855f7", size: 8 },
          { x: 360, y: 250, color: "#6366f1", size: 8 },
          { x: 100, y: 200, color: "#4f46e5", size: 7 },
          { x: 420, y: 60, color: "#7c3aed", size: 7 },
        ].map((node, i) => (
          <g key={i}>
            <circle
              cx={node.x}
              cy={node.y}
              r={node.size + 4}
              fill={node.color}
              fillOpacity="0.1"
            />
            <circle
              cx={node.x}
              cy={node.y}
              r={node.size}
              fill={node.color}
              fillOpacity="0.25"
              stroke={node.color}
              strokeWidth="1"
              strokeOpacity="0.5"
            />
            <circle
              cx={node.x}
              cy={node.y}
              r={node.size - 3}
              fill={node.color}
              fillOpacity="0.5"
            />
          </g>
        ))}

        {/* ── MAIN COIN (center) ── */}
        {/* Outer glow ring */}
        <circle cx="240" cy="160" r="68" fill="url(#coinGlow)" />

        {/* Coin shadow/depth */}
        <ellipse
          cx="243"
          cy="225"
          rx="42"
          ry="8"
          fill="#000"
          fillOpacity="0.3"
        />

        {/* Coin body - 3D effect */}
        <ellipse
          cx="240"
          cy="220"
          rx="40"
          ry="8"
          fill="#7c2d0e"
          fillOpacity="0.6"
        />

        {/* Coin side */}
        <rect
          x="200"
          y="160"
          width="80"
          height="60"
          fill="#c2410c"
          fillOpacity="0.8"
        />
        <rect
          x="200"
          y="158"
          width="80"
          height="60"
          fill="#ea580c"
          fillOpacity="0.9"
        />

        {/* Coin face */}
        <circle cx="240" cy="158" r="40" fill="#f97316" />
        <circle
          cx="240"
          cy="158"
          r="40"
          fill="url(#coinGlow)"
          fillOpacity="0.3"
        />

        {/* Coin rim */}
        <circle
          cx="240"
          cy="158"
          r="40"
          fill="none"
          stroke="#fed7aa"
          strokeWidth="2"
          strokeOpacity="0.5"
        />
        <circle
          cx="240"
          cy="158"
          r="36"
          fill="none"
          stroke="#fb923c"
          strokeWidth="1"
          strokeOpacity="0.3"
        />

        {/* Coin symbol - S for Solana/SPL */}
        <text
          x="240"
          y="165"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="32"
          fontWeight="800"
          fill="#fff"
          fillOpacity="0.95"
          style={{ fontFamily: "var(--font-head, serif)" }}
        >
          S
        </text>

        {/* Shine highlight on coin */}
        <ellipse
          cx="228"
          cy="144"
          rx="12"
          ry="8"
          fill="#fff"
          fillOpacity="0.15"
          transform="rotate(-20 228 144)"
        />

        {/* ── FLOATING MINI TOKENS ── */}
        {/* Token 1 - top left */}
        <g style={{ animation: "float 4s ease-in-out infinite" }}>
          <circle
            cx="100"
            cy="130"
            r="22"
            fill="#141c26"
            stroke="#1e2d42"
            strokeWidth="1"
          />
          <circle cx="100" cy="130" r="18" fill="#0c0f1a" />
          <circle
            cx="100"
            cy="130"
            r="18"
            fill="none"
            stroke="#22c55e"
            strokeWidth="1.5"
            strokeOpacity="0.6"
          />
          <text
            x="100"
            y="134"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#22c55e"
          >
            SPL
          </text>
        </g>

        {/* Token 2 - top right */}
        <g style={{ animation: "float 5s ease-in-out infinite 0.8s" }}>
          <circle
            cx="370"
            cy="100"
            r="20"
            fill="#141c26"
            stroke="#1e2d42"
            strokeWidth="1"
          />
          <circle cx="370" cy="100" r="16" fill="#0c0f1a" />
          <circle
            cx="370"
            cy="100"
            r="16"
            fill="none"
            stroke="#6366f1"
            strokeWidth="1.5"
            strokeOpacity="0.6"
          />
          <text
            x="370"
            y="104"
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill="#818cf8"
          >
            MFG
          </text>
        </g>

        {/* Token 3 - bottom */}
        <g style={{ animation: "float 6s ease-in-out infinite 1.5s" }}>
          <circle
            cx="160"
            cy="265"
            r="18"
            fill="#141c26"
            stroke="#1e2d42"
            strokeWidth="1"
          />
          <circle cx="160" cy="265" r="14" fill="#0c0f1a" />
          <circle
            cx="160"
            cy="265"
            r="14"
            fill="none"
            stroke="#a855f7"
            strokeWidth="1.5"
            strokeOpacity="0.6"
          />
          <text
            x="160"
            y="269"
            textAnchor="middle"
            fontSize="10"
            fontWeight="700"
            fill="#a855f7"
          >
            TKN
          </text>
        </g>

        {/* ── ACTIVITY BADGES ── */}
        {/* Mint badge */}
        <g style={{ animation: "fadeUp 0.5s ease 0.3s both" }}>
          <rect
            x="30"
            y="155"
            width="54"
            height="22"
            rx="11"
            fill="#141c26"
            stroke="#22c55e"
            strokeWidth="1"
            strokeOpacity="0.5"
          />
          <circle cx="43" cy="166" r="4" fill="#22c55e" />
          <text
            x="55"
            y="170"
            textAnchor="middle"
            fontSize="9"
            fill="#22c55e"
            fontWeight="600"
          >
            MINT
          </text>
        </g>

        {/* Revoke badge */}
        <g style={{ animation: "fadeUp 0.5s ease 0.5s both" }}>
          <rect
            x="390"
            y="175"
            width="68"
            height="22"
            rx="11"
            fill="#141c26"
            stroke="#f97316"
            strokeWidth="1"
            strokeOpacity="0.5"
          />
          <circle cx="403" cy="186" r="4" fill="#f97316" />
          <text
            x="426"
            y="190"
            textAnchor="middle"
            fontSize="9"
            fill="#f97316"
            fontWeight="600"
          >
            REVOKE
          </text>
        </g>

        {/* Clone badge */}
        <g style={{ animation: "fadeUp 0.5s ease 0.7s both" }}>
          <rect
            x="60"
            y="280"
            width="60"
            height="22"
            rx="11"
            fill="#141c26"
            stroke="#a855f7"
            strokeWidth="1"
            strokeOpacity="0.5"
          />
          <circle cx="73" cy="291" r="4" fill="#a855f7" />
          <text
            x="92"
            y="295"
            textAnchor="middle"
            fontSize="9"
            fill="#a855f7"
            fontWeight="600"
          >
            CLONE
          </text>
        </g>

        {/* LP badge */}
        <g style={{ animation: "fadeUp 0.5s ease 0.9s both" }}>
          <rect
            x="330"
            y="265"
            width="50"
            height="22"
            rx="11"
            fill="#141c26"
            stroke="#6366f1"
            strokeWidth="1"
            strokeOpacity="0.5"
          />
          <circle cx="343" cy="276" r="4" fill="#6366f1" />
          <text
            x="362"
            y="280"
            textAnchor="middle"
            fontSize="9"
            fill="#818cf8"
            fontWeight="600"
          >
            LP
          </text>
        </g>

        {/* ── PARTICLE DOTS ── */}
        {[
          { x: 50, y: 240, r: 2, color: "#f97316", delay: "0s" },
          { x: 440, y: 200, r: 2, color: "#6366f1", delay: "0.5s" },
          { x: 200, y: 30, r: 2.5, color: "#a855f7", delay: "1s" },
          { x: 430, y: 290, r: 1.5, color: "#22c55e", delay: "1.5s" },
          { x: 30, y: 100, r: 1.5, color: "#6366f1", delay: "2s" },
          { x: 460, y: 120, r: 2, color: "#f97316", delay: "0.8s" },
        ].map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={p.r}
            fill={p.color}
            fillOpacity="0.6"
            style={{ animation: `pulse 2s ease-in-out infinite ${p.delay}` }}
          />
        ))}
      </svg>
    </div>
  );
}
