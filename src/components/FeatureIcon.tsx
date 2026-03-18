"use client";

import React from "react";

interface Props {
  type: "create" | "clone" | "liquidity" | "remove" | "authority" | "creator";
  size?: number;
}

const ICONS: Record<string, React.ReactNode> = {
  create: (
    <svg viewBox="0 0 40 40" fill="none">
      <circle
        cx="20"
        cy="20"
        r="18"
        fill="rgba(249,115,22,0.15)"
        stroke="rgba(249,115,22,0.4)"
        strokeWidth="1"
      />
      <circle
        cx="20"
        cy="20"
        r="12"
        fill="rgba(249,115,22,0.2)"
        stroke="rgba(249,115,22,0.5)"
        strokeWidth="1"
      />
      <path
        d="M20 13v14M13 20h14"
        stroke="#f97316"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  ),
  clone: (
    <svg viewBox="0 0 40 40" fill="none">
      <rect
        x="6"
        y="10"
        width="18"
        height="22"
        rx="4"
        fill="rgba(239,68,68,0.15)"
        stroke="rgba(239,68,68,0.4)"
        strokeWidth="1"
      />
      <rect
        x="16"
        y="8"
        width="18"
        height="22"
        rx="4"
        fill="rgba(239,68,68,0.1)"
        stroke="rgba(239,68,68,0.3)"
        strokeWidth="1"
        strokeDasharray="3 2"
      />
      <path
        d="M20 19h8M20 23h6"
        stroke="#ef4444"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),
  liquidity: (
    <svg viewBox="0 0 40 40" fill="none">
      <path
        d="M20 8c0 0-10 8-10 16a10 10 0 0 0 20 0C30 16 20 8 20 8z"
        fill="rgba(99,102,241,0.15)"
        stroke="rgba(99,102,241,0.4)"
        strokeWidth="1"
      />
      <path
        d="M14 26a6 6 0 0 0 8 2"
        stroke="#6366f1"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="20" cy="22" r="3" fill="rgba(99,102,241,0.4)" />
    </svg>
  ),
  remove: (
    <svg viewBox="0 0 40 40" fill="none">
      <circle
        cx="20"
        cy="20"
        r="14"
        fill="rgba(34,197,94,0.15)"
        stroke="rgba(34,197,94,0.4)"
        strokeWidth="1"
      />
      <path
        d="M13 20h14M20 13l7 7-7 7"
        stroke="#22c55e"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  authority: (
    <svg viewBox="0 0 40 40" fill="none">
      <path
        d="M20 6l12 5v8c0 7-5 13-12 15C13 32 8 26 8 19v-8z"
        fill="rgba(234,179,8,0.15)"
        stroke="rgba(234,179,8,0.4)"
        strokeWidth="1"
      />
      <path
        d="M15 20l4 4 7-7"
        stroke="#eab308"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  creator: (
    <svg viewBox="0 0 40 40" fill="none">
      <circle
        cx="20"
        cy="15"
        r="7"
        fill="rgba(168,85,247,0.15)"
        stroke="rgba(168,85,247,0.4)"
        strokeWidth="1"
      />
      <path
        d="M8 34c0-7 5-12 12-12s12 5 12 12"
        stroke="rgba(168,85,247,0.4)"
        strokeWidth="1"
        fill="none"
      />
      <path
        d="M26 22l2 2-6 6h-2v-2z"
        fill="rgba(168,85,247,0.5)"
        stroke="#a855f7"
        strokeWidth="1"
      />
    </svg>
  ),
};

export default function FeatureIcon({ type, size = 44 }: Props) {
  return <div style={{ width: size, height: size }}>{ICONS[type]}</div>;
}
