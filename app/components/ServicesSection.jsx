'use client'
import Image from "next/image";
import { siteContent } from "../content";
import { useSoundEffect } from "../hooks/useSoundEffect";
import Tooltip from "./Tooltip";

const serviceImages = [
  { id: "business", src: "/assets/stats.jpg", label: "Business Websites" },
  { id: "saloon", src: "/assets/saloon_beauty.jpg", label: "Salon & Beauty" },
  { id: "gym", src: "/assets/gym.jpg", label: "Gym Websites" },
  { id: "saas", src: "/assets/saas_website.jpg", label: "SaaS Websites" },
  { id: "restaurant", src: "/assets/restaruant.jpg", label: "Restaurant Websites" },
  { id: "portfolio", src: "/assets/portfolio.jpg", label: "Portfolio Websites" }
];

export default function ServicesSection() {
  const { playClick } = useSoundEffect();

  return (
    <section id="features" className="relative px-2 py-16 md:py-24" style={{ contentVisibility: "auto", containIntrinsicSize: "1000px" }}>
      {/* colorful background accents */}
      <div className="pointer-events-none absolute inset-0 -z-10 fx-layer">
        <div
          className="absolute inset-0 blur-2xl opacity-60"
          style={{
            background:
              "radial-gradient(32% 28% at 15% 20%, rgba(125,211,252,0.35) 0%, rgba(125,211,252,0) 60%)," +
              "radial-gradient(28% 24% at 80% 18%, rgba(167,139,250,0.30) 0%, rgba(167,139,250,0) 62%)," +
              "radial-gradient(26% 22% at 25% 78%, rgba(96,165,250,0.28) 0%, rgba(96,165,250,0) 60%)," +
              "radial-gradient(22% 20% at 74% 74%, rgba(192,132,252,0.26) 0%, rgba(192,132,252,0) 60%)",
            mixBlendMode: "screen",
            filter: "saturate(1.1) blur(32px)",
          }}
        />
      </div>
      <div className="max-w-[1200px] mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 md:mb-10 text-gray-900">
          Our Web Design & Development Services
        </h2>
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 mx-2">
          {serviceImages.map((s) => (
            <Tooltip key={s.id} text={s.label + " – Click to learn more"}>
              <div
                className="relative transition-transform duration-150 hover:scale-105 group will-change-transform"
                onClick={playClick}
                style={{ minHeight: 220, height: "100%" }}
                tabIndex={0}
              >
                <div className="relative w-full h-44 sm:h-52 md:h-56 flex items-center justify-center rounded-2xl overflow-hidden">
                  <Image
                    src={s.src}
                    alt={s.label}
                    fill
                    className="object-cover w-full h-full transition duration-300 group-hover:blur-[2.5px] group-hover:brightness-75"
                    style={{ borderRadius: "1rem" }}
                    sizes="(max-width: 768px) 100vw, 400px"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span
                      className="font-bold text-center px-4 py-2 rounded select-none pointer-events-none transition-all duration-300 text-lg sm:text-xl md:text-2xl text-white bg-black/20 opacity-90 group-hover:bg-black/40 group-hover:opacity-100"
                      style={{ textShadow: "0 2px 12px #000, 0 1px 2px #222" }}
                    >
                      {s.label}
                    </span>
                  </div>
                </div>
              </div>
            </Tooltip>
          ))}
        </div>
      </div>
      {/* ...existing global fx-lite style (keep or remove as you prefer) ... */}
    </section>
  );
}
