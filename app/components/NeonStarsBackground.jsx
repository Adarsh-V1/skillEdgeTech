'use client'
import { useEffect, useRef, useState } from "react";

export default function NeonStarsBackground() {
  const canvasRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleResize() { setIsMobile(window.innerWidth < 768); }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    let width = window.innerWidth;
    let height = window.innerHeight;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * DPR;
    canvas.height = height * DPR;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    const ctx = canvas.getContext("2d");
    ctx.scale(DPR, DPR);

    const ANGLE = -0.279; // -16deg
    const COS = Math.cos(ANGLE);
    const SIN = Math.sin(ANGLE);
    const COUNT = Math.max(8, Math.floor(width / 180)); // reduced
    const streaks = Array.from({ length: COUNT }).map(spawn);

    function spawn() {
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        len: 40 + Math.random() * 90,
        speed: 0.15 + Math.random() * 0.25,
        thick: 0.4 + Math.random() * 0.4,
        alpha: 0.1 + Math.random() * 0.15
      };
    }

    let running = true;
    function draw() {
      if (!running) return;
      if (document.hidden) {
        requestAnimationFrame(draw);
        return;
      }
      ctx.clearRect(0, 0, width, height);
      for (const s of streaks) {
        const dx = -COS * s.len;
        const dy = SIN * s.len;
        const grad = ctx.createLinearGradient(s.x, s.y, s.x + dx, s.y + dy);
        grad.addColorStop(0, "rgba(255,255,255,0)");
        grad.addColorStop(0.2, `rgba(214,222,235,${s.alpha * 0.5})`);
        grad.addColorStop(0.6, `rgba(180,194,217,${s.alpha})`);
        grad.addColorStop(1, "rgba(255,255,255,0)");
        ctx.lineWidth = s.thick;
        ctx.lineCap = "round";
        ctx.strokeStyle = grad;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x + dx, s.y + dy);
        ctx.stroke();
        s.x += -COS * s.speed;
        s.y += SIN * s.speed;
        if (s.y - s.len > height + 60 || s.x + s.len < -60) {
          Object.assign(s, spawn(), { x: width + Math.random() * 40, y: -40 - Math.random() * 120 });
        }
      }
      requestAnimationFrame(draw);
    }
    requestAnimationFrame(draw);

    function onResize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * DPR;
      canvas.height = height * DPR;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1,0,0,1,0,0);
      ctx.scale(DPR, DPR);
    }
    window.addEventListener("resize", onResize);
    return () => {
      running = false;
      window.removeEventListener("resize", onResize);
    };
  }, [isMobile]);

  if (isMobile) return null;
  return (
    <canvas
      ref={canvasRef}
      style={{ position: "fixed", inset: 0, zIndex: -9, pointerEvents: "none" }}
      aria-hidden="true"
    />
  );
}
