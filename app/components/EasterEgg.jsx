'use client'
import { useEffect, useState } from "react";

export default function EasterEgg() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    let seq = [];
    function onKey(e) {
      seq.push(e.key.toLowerCase());
      if (seq.join("").includes("ocean")) {
        setShow(true);
        setTimeout(() => setShow(false), 2500);
        seq = [];
      }
      if (seq.length > 10) seq.shift();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  if (!show) return null;
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 2000,
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
      aria-hidden="true"
    >
      <Confetti />
    </div>
  );
}

function Confetti() {
  // Simple SVG confetti burst
  return (
    <svg width="320" height="180" viewBox="0 0 320 180">
      <g>
        <circle cx="60" cy="90" r="12" fill="#5edfff" />
        <circle cx="160" cy="60" r="10" fill="#00e5b0" />
        <circle cx="260" cy="120" r="14" fill="#2563eb" />
        <circle cx="100" cy="140" r="8" fill="#aee7f7" />
        <circle cx="220" cy="80" r="7" fill="#0099cc" />
        <circle cx="180" cy="120" r="9" fill="#fff" />
      </g>
      <text x="50%" y="50%" textAnchor="middle" fill="#2563eb" fontSize="32" fontWeight="bold" dy=".3em">
        🌊 Oceanic!
      </text>
    </svg>
  );
}
