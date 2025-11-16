'use client'
import { useEffect, useRef, useState } from "react";

const SHAPES = [
  { id: "circle1", style: { left: "10%", top: "20%", width: 120, height: 120, opacity: 0.12 }, speed: 0.15, color: "#38bdf8" },
  { id: "circle2", style: { left: "70%", top: "30%", width: 80, height: 80, opacity: 0.11 }, speed: 0.28, color: "#2563eb" }
];

export default function ParallaxBackground() {
  const refs = useRef([]);
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    function resize() { setMobile(window.innerWidth < 768); }
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);
  useEffect(() => {
    if (mobile) return;
    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        refs.current.forEach((el, i) => {
          if (!el) return;
            el.style.transform = `translate3d(0,${y * SHAPES[i].speed}px,0)`;
        });
        ticking = false;
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [mobile]);
  if (mobile) return null;
  return (
    <div aria-hidden="true" style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
      {SHAPES.map((s, i) => (
        <svg
          key={s.id}
          ref={el => (refs.current[i] = el)}
          style={{ position: "absolute", ...s.style, willChange: "transform" }}
          width={s.style.width}
          height={s.style.height}
        >
          <circle
            cx={s.style.width / 2}
            cy={s.style.height / 2}
            r={s.style.width / 2}
            fill={s.color}
            opacity={s.style.opacity}
          />
        </svg>
      ))}
    </div>
  );
}
