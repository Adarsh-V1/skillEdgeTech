'use client'
import { useRef, useEffect } from "react";
import Tooltip from "./Tooltip";

const sections = [];
let ticking = false;

function updateAll() {
  const scrollY = window.scrollY || window.pageYOffset;
  const windowHeight = window.innerHeight;
  for (const { ref, speed, lastOffset, cached } of sections) {
    if (!ref.current || !cached.top) continue;
    const isMobile = window.innerWidth < 768;
    const effectiveSpeed = isMobile ? 0 : speed;
    // Use cached values for section position and height
    const sectionTop = cached.top;
    const sectionHeight = cached.height;
    const sectionCenter = sectionTop + sectionHeight / 2;
    const distance = (scrollY + windowHeight / 2) - sectionCenter;
    const offset = Math.round(distance * effectiveSpeed * 100) / 100;
    if (lastOffset.current !== offset) {
      ref.current.style.transform = `translateY(${offset}px)`;
      lastOffset.current = offset;
    }
  }
  window.requestAnimationFrame(updateAll);
}

function recacheAll() {
  for (const { ref, cached } of sections) {
    if (!ref.current) continue;
    const rect = ref.current.getBoundingClientRect();
    cached.top = rect.top + window.scrollY;
    cached.height = rect.height;
  }
}

if (typeof window !== "undefined" && !window.__parallaxRAF) {
  window.__parallaxRAF = true;
  window.requestAnimationFrame(updateAll);
  window.addEventListener("resize", () => {
    recacheAll();
  });
  window.addEventListener("orientationchange", () => {
    recacheAll();
  });
}

export default function ParallaxSection({ children, className = "", style = {}, ...props }) {
  return (
    <Tooltip text="Parallax effect section">
      <section
        className={className}
        style={style}
        {...props}
      >
        {children}
      </section>
    </Tooltip>
  );
}
