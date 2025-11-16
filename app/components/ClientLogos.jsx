'use client'
import Image from "next/image";
import { siteContent } from "../content";
import { useSoundEffect } from "../hooks/useSoundEffect";
import Tooltip from "./Tooltip";

export default function ClientLogos() {
  const { playClick } = useSoundEffect();

  return (
    <section className="relative px-2 py-8" style={{ contentVisibility: "auto", containIntrinsicSize: "360px" }}>
      {/* unique background accents */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 -z-10 bg-gradient-to-b from-white/40 to-transparent fx-layer" />
      <div className="max-w-[1200px] mx-auto px-4">
        <h3 className="text-center text-lg font-semibold mb-6 text-gray-600">Trusted by</h3>
        <div className="flex flex-wrap justify-center items-center gap-6">
          {siteContent.clientLogos?.map((logo, idx) => (
            <Tooltip key={idx} text={logo.alt}>
              <div
                className="relative overflow-hidden rounded-full bg-white p-2 shadow-md border border-gray-200 transition-transform duration-150 hover:scale-110"
                onClick={playClick}
                style={{
                  width: 64,
                  height: 64,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Image
                  src={logo.src.replace("/assets/logo.png", "/assets/logo_round.png")}
                  alt={logo.alt}
                  width={logo.width || 40}
                  height={logo.height || 40}
                  className="object-contain"
                  loading="lazy"
                  decoding="async"
                  sizes="40px"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: "transparent"
                  }}
                />
              </div>
            </Tooltip>
          ))}
        </div>
      </div>
    </section>
  );
}
