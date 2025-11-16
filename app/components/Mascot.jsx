'use client'
import { useEffect, useRef, useState } from "react";

export default function Mascot() {
  const ref = useRef();
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    function onMove(e) {
      const x = (e.clientX / window.innerWidth - 0.5) * 40;
      const y = (e.clientY / window.innerHeight - 0.5) * 40;
      setPos({ x, y });
    }
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 1001,
        width: "68px",
        height: "68px",
        pointerEvents: "none",
        transform: `translate(${pos.x}px, ${pos.y}px)`
      }}
      aria-hidden="true"
      className="mascot-float"
    >
      {/* Simple SVG mascot: a smiling ocean drop */}
      <svg width="68" height="68" viewBox="0 0 68 68" fill="none">
        <ellipse cx="34" cy="34" rx="32" ry="32" fill="#5edfff" />
        <ellipse cx="34" cy="38" rx="22" ry="18" fill="#00e5b0" opacity="0.7" />
        <ellipse cx="34" cy="34" rx="28" ry="28" fill="#fff" opacity="0.13" />
        <ellipse cx="34" cy="34" rx="20" ry="20" fill="#fff" opacity="0.09" />
        <ellipse cx="24" cy="32" rx="3" ry="4" fill="#2563eb" />
        <ellipse cx="44" cy="32" rx="3" ry="4" fill="#2563eb" />
        <path d="M26 44 Q34 50 42 44" stroke="#2563eb" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      </svg>
    </div>
  );
}
