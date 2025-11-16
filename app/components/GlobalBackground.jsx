'use client'
import { useEffect, useRef, useState } from "react";

export default function GlobalBackground() {
  const containerRef = useRef(null);
  const rafRef = useRef(null);
  const lastMouse = useRef({ x: 0, y: 0 });
  const [ripples, setRipples] = useState([]);

  // Create a ripple (soft pulse) on click
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    function handleClick(e) {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const id = crypto ? crypto.randomUUID() : Date.now().toString();
      setRipples((r) => [...r, { id, x, y }]);
      // remove after animation (900ms)
      setTimeout(() => {
        setRipples((r) => r.filter((p) => p.id !== id));
      }, 1000);
    }

    el.addEventListener("click", handleClick);
    return () => el.removeEventListener("click", handleClick);
  }, []);

  // Mouse-follow parallax: update CSS vars for blobs using rAF for smoothness
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let width = el.clientWidth;
    let height = el.clientHeight;

    function onResize() {
      width = el.clientWidth;
      height = el.clientHeight;
    }
    window.addEventListener("resize", onResize);

    function onMouseMove(e) {
      lastMouse.current = { x: e.clientX, y: e.clientY };
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        const { x, y } = lastMouse.current;
        // normalized -0.5 .. 0.5
        const nx = (x / width) - 0.5;
        const ny = (y / height) - 0.5;
        // subtle multipliers for each blob (further = bigger shift)
        el.style.setProperty("--parallax-blob-1-x", `${nx * 12}px`);
        el.style.setProperty("--parallax-blob-1-y", `${ny * 10}px`);
        el.style.setProperty("--parallax-blob-2-x", `${nx * -18}px`);
        el.style.setProperty("--parallax-blob-2-y", `${ny * 14}px`);
        el.style.setProperty("--parallax-blob-3-x", `${nx * 22}px`);
        el.style.setProperty("--parallax-blob-3-y", `${ny * -12}px`);
        rafRef.current = null;
      });
    }

    el.addEventListener("mousemove", onMouseMove);
    return () => {
      el.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-50 pointer-events-none overflow-hidden"
      aria-hidden="true"
      style={{
        // default vars (will be overwritten by mouse moves)
        ["--parallax-blob-1-x"]: "0px",
        ["--parallax-blob-1-y"]: "0px",
        ["--parallax-blob-2-x"]: "0px",
        ["--parallax-blob-2-y"]: "0px",
        ["--parallax-blob-3-x"]: "0px",
        ["--parallax-blob-3-y"]: "0px",
      }}
    >
      {/* Base: Neutral warm-beige gradient slightly darker as requested */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-200 via-gray-100 to-slate-300" />

      {/* simplified glow blobs */}
      <div className="absolute -top-32 -left-24 w-[50vw] h-[50vh] rounded-full bg-sky-200/18 blur-[70px]" />
      <div className="absolute bottom-0 right-0 w-[40vw] h-[40vh] rounded-full bg-indigo-200/16 blur-[80px]" />

      {/* lighter grain */}
      <div className="absolute inset-0 opacity-[0.035] bg-[radial-gradient(rgba(0,0,0,0.04)_1px,transparent_1.4px)] [background-size:3px_3px]" />

      {/* RIPPLE EFFECTS (on click) */}
      {ripples.map((r) => (
        <span
          key={r.id}
          aria-hidden="true"
          className="absolute rounded-full pointer-events-none"
          style={{
            left: r.x - 10,
            top: r.y - 10,
            width: 20,
            height: 20,
            transform: "translate(-50%, -50%)",
            background:
              "radial-gradient(circle, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.12) 30%, rgba(255,255,255,0.02) 60%, transparent 100%)",
            filter: "blur(10px)",
            opacity: 0.9,
            animation: "ripple 900ms ease-out forwards",
            mixBlendMode: "screen",
          }}
        />
      ))}

      {/* custom keyframes */}
      <style>{`
        @keyframes gloss {
          0% { transform: translateX(-60%); opacity: 0; }
          10% { opacity: 0.08; }
          50% { transform: translateX(0%); opacity: 0.12; }
          90% { opacity: 0.04; }
          100% { transform: translateX(60%); opacity: 0; }
        }
        @keyframes soft-beam {
          0% { transform: translateX(-30%) rotate(-6deg); opacity: 0.12; }
          50% { transform: translateX(0%) rotate(-6deg); opacity: 0.20; }
          100% { transform: translateX(30%) rotate(-6deg); opacity: 0.12; }
        }
        @keyframes ripple {
          0% {
            transform: translate(-50%, -50%) scale(0.6);
            opacity: 0.9;
            filter: blur(8px);
          }
          60% {
            opacity: 0.35;
            filter: blur(14px);
          }
          100% {
            transform: translate(-50%, -50%) scale(6.5);
            opacity: 0;
            filter: blur(22px);
          }
        }
      `}</style>
    </div>
  );
}
