"use client";

export default function TokenFlowIllustration() {
  return (
    <svg
      width="100%"
      viewBox="0 0 680 180"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block" }}
    >
      <defs>
        <marker
          id="arr2"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto-start-reverse"
        >
          <path
            d="M2 1L8 5L2 9"
            fill="none"
            stroke="context-stroke"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </marker>
      </defs>

      {/* Step boxes */}
      {[
        {
          x: 20,
          label: "Connect\nWallet",
          icon: "👛",
          color: "#6366f1",
          border: "rgba(99,102,241,0.4)",
        },
        {
          x: 180,
          label: "Create\nToken",
          icon: "⚡",
          color: "#f97316",
          border: "rgba(249,115,22,0.4)",
        },
        {
          x: 340,
          label: "Add\nLiquidity",
          icon: "💧",
          color: "#22c55e",
          border: "rgba(34,197,94,0.4)",
        },
        {
          x: 500,
          label: "Start\nTrading",
          icon: "📈",
          color: "#a855f7",
          border: "rgba(168,85,247,0.4)",
        },
      ].map((step, i) => (
        <g key={i}>
          {/* Glow */}
          <circle
            cx={step.x + 60}
            cy="70"
            r="44"
            fill={step.color}
            fillOpacity="0.06"
          />
          {/* Box */}
          <rect
            x={step.x}
            y="30"
            width="120"
            height="80"
            rx="14"
            fill="#111826"
            stroke={step.border}
            strokeWidth="1"
          />
          {/* Top accent line */}
          <rect
            x={step.x + 20}
            y="30"
            width="80"
            height="2"
            rx="1"
            fill={step.color}
            fillOpacity="0.6"
          />
          {/* Icon circle */}
          <circle
            cx={step.x + 60}
            cy="65"
            r="20"
            fill={step.color}
            fillOpacity="0.12"
            stroke={step.color}
            strokeWidth="1"
            strokeOpacity="0.3"
          />
          <text
            x={step.x + 60}
            y="70"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="16"
          >
            {step.icon}
          </text>
          {/* Label */}
          <text
            x={step.x + 60}
            y="96"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill={step.color}
            style={{ fontFamily: "var(--font-body)" }}
          >
            {step.label.split("\n")[0]}
          </text>
          <text
            x={step.x + 60}
            y="108"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill={step.color}
            style={{ fontFamily: "var(--font-body)" }}
          >
            {step.label.split("\n")[1]}
          </text>
          {/* Step number */}
          <circle
            cx={step.x + 16}
            cy="46"
            r="10"
            fill={step.color}
            fillOpacity="0.15"
          />
          <text
            x={step.x + 16}
            y="50"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="10"
            fontWeight="700"
            fill={step.color}
          >
            {i + 1}
          </text>
        </g>
      ))}

      {/* Connecting arrows */}
      {[140, 300, 460].map((x, i) => {
        const colors = ["#6366f1", "#f97316", "#22c55e"];
        return (
          <g key={i}>
            <line
              x1={x + 2}
              y1="70"
              x2={x + 35}
              y2="70"
              stroke={colors[i]}
              strokeWidth="1.5"
              strokeOpacity="0.5"
              markerEnd="url(#arr2)"
              strokeDasharray="4 3"
            />
          </g>
        );
      })}

      {/* Bottom label */}
      <text
        x="340"
        y="160"
        textAnchor="middle"
        fontSize="11"
        fill="#64748b"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        Launch your Solana token in minutes · No coding required
      </text>
    </svg>
  );
}
