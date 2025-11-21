'use client'
import { useEffect, useRef } from "react";

export default function Reveal({ children, effect = "fx-fade-up", delay = 0, once = true, as = "div", className = "" }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("in");
          if (once) io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once]);
  const Comp = as;
  return (
    <Comp ref={ref} className={`reveal ${effect} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </Comp>
  );
}
