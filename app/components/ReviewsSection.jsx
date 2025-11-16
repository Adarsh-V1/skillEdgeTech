import { siteContent } from "../content";
import Tooltip from "./Tooltip";

export default function ReviewsSection() {
  return (
    <section className="relative px-2 py-16 md:py-24" style={{ contentVisibility: "auto", containIntrinsicSize: "800px" }}>
      {/* unique background accents */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-tr from-white/35 to-transparent fx-layer" />
      <div className="max-w-[1200px] mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 md:mb-10 text-gray-900">
          What clients say
        </h2>
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-2">
          {siteContent.reviews.map((r, idx) => (
            <Tooltip key={idx} text={`Review by ${r.name}`}>
              <blockquote className="relative rounded-xl border border-gray-200 bg-white shadow-md shadow-black/5 p-6 text-center transition-transform duration-150 hover:shadow-lg hover:shadow-black/10">
                <p className="text-base sm:text-lg md:text-xl font-medium leading-relaxed text-gray-700">“{r.text}”</p>
                <footer className="mt-4 sm:mt-6 text-base sm:text-lg font-semibold text-gray-600">— {r.name}</footer>
              </blockquote>
            </Tooltip>
          ))}
        </div>
      </div>
    </section>
  );
}
