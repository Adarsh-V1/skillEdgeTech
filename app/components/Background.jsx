'use client'
import React from "react";

export default function Background() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none" aria-hidden="true">
      {/* Base Mist Blue Gray gradient: #F0F3F8 → #E3E8EF → #CED4DF */}
      <div className="absolute inset-0 bg-linear-to-r from-[#d4deff] via-[#eafffe] to-[#bcd7ffb4] blur-2xl" />

      {/* Steel blue-gray accent blobs for depth: #6E7F97, #4A637D */}
      <div
        className="absolute top-[12%] -left-[8%] w-[42vw] h-[42vw] rounded-full blur-[110px] opacity-[0.22]"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(110,127,151,0.35) 0%, rgba(110,127,151,0.18) 40%, rgba(110,127,151,0) 70%)",
        }}
      />
      <div
        className="absolute bottom-[18%] left-[20%] w-[36vw] h-[36vw] rounded-full blur-[120px] opacity-[0.20]"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(74,99,125,0.30) 0%, rgba(74,99,125,0.16) 45%, rgba(74,99,125,0) 75%)",
        }}
      />

      {/* Aurora light effects (soft, bluish, floating): #B4C2D9, #D6DEEB */}
      <div
        className="absolute -top-32 -left-20 w-[60vw] h-[60vw] rounded-full blur-3xl opacity-50"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(212,222,235,0.36) 0%, rgba(180,194,217,0.28) 42%, rgba(255,255,255,0) 72%)",
          animation: "auroraFloat1 28s ease-in-out infinite",
        }}
      />
      <div
        className="absolute -bottom-40 -right-24 w-[68vw] h-[68vw] rounded-full blur-3xl opacity-45"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(180,194,217,0.30) 0%, rgba(214,222,235,0.26) 48%, rgba(255,255,255,0) 78%)",
          animation: "auroraFloat2 32s ease-in-out infinite",
        }}
      />

      {/* Glossy reflection layers (polished glass surface) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0.40), rgba(255,255,255,0.25) 35%, rgba(255,255,255,0) 70%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top right, rgba(255,255,255,0.25), rgba(255,255,255,0.08) 45%, rgba(255,255,255,0) 75%)",
        }}
      />

      {/* Very subtle grain/noise overlay via inline SVG (premium realism) */}
      <svg className="absolute inset-0 w-full h-full" aria-hidden="true">
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          <feComponentTransfer>
            <feFuncA type="table" tableValues="0 0.16" />
          </feComponentTransfer>
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" opacity="0.06" />
      </svg>

      {/* Local animations */}
      <style jsx>{`
        @keyframes auroraFloat1 {
          0% { transform: translate3d(0, 0, 0) rotate(0deg) scale(1); }
          50% { transform: translate3d(18px, -16px, 0) rotate(6deg) scale(1.03); }
          100% { transform: translate3d(0, 0, 0) rotate(0deg) scale(1); }
        }
        @keyframes auroraFloat2 {
          0% { transform: translate3d(0, 0, 0) rotate(0deg) scale(1); }
          50% { transform: translate3d(-22px, 14px, 0) rotate(-5deg) scale(1.02); }
          100% { transform: translate3d(0, 0, 0) rotate(0deg) scale(1); }
        }
      `}</style>
    </div>
  );
}
