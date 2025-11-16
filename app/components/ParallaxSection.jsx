'use client'
import Tooltip from "./Tooltip";

export default function ParallaxSection({ children, className = "", style = {}, ...props }) {
  return (
    <Tooltip text="Parallax section">
      <section className={className} style={style} {...props}>
        {children}
      </section>
    </Tooltip>
  );
}
