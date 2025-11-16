'use client'
export default function StickyCTA() {
  return (
    <a
      href="/booking"
      className="fixed left-1/2 z-[1001] px-8 py-3 rounded-full font-bold text-white shadow-lg hover:shadow-black/10 transition relative overflow-hidden bg-gradient-to-r from-[#3B82F6] via-[#60A5FA] to-[#3B82F6]"
      style={{
        minWidth: 180,
        textAlign: "center",
        pointerEvents: "auto",
        position: "fixed",
        bottom: "32px",
        left: "50%",
        transform: "translate(-50%, 0)",
      }}
      tabIndex={0}
      aria-label="Get Started"
    >
      <span className="absolute inset-0 bg-white/20 opacity-20" />
      <span className="relative">Get Started</span>
    </a>
  );
}
