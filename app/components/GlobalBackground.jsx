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
      <div className="absolute inset-0 bg-gradient-to-br from-[#e6e2dd] via-[#f3f2f1] to-[#d7d2cc]" />

      {/* soft center spotlight (subtle) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[85vw] h-[85vh] rounded-full bg-white/30 blur-[140px] opacity-40" />
      </div>

      {/* PARALLAX BLOBS (mouse-follow) - cool bluish/purple palette */}
      <div
        className="absolute -left-1/4 top-[-10%] w-[72vw] h-[72vh] rounded-full blur-[140px] opacity-80"
        style={{
          background:
            "radial-gradient(60% 60% at 30% 30%, rgba(96,165,250,0.22), rgba(99,102,241,0.10) 40%, rgba(99,102,241,0.04) 70%)",
          transform:
            "translate(var(--parallax-blob-1-x, 0px), var(--parallax-blob-1-y, 0px))",
          transition: "transform 250ms linear",
        }}
      />

      <div
        className="absolute right-[-15%] top-[30%] w-[58vw] h-[58vh] rounded-full blur-[160px] opacity-70"
        style={{
          background:
            "radial-gradient(60% 60% at 70% 20%, rgba(167,139,250,0.16), rgba(79,70,229,0.09) 40%, rgba(79,70,229,0.03) 80%)",
          transform:
            "translate(var(--parallax-blob-2-x, 0px), var(--parallax-blob-2-y, 0px))",
          transition: "transform 300ms linear",
        }}
      />

      <div
        className="absolute left-1/4 bottom-[-10%] w-[60vw] h-[60vh] rounded-full blur-[150px] opacity-70"
        style={{
          background:
            "radial-gradient(60% 60% at 40% 70%, rgba(56,189,248,0.14), rgba(124,58,237,0.08) 40%, rgba(124,58,237,0.02) 80%)",
          transform:
            "translate(var(--parallax-blob-3-x, 0px), var(--parallax-blob-3-y, 0px))",
          transition: "transform 280ms linear",
        }}
      />

      {/* LAYERED DIAGONAL TECH PATTERN (ultra faint) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.02,
          backgroundImage:
            "repeating-linear-gradient(135deg, rgba(30,41,59,0.03) 0px, rgba(30,41,59,0.03) 1px, transparent 1px, transparent 20px)",
          mixBlendMode: "overlay",
        }}
      />

      {/* MOVING SOFT BEAM / LIGHT RAY */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -left-[40%] top-[10%] w-[180%] h-[60%] opacity-20 blur-[90px] mix-blend-screen"
          style={{
            background:
              "linear-gradient(90deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.18) 50%, rgba(255,255,255,0.02) 100%)",
            animation: "soft-beam 22s linear infinite",
            transform: "rotate(-6deg)",
          }}
        />
      </div>

      {/* Animated gloss sweep (subtle) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-0 left-[-60%] w-[220%] h-full opacity-10"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 48%, rgba(255,255,255,0.05) 55%, transparent 100%)",
            mixBlendMode: "overlay",
            animation: "gloss 6s linear infinite",
            filter: "blur(12px)",
          }}
        />
      </div>

      {/* premium noise/grain and vignette */}
      <div
        className="absolute inset-0 opacity-[0.06] mix-blend-soft-light pointer-events-none"
        style={{
          backgroundImage:
            "url('https://grainy-gradients.vercel.app/noise.svg')",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 40% at 50% 45%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.04) 70%, rgba(0,0,0,0.08) 100%)",
        }}
      />

      {/* subtle micro dots (ultra soft) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.02,
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.7) 0.6px, transparent 0.6px)",
          backgroundSize: "6px 6px",
        }}
      />

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
