"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { siteContent } from "../content";
import { useSoundEffect } from "../hooks/useSoundEffect";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { playClick } = useSoundEffect();
  const pathname = usePathname();

  // Helper to handle anchor navigation from /booking or other pages
  function handleSectionNav(e, id) {
    playClick();
    if (pathname === "/") {
      // On home, scroll to section
      const el = document.getElementById(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth" });
        setOpen(false);
      }
    } else {
      // On other pages, go to home with hash
      // Use window.location to force full navigation
      e.preventDefault();
      window.location.href = `/#${id}`;
    }
  }

  return (
    <header
      className="fixed top-0 left-0 w-full z-50 text-gray-700 bg-gradient-to-br from-white/70 to-white/30 backdrop-blur-xl"
      role="banner"
      aria-label="Main navigation"
    >
      {/* gloss overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/40 to-transparent opacity-30" />
      <div className="max-w-[1200px] mx-auto px-4 flex items-center justify-between py-2 md:py-3 relative">
        <Link
          href="/"
          className="flex items-center gap-3 group"
          onClick={playClick}
        >
          <div className="flex items-center justify-center rounded-full bg-white shadow-md border border-gray-200 transition-transform duration-150 hover:scale-110 w-[54px] h-[54px] overflow-hidden p-0">
            <Image
              src="/assets/logo_round.png"
              alt={siteContent.companyName}
              width={44}
              height={44}
              className="object-contain"
              priority
            />
          </div>
          <span className="font-extrabold text-xl md:text-2xl transition-colors duration-150 text-gray-900 tracking-tight">
            Bluvia
            <span className="ml-2 text-base font-normal text-gray-500 hidden sm:inline">
              – Modern Web Design
            </span>
          </span>
        </Link>
        <nav
          className="hidden md:flex gap-2 lg:gap-4 text-base items-center"
          aria-label="Primary"
        >
          {["features", "pricing", "portfolio", "contact"].map((id) => (
            <a
              key={id}
              href={`#${id}`}
              className="px-4 py-2 rounded-xl text-gray-500 hover:text-blue-500 border border-transparent hover:border-gray-200 hover:bg-[#F8FAFC] transition"
              onClick={(e) => handleSectionNav(e, id)}
            >
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </a>
          ))}
          <Link
            href="/booking"
            className="ml-4 inline-flex items-center justify-center rounded-full px-6 py-2.5 font-semibold text-white shadow-lg hover:shadow-black/10 transition relative overflow-hidden bg-gradient-to-r from-[#3B82F6] via-[#60A5FA] to-[#3B82F6]"
            onClick={playClick}
          >
            <span className="absolute inset-0 bg-white/20 opacity-20" />
            <span className="relative">Get started</span>
          </Link>
        </nav>
        <div className="md:hidden">
          <button
            onClick={() => {
              setOpen(!open);
              playClick();
            }}
            className="p-2 rounded-full border border-gray-200 bg-white text-gray-700 shadow"
            aria-label="Toggle menu"
          >
            {open ? (
              <span className="text-2xl font-bold">×</span>
            ) : (
              <span className="text-lg font-bold">☰</span>
            )}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden max-w-[1200px] mx-auto px-4 rounded-b-xl p-4 shadow-xl bg-white/90 border-b border-gray-200 backdrop-blur-xl">
          <div className="flex flex-col gap-3">
            {["features", "pricing", "portfolio", "contact"].map((id) => (
              <a
                key={id}
                href={`#${id}`}
                className="px-4 py-3 rounded-xl text-gray-700 hover:text-blue-600 hover:bg-[#F8FAFC] border border-gray-200 transition"
                onClick={(e) => {
                  handleSectionNav(e, id);
                  setOpen(false);
                }}
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            ))}
            <Link
              href="/booking"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 font-semibold bg-blue-500 text-white shadow-lg hover:bg-blue-700 transition"
              onClick={() => {
                setOpen(false);
                playClick();
              }}
            >
              Get started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
