'use client'
import { useEffect, useRef, useState } from "react";

export default function Mascot() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const pending = useRef(false);
  useEffect(() => {
    function onMove(e) {
      if (pending.current) return;
      pending.current = true;
      requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - 0.5) * 32;
        const y = (e.clientY / window.innerHeight - 0.5) * 32;
        setPos({ x, y });
        pending.current = false;
      });
    }
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 1001,
        width: 64,
        height: 64,
        pointerEvents: "none",
        transform: `translate3d(${pos.x}px,${pos.y}px,0)`
      }}
      aria-hidden="true"
      className="mascot-float"
    >
      {/* Simple SVG mascot: a smiling ocean drop */}
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
        <ellipse cx="32" cy="32" rx="30" ry="30" fill="#5edfff" />
        <ellipse cx="32" cy="36" rx="20" ry="16" fill="#00e5b0" opacity="0.7" />
        <ellipse cx="32" cy="32" rx="26" ry="26" fill="#fff" opacity="0.13" />
        <ellipse cx="32" cy="32" rx="20" ry="20" fill="#fff" opacity="0.09" />
        <ellipse cx="22" cy="30" rx="3" ry="4" fill="#2563eb" />
        <ellipse cx="42" cy="30" rx="3" ry="4" fill="#2563eb" />
        <path d="M26 44 Q34 50 42 44" stroke="#2563eb" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      </svg>
    </div>
  );
}
