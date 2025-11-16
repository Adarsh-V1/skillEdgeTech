"use client";
import { siteContent } from "../content";

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/30 bg-white/30 backdrop-blur-xl">
      <div className="relative max-w-[1200px] mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/40 to-transparent opacity-40" />
        <div className="text-sm text-gray-600 text-center w-full relative">
          © {new Date().getFullYear()} {siteContent.companyName.replace(/SkillEdge/gi, "Bluvia")}
        </div>
      </div>
    </footer>
  );
}
