'use client'
import { useEffect, useState } from "react";
import Tooltip from "./Tooltip";

export default function ScrollIndicator() {
  const [scroll, setScroll] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const height = document.body.scrollHeight - window.innerHeight;
      setScroll(height ? scrolled / height : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 w-full z-[100]">
      <Tooltip text="Scroll progress">
        <div
          className="h-1 bg-blue-400 transition-all"
          style={{ width: `${scroll * 100}%`, willChange: "width", transform: "translateZ(0)" }}
          aria-hidden="true"
          role="progressbar"
          aria-valuenow={Math.round(scroll * 100)}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </Tooltip>
    </div>
  );
}
