import { useState } from "react";
import { siteContent } from "../content";

export default function FAQSection() {
  const [open, setOpen] = useState(null);
  return (
    <section className="relative px-2 py-16" style={{ contentVisibility: "auto", containIntrinsicSize: "800px" }}>
      {/* unique background accents */}
      <div className="pointer-events-none absolute inset-0 -z-10 fx-layer">
        <div
          className="absolute -top-16 left-1/2 -translate-x-1/2 w-[80vw] h-[40vw] rounded-full blur-3xl opacity-25"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 50%, rgba(180,194,217,.35) 0%, rgba(180,194,217,0) 70%)",
          }}
        />
      </div>
      <div className="max-w-[1200px] mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-8 text-gray-900 text-center">
          Frequently Asked Questions
        </h2>
        <div className="flex flex-col gap-5 max-w-2xl mx-auto">
          {siteContent.faqs?.map((faq, idx) => (
            <div
              key={idx}
              className={`rounded-xl border ${open === idx ? "border-gray-300" : "border-gray-200"} bg-white shadow-sm transition-all duration-200`}
            >
              <button
                className="w-full flex items-center justify-between px-6 py-4 text-left font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/40 rounded-xl hover:bg-[#F8FAFC] transition"
                onClick={() => setOpen(open === idx ? null : idx)}
                aria-expanded={open === idx}
                aria-controls={`faq-panel-${idx}`}
              >
                <span className="text-lg">{faq.q}</span>
                <span
                  className="ml-4 transition-transform duration-200 text-blue-600"
                  style={{
                    transform: open === idx ? "rotate(90deg)" : "rotate(0deg)",
                    fontSize: "1.5rem",
                    lineHeight: 1,
                  }}
                  aria-hidden="true"
                >
                  ▶
                </span>
              </button>
              <div
                id={`faq-panel-${idx}`}
                className={`px-6 pb-4 text-gray-600 text-base transition-all duration-200 ${open === idx ? "max-h-40 opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}
                style={{
                  marginTop: open === idx ? "0.5rem" : 0,
                }}
              >
                {open === idx && <div>{faq.a}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>
      <style jsx global>{`
        html.fx-lite .fx-layer { opacity: .18 !important; }
        @media (max-width: 768px) { .fx-layer { opacity: .16 !important; } }
      `}</style>
    </section>
  );
}
