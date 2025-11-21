'use client'
import { useState } from "react";
import Tooltip from "./Tooltip";

export default function NewsletterSignup() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <section className="relative px-2 py-12" style={{ contentVisibility: "auto", containIntrinsicSize: "520px" }}>
      {/* unique background accents */}
      <div className="pointer-events-none absolute inset-0 -z-10 fx-layer">
        <div className="absolute inset-0"
             style={{ background: "radial-gradient(60% 40% at 50% 50%, rgba(255,255,255,.35) 0%, rgba(255,255,255,0) 70%)" }} />
      </div>
      <div className="max-w-[1200px] mx-auto px-4 flex flex-col items-center">
        <div className="relative w-full max-w-lg mx-auto p-8 flex flex-col items-center rounded-2xl border border-gray-200 bg-white shadow-md shadow-black/5">
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent rounded-2xl pointer-events-none" />
          <h3 className="fx-text-expand text-2xl font-semibold mb-2 text-gray-900 text-center tracking-tight">
            Stay in the Loop
          </h3>
          <p className="text-gray-600 mb-6 text-center text-base sm:text-lg">
            Get the latest web design tips, trends, and Bluvia updates. No spam, just value.
          </p>
          {!submitted ? (
            <form
              className="flex flex-col sm:flex-row gap-3 w-full max-w-md"
              onSubmit={e => {
                e.preventDefault();
                setSubmitted(true);
              }}
            >
              <Tooltip text="Enter your email to subscribe">
                <input
                  type="email"
                  required
                  placeholder="Your email"
                  className="flex-1 px-5 py-3 rounded-full border border-gray-200 bg-white text-gray-800 placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
                  aria-label="Your email address"
                />
              </Tooltip>
              <Tooltip text="Subscribe to our newsletter">
                <button
                  type="submit"
                  className="pressable relative px-7 py-3 rounded-full font-semibold text-white shadow-lg hover:shadow-black/10 transition overflow-hidden bg-gradient-to-r from-[#3B82F6] via-[#60A5FA] to-[#3B82F6]"
                  style={{
                    minWidth: 120,
                  }}
                >
                  <span className="absolute inset-0 bg-white/20 opacity-20" />
                  <span className="relative">Subscribe</span>
                </button>
              </Tooltip>
            </form>
          ) : (
            <div className="text-gray-800 font-semibold mt-4 text-lg flex items-center gap-2">
              <span className="inline-block text-2xl">🎉</span>
              Thank you for subscribing!
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
