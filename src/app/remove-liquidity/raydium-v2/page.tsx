'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function RemoveRaydiumV2Page() {
  const [pct, setPct] = useState(100);

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '48px 24px' }}>

      <div style={{ marginBottom: '24px' }}>
        <Link href="/remove-liquidity" style={{ color: 'var(--text3)', textDecoration: 'none', fontSize: '13px', fontFamily: 'var(--font-mono)' }}>
          ← Back
        </Link>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <div style={{ width: '44px', height: '44px', background: 'linear-gradient(135deg,rgba(249,115,22,0.2),rgba(249,115,22,0.05))', border: '1px solid rgba(249,115,22,0.3)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>🔥</div>
        <div>
          <h1 style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '22px', color: 'var(--text)', lineHeight: 1 }}>Remove — Raydium V2</h1>
          <div style={{ fontSize: '12px', color: 'var(--text3)', fontFamily: 'var(--font-mono)' }}>AMM LP Token · Burn to Reclaim</div>
        </div>
      </div>

      {/* Info */}
      <div style={{ background: 'rgba(249,115,22,0.06)', border: '1px solid rgba(249,115,22,0.2)', borderRadius: '12px', padding: '14px 18px', marginBottom: '20px', display: 'flex', gap: '10px', fontSize: '13px', color: 'var(--text2)' }}>
        <span>ℹ️</span>
        <span>V2 LP tokens are SPL tokens. You receive both token types proportionally based on current pool price. This is done directly on Raydium.</span>
      </div>

      {/* Warning */}
      <div style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)', borderRadius: '12px', padding: '14px 18px', marginBottom: '24px', display: 'flex', gap: '10px', fontSize: '13px', color: 'var(--text2)' }}>
        <span style={{ color: 'var(--red)' }}>⚠️</span>
        <div>
          <strong style={{ color: 'var(--red)' }}>Caution:</strong> Removing large amounts of liquidity from a small pool can cause significant price impact.
        </div>
      </div>

      {/* Steps */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', padding: '20px', marginBottom: '24px' }}>
        <div style={{ fontWeight: 700, color: 'var(--text)', fontSize: '14px', marginBottom: '14px' }}>📋 How to Remove on Raydium</div>
        {[
          { n: '1', title: 'Go to Raydium Portfolio', desc: 'Open your Raydium liquidity positions page' },
          { n: '2', title: 'Find Your Pool', desc: 'Locate the V2 pool you want to remove from' },
          { n: '3', title: 'Set Percentage', desc: 'Choose how much liquidity to withdraw (1–100%)' },
          { n: '4', title: 'Confirm Transaction', desc: 'Approve in wallet — tokens returned instantly' },
        ].map(s => (
          <div key={s.n} style={{ display: 'flex', gap: '12px', padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
            <div style={{ width: '24px', height: '24px', background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, color: 'var(--red)', fontFamily: 'var(--font-mono)', flexShrink: 0, marginTop: '2px' }}>{s.n}</div>
            <div>
              <div style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--text)', marginBottom: '2px' }}>{s.title}</div>
              <div style={{ fontSize: '12px', color: 'var(--text3)' }}>{s.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Redirect */}
        <a
        href="https://raydium.io/portfolio/"
        target="_blank"
        rel="noreferrer"
        style={{ textDecoration: 'none', display: 'block', marginBottom: '12px' }}
      >
        <button style={{ width: '100%', background: 'linear-gradient(135deg,#ef4444,#b91c1c)', color: '#fff', border: 'none', borderRadius: '13px', padding: '15px', fontSize: '15px', fontWeight: 700, fontFamily: 'var(--font-body)', cursor: 'pointer', boxShadow: '0 4px 20px rgba(239,68,68,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          🔓 Manage on Raydium Portfolio ↗
        </button>
      </a>

      <a
        href="https://raydium.io/liquidity/"
        target="_blank"
        rel="noreferrer"
        style={{ textDecoration: 'none', display: 'block' }}
      >
        <button style={{ width: '100%', background: 'var(--surface)', color: 'var(--text)', border: '1px solid var(--border2)', borderRadius: '13px', padding: '13px', fontSize: '14px', fontWeight: 600, fontFamily: 'var(--font-body)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          View All My Pools ↗
        </button>
      </a>

      <p style={{ textAlign: 'center', fontSize: '12px', color: 'var(--text3)', fontFamily: 'var(--font-mono)', marginTop: '10px' }}>
        Opens Raydium in new tab · SDK integration coming soon
      </p>
    </div>
  );
}