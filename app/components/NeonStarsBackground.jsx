'use client'
import { useEffect, useRef, useState } from "react";

export default function NeonStarsBackground() {
  const canvasRef = useRef(null);
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

    let animationId;
    const ANGLE = (-16 * Math.PI) / 180; // elegant slight diagonal
    const COS = Math.cos(ANGLE);
    const SIN = Math.sin(ANGLE);

    // Minimal density, scale with width
    const STREAK_COUNT = Math.max(10, Math.floor(width / 120));
    const streaks = Array.from({ length: STREAK_COUNT }).map(() => spawnStreak(width, height));

    function spawnStreak(w, h) {
      const len = 60 + Math.random() * 120; // long thin streaks
      const speed = 0.2 + Math.random() * 0.35; // slow-moving
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        len,
        speed,
        thickness: 0.4 + Math.random() * 0.5,
        alpha: 0.12 + Math.random() * 0.20,
      };
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);

      for (const s of streaks) {
        const dx = -COS * s.len;
        const dy = SIN * s.len;

        // Bluish-white gradient: #D6DEEB → #B4C2D9 with soft edges
        const grad = ctx.createLinearGradient(s.x, s.y, s.x + dx, s.y + dy);
        grad.addColorStop(0, `rgba(255,255,255,0)`);
        grad.addColorStop(0.18, `rgba(214,222,235,${s.alpha * 0.4})`); // #D6DEEB
        grad.addColorStop(0.62, `rgba(180,194,217,${s.alpha})`);       // #B4C2D9
        grad.addColorStop(1, `rgba(255,255,255,0)`);

        ctx.save();
        ctx.globalCompositeOperation = "lighter"; // elegant glow
        ctx.lineCap = "round";
        ctx.lineWidth = s.thickness;
        ctx.strokeStyle = grad;
        ctx.shadowColor = `rgba(180,194,217,${s.alpha})`; // soft bluish
        ctx.shadowBlur = 6;

        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x + dx, s.y + dy);
        ctx.stroke();
        ctx.restore();

        // motion along angle
        s.x += -COS * s.speed * 1.1;
        s.y += SIN * s.speed * 1.1;

        // recycle off-screen with margin
        if (s.y - s.len > height + 80 || s.x + s.len < -80) {
          const respawn = spawnStreak(width, height);
          respawn.x = width + Math.random() * 100;
          respawn.y = -60 - Math.random() * 160;
          Object.assign(s, respawn);
        }
      }

      animationId = requestAnimationFrame(draw);
    }

    draw();

    function onResize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * DPR;
      canvas.height = height * DPR;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(DPR, DPR);
    }
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", onResize);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -9,
        pointerEvents: "none",
      }}
      aria-hidden="true"
    />
  );
}
