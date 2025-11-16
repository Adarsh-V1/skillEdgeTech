'use client'
import { useState, useEffect } from "react";
import { siteContent } from "../content";
import Tooltip from "./Tooltip";
import Image from "next/image";

export default function TestimonialsCarousel() {
  const [idx, setIdx] = useState(0);
  const reviews = siteContent.reviews || [];
  useEffect(() => {
    if (reviews.length === 0) return;
    const timer = setInterval(() => setIdx(i => (i + 1) % reviews.length), 5000);
    return () => clearInterval(timer);
  }, [reviews.length]);
  return (
    <section className="relative max-w-[1200px] mx-auto px-4 py-12" style={{ contentVisibility: "auto", containIntrinsicSize: "700px" }}>
      {/* colorful background accents */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center fx-layer">
        <div
          className="w-[60vw] h-[60vw] rounded-full blur-3xl opacity-60"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(125,211,252,0.32) 0%, rgba(167,139,250,0.26) 35%, rgba(255,255,255,0) 70%)",
            mixBlendMode: "screen",
            filter: "saturate(1.1)",
          }}
        />
      </div>
      <h2 className="text-2xl font-semibold text-center mb-6 text-gray-900">What Our Clients Say</h2>
      <div className="relative flex flex-col items-center">
        <div
          key={idx}
          className="max-w-xl mx-auto bg-white border border-gray-200 rounded-xl shadow-md shadow-black/5 p-8 flex flex-col items-center transition-all duration-300 text-gray-800"
        >
          {reviews[idx]?.avatar ? (
            <Image
              src={reviews[idx].avatar}
              alt={reviews[idx].name}
              width={64}
              height={64}
              className="w-16 h-16 rounded-full mb-4 object-cover"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div className="w-16 h-16 rounded-full mb-4 bg-blue-50 flex items-center justify-center text-2xl text-blue-600 font-bold">
              {reviews[idx]?.name?.[0] || "?"}
            </div>
          )}
          <p className="text-lg text-gray-700 mb-4">“{reviews[idx]?.text}”</p>
          <span className="font-semibold text-gray-900">{reviews[idx]?.name}</span>
        </div>
        <div className="flex gap-2 mt-4">
          {reviews.map((_, i) => (
            <button
              key={i}
              className={`w-3 h-3 rounded-full ${i === idx ? "bg-blue-600" : "bg-blue-300/50"}`}
              onClick={() => setIdx(i)}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
