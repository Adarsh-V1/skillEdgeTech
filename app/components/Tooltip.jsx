'use client'
import { useState, useRef } from "react";

export default function Tooltip({ children, text, placement = "top" }) {
  const [show, setShow] = useState(false);
  const ref = useRef();

  return (
    <span
      className="relative inline-block focus:outline-none"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onFocus={() => setShow(true)}
      onBlur={() => setShow(false)}
      ref={ref}
      tabIndex={0}
      aria-describedby={show ? "tooltip" : undefined}
    >
      {children}
      {show && (
        <span
          id="tooltip"
          className={`
            pointer-events-none absolute z-50 px-4 py-2 rounded-xl
            bg-gradient-to-br from-blue-700 via-blue-900 to-blue-600
            text-white text-xs font-semibold shadow-2xl
            border border-blue-400/40
            animate-fadein
            transition-all duration-200
            ${placement === "top" ? "bottom-full left-1/2 -translate-x-1/2 mb-3" : ""}
            ${placement === "bottom" ? "top-full left-1/2 -translate-x-1/2 mt-3" : ""}
            ${placement === "left" ? "right-full top-1/2 -translate-y-1/2 mr-3" : ""}
            ${placement === "right" ? "left-full top-1/2 -translate-y-1/2 ml-3" : ""}
            tooltip-glow
          `}
          style={{
            whiteSpace: "nowrap",
            letterSpacing: ".01em",
            filter: "drop-shadow(0 2px 12px #2563eb88)",
            opacity: 0.97,
            backdropFilter: "blur(6px)",
          }}
          role="tooltip"
        >
          <span className="inline-block align-middle">{text}</span>
          <span
            className={`
              absolute w-3 h-3 bg-blue-700 rotate-45
              ${placement === "top" ? "left-1/2 -translate-x-1/2 top-full" : ""}
              ${placement === "bottom" ? "left-1/2 -translate-x-1/2 bottom-full" : ""}
              ${placement === "left" ? "top-1/2 -translate-y-1/2 right-[-6px]" : ""}
              ${placement === "right" ? "top-1/2 -translate-y-1/2 left-[-6px]" : ""}
              tooltip-arrow
            `}
            style={{
              boxShadow: "0 2px 8px #2563eb44",
              zIndex: 51,
              background: "inherit",
              border: "1px solid #3b82f6",
              opacity: 0.85,
            }}
            aria-hidden="true"
          />
        </span>
      )}
      <style jsx>{`
        .animate-fadein {
          animation: fadeinTooltip 0.18s cubic-bezier(.4,0,.2,1);
        }
        @keyframes fadeinTooltip {
          from { opacity: 0; transform: translateY(8px) scale(0.98);}
          to { opacity: 1; transform: translateY(0) scale(1);}
        }
        .tooltip-glow {
          box-shadow: 0 0 16px 2px #2563eb55, 0 2px 12px #38bdf855;
        }
        .tooltip-arrow {
          content: "";
          display: block;
        }
      `}</style>
    </span>
  );
}
