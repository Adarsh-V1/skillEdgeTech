'use client'
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { siteContent } from "../content";

const heroImages = [
  { src: "/assets/a1.jpg", alt: "Modern web design example", label: "Modern Web Design" },
  { src: "/assets/a2.jpg", alt: "Creative UI/UX", label: "Creative UI/UX" },
  { src: "/assets/a3.jpg", alt: "Business Website", label: "Business Websites" },
  { src: "/assets/a4.jpg", alt: "E-commerce Website", label: "E-commerce" },
  { src: "/assets/website.jpg", alt: "Website Example", label: "Website Example" },
  { src: "/assets/seo.jpg", alt: "SEO Optimized", label: "SEO Optimized" }
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const prev = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((c) => (c + 1) % heroImages.length);
      prev.current = current;
    }, 3000);
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, [current]);

  return (
    // make the whole hero a hover group
    <section className="px-2 group/hero">
      <div className="max-w-[1200px] mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
        <div>
          <div className="mb-8 flex flex-col items-center relative">
            {/* Static gradient background behind logo */}
            <div
              className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-out will-change-transform motion-reduce:transform-none group-hover/hero:scale-[1.04]"
              aria-hidden="true"
              style={{
                zIndex: 0,
                filter: "blur(32px)",
              }}
            >
              <div
                style={{
                  width: 220,
                  height: 220,
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle at 60% 40%, #38bdf8 0%, #a5b4fc 60%, #fff 100%)",
                  boxShadow: "0 0 60px 10px #38bdf8, 0 0 120px 40px #2563eb33",
                }}
              />
            </div>
            <div
              className="flex items-center justify-center rounded-full relative shadow-2xl group bg-white/70 backdrop-blur-md border border-blue-200 transition-transform duration-300 ease-out hover:scale-105 group-hover/hero:scale-[1.03] will-change-transform motion-reduce:transform-none"
              style={{
                width: 180,
                height: 180,
                overflow: "hidden",
                zIndex: 1,
                background: "transparent"
              }}
            >
              <Image
                src="/assets/logo_round.png"
                alt={siteContent.companyName}
                width={180}
                height={180}
                style={{
                  objectFit:"contain",
                  width:"100%",
                  height:"100%",
                  filter:"drop-shadow(0 0 18px #38bdf888)",
                  willChange:"transform"
                }}
                priority
                decoding="async"
              />
              {/* Static glow ring */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  borderRadius: "50%",
                  border: "4px solid #38bdf8",
                  boxShadow: "0 0 32px #38bdf8aa",
                  opacity: 0.7
                }}
              />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-semibold leading-tight text-gray-900 text-center md:text-left mb-4">
            <span className="fx-text-expand inline-block">
              Oceanic Web Experiences for Modern Brands
            </span>
          </h1>
          <p className="mt-2 text-lg sm:text-xl md:text-2xl text-gray-600 max-w-2xl text-center md:text-left mb-6">
            <span className="fx-text-expand inline-block">
              {siteContent.tagline.replace(/SkillEdge/gi, "Bluvia")}
            </span>
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
            <a
              href="/booking"
              className="pressable relative inline-flex items-center justify-center rounded-full px-6 py-3 font-semibold text-white shadow-lg hover:shadow-black/10 transition text-lg sm:text-xl overflow-hidden bg-gradient-to-r from-[#3B82F6] via-[#60A5FA] to-[#3B82F6]"
            >
              <span className="absolute inset-0 bg-white/20 opacity-20" />
              <span className="relative fx-text-expand">Get started (from ₹1,000 / $12)</span>
            </a>
            <a
              href="#features"
              className="pressable inline-flex items-center justify-center rounded-full px-6 py-3 font-semibold border border-gray-200 bg-white text-gray-800 hover:bg-[#F8FAFC] transition text-lg sm:text-xl"
            >
              <span className="fx-text-expand">Learn more</span>
            </a>
          </div>
        </div>
        <div className="flex flex-col items-center md:justify-end">
          <div
            className="relative rounded-xl overflow-hidden max-w-xs sm:max-w-sm md:max-w-lg w-full shadow transition-transform duration-300 ease-out hover:scale-[1.02] will-change-transform motion-reduce:transform-none group/card"
            style={{ background: "transparent" }}
            aria-live="polite"
          >
            <div className="relative w-full h-[320px] sm:h-[360px] md:h-[400px] transition-all duration-500">
              {heroImages.map((img, idx) => (
                <div
                  key={idx}
                  className={`absolute top-0 left-0 w-full h-full transition-all duration-700 ease-[cubic-bezier(.7,0,.3,1)]`}
                  style={{
                    opacity: idx === current ? 1 : 0,
                    zIndex: idx === current ? 10 : 0,
                    pointerEvents: idx === current ? "auto" : "none",
                    transform: idx === current ? "scale(1)" : "scale(1.05)",
                    transitionProperty: "opacity, transform",
                  }}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover w-full h-full transition-transform duration-300 ease-out group-hover/card:scale-[1.02] will-change-transform motion-reduce:transform-none"
                    style={{ borderRadius: "1rem" }}
                    sizes="(max-width: 768px) 100vw, 500px"
                    priority={idx === 0}
                    loading={idx === 0 ? "eager" : "lazy"}
                    decoding="async"
                  />
                  {/* Overlay label in the middle */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span
                      className="fx-text-expand font-bold text-center px-6 py-3 rounded select-none pointer-events-none transition-transform duration-200 ease-out text-xl sm:text-2xl md:text-3xl"
                      style={{
                        color: "#fff",
                        textShadow: "0 2px 12px #000, 0 1px 2px #222",
                        background: "rgba(0,0,0,0.18)",
                        opacity: 0.92,
                        WebkitTextFillColor: "#fff",
                        textFillColor: "#fff",
                      }}
                      aria-label={img.label}
                    >
                      {img.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div
              className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10"
              role="tablist"
              aria-label="Hero image carousel"
            >
              {heroImages.map((_, idx) => (
                <button
                  key={idx}
                  className={`w-3 h-3 rounded-full ${current === idx ? "bg-blue-600" : "bg-blue-200"} transition-transform duration-150 ease-out hover:scale-125 active:scale-95 will-change-transform motion-reduce:transform-none`}
                  style={{
                    outline: "none",
                    border: "none",
                    minWidth: 44,
                    minHeight: 44,
                    padding: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  aria-label={`Show hero image ${idx + 1}`}
                  aria-selected={current === idx}
                  tabIndex={0}
                  onClick={() => setCurrent(idx)}
                  onKeyDown={e => {
                    if (e.key === "Enter" || e.key === " ") setCurrent(idx);
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
