'use client'
import { useEffect, useRef, useState } from "react";
import Tooltip from "./Tooltip";

export default function StatsCounter({ stats }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.3 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <section ref={ref} className="max-w-[1200px] mx-auto px-4 py-10 flex flex-wrap justify-center gap-8">
      {stats.map((stat, idx) => (
        <Tooltip key={idx} text={stat.label}>
          <div className="flex flex-col items-center will-change-transform">
            <span className="text-4xl font-extrabold text-gray-900" aria-live="polite">
              {visible ? <AnimatedNumber value={stat.value} /> : 0}{stat.suffix}
            </span>
            <span className="text-lg text-gray-500 mt-2">{stat.label}</span>
          </div>
        </Tooltip>
      ))}
    </section>
  );
}

function AnimatedNumber({ value }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let startTime = performance.now();
    const DURATION = 800;
    function step(now) {
      const p = Math.min((now - startTime) / DURATION, 1);
      setDisplay(Math.round(p * value));
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }, [value]);
  return display;
}
