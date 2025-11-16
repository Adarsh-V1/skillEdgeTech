'use client'
import Tooltip from "./Tooltip";
import { useThrottledScroll } from "../hooks/useThrottledScroll";

export default function ScrollIndicator() {
  const scroll = useThrottledScroll(90);
  return (
    <div className="fixed top-0 left-0 w-full z-[100]">
      <Tooltip text="Scroll progress">
        <div
          className="h-1 bg-blue-400 transition-[width] duration-150 will-change-transform"
          style={{ width: `${scroll * 100}%` }}
          role="progressbar"
          aria-valuenow={Math.round(scroll * 100)}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </Tooltip>
    </div>
  );
}
