import Tooltip from "./Tooltip";

export default function VideoSection() {
  return (
    <section
      className="relative max-w-[1200px] mx-auto px-4 py-16 flex flex-col items-center"
      style={{
        contentVisibility: "auto",
        containIntrinsicSize: "680px",
      }}
    >
      {/* unique background accents */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center fx-layer">
        <div
          className="w-[70vw] h-[70vw] rounded-full blur-3xl opacity-25"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(214,222,235,.38) 0%, rgba(214,222,235,0) 70%)",
          }}
        />
      </div>
      <Tooltip text="Watch our intro video">
        <div className="relative w-full max-w-2xl aspect-video rounded-xl overflow-hidden shadow-md border border-gray-200 bg-white">
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent pointer-events-none" />
          <iframe
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="SkillEdge Intro"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      </Tooltip>
      <style jsx global>{`
        html.fx-lite .fx-layer { opacity: .16 !important; }
        @media (max-width: 768px) { .fx-layer { opacity: .14 !important; } }
      `}</style>
    </section>
  );
}
