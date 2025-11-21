'use client'
import Image from "next/image";
import { siteContent } from "../content";
import { useSoundEffect } from "../hooks/useSoundEffect";
import Tooltip from "./Tooltip";
import { useState } from "react";

const portfolioImages = [
  { name: "Business Website", img: "/assets/saas_website.jpg" },
  { name: "SaaS Website", img: "/assets/saas_website.jpg" },
  { name: "Restaurant Website", img: "/assets/saas_website.jpg" },
  { name: "Gym Website", img: "/assets/saas_website.jpg" },
  { name: "Portfolio", img: "/assets/saas_website.jpg" },
  { name: "Salon Beauty", img: "/assets/saas_website.jpg" },
];

export default function PortfolioSection() {
  const { playClick } = useSoundEffect();
  const [fallbackSrc, setFallbackSrc] = useState({}); // idx -> fallback path

  function handleImgError(idx) {
    setFallbackSrc(prev => {
      if (prev[idx]) return prev; // avoid loops
      return { ...prev, [idx]: "/assets/saas_website.jpg" };
    });
  }

  return (
    <section id="portfolio" className="relative px-2 py-16 md:py-24" style={{ contentVisibility: "auto", containIntrinsicSize: "900px" }}>
      {/* colorful background accents */}
      <div className="pointer-events-none absolute inset-0 -z-10 fx-layer">
        <div
          className="absolute -right-10 -top-8 w-[46vw] h-[46vw] rounded-full blur-3xl opacity-60"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(167,139,250,0.30) 0%, rgba(167,139,250,0) 70%)",
            mixBlendMode: "screen",
            filter: "saturate(1.1)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-50/70 via-transparent to-indigo-50/40 opacity-70" />
      </div>
      <div className="max-w-[1200px] mx-auto px-4">
        <h2 className="fx-text-expand text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 md:mb-10 text-gray-900">
          Portfolio: Recent Web Projects by Bluvia
        </h2>
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 mx-2">
          {portfolioImages.map((p, idx) => (
            <Tooltip key={`${p.name}-${idx}`} text={p.name}>
              <div
                className="pressable group relative rounded-2xl overflow-hidden transition-transform duration-150 hover:scale-105 flex flex-col items-center text-center will-change-transform"
                onClick={playClick}
                style={{ minHeight: 180, height: "100%", background: "transparent", padding: 0 }}
              >
                <div className="relative w-full h-40 sm:h-52 md:h-60 flex items-center justify-center">
                  <Image
                    src={fallbackSrc[idx] || p.img}
                    alt={`${p.name} preview`}
                    fill
                    className="object-cover w-full h-full transition duration-300 group-hover:blur-[2.5px] group-hover:brightness-75"
                    style={{ borderRadius: "1rem" }}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                    loading="lazy"
                    decoding="async"
                    onError={() => handleImgError(idx)}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span
                      className="fx-text-expand font-bold text-center px-4 py-2 rounded select-none pointer-events-none transition-all duration-300 text-lg sm:text-xl md:text-2xl text-white bg-black/20 opacity-90 group-hover:bg-black/40 group-hover:opacity-100"
                      style={{ textShadow: "0 2px 12px #000, 0 1px 2px #222" }}
                    >
                      {p.name}
                    </span>
                  </div>
                </div>
              </div>
            </Tooltip>
          ))}
        </div>
      </div>
    </section>
  );
}
