'use client'
import Link from "next/link";
import Tooltip from "./components/Tooltip";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0a0f1a] via-[#0b1220] to-[#0a0f1a]"
      data-no-ads
    >
      <h1 className="text-6xl font-extrabold text-white mb-4">404</h1>
      <p className="text-xl text-slate-300 mb-8">Sorry, that page could not be found.</p>
      <Tooltip text="Go back to homepage">
        <Link href="/" className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500 text-white font-semibold hover:brightness-110 transition">
          Go Home
        </Link>
      </Tooltip>
    </div>
  );
}
