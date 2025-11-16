'use client'
import { useEffect, useRef, useState } from "react";

const SHAPES = [
  {
    id: "circle1",
    style: { left: "10%", top: "20%", width: 120, height: 120, opacity: 0.13 },
    speed: 0.2,
    color: "#38bdf8"
  },
  {
    id: "circle2",
    style: { left: "70%", top: "30%", width: 80, height: 80, opacity: 0.12 },
    speed: 0.35,
    color: "#2563eb"
  }
];

export default function ParallaxBackground() {
  const refs = useRef([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    function onScroll() {
      const scrollY = window.scrollY;
      refs.current.forEach((el, i) => {
        if (!el) return;
        const speed = SHAPES[i].speed;
        el.style.transform = `translateY(${scrollY * speed}px)`;
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMobile]);

  if (isMobile) return null;

  // Add SVG shapes to DOM
  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none"
      }}
    >
      {SHAPES.map((shape, i) => (
        <svg
          key={shape.id}
          ref={el => (refs.current[i] = el)}
          style={{
            position: "absolute",
            ...shape.style,
            zIndex: 0
          }}
          width={shape.style.width}
          height={shape.style.height}
        >
          <circle
            cx={shape.style.width / 2}
            cy={shape.style.height / 2}
            r={shape.style.width / 2}
            fill={shape.color}
            opacity={shape.style.opacity}
          />
        </svg>
      ))}
    </div>
  );
}
