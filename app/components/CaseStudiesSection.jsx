'use client'
import { siteContent } from "../content";
import { useSoundEffect } from "../hooks/useSoundEffect";
import Tooltip from "./Tooltip";

export default function CaseStudiesSection() {
  const { playClick } = useSoundEffect();

  return (
    <section className="px-2 py-16">
      <div className="container-max">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-8 text-white">Case Studies</h2>
        <div className="grid gap-8 grid-cols-2 md:grid-cols-2 mx-2">
          {siteContent.caseStudies?.map((c, idx) => (
            <Tooltip key={idx} text={`Read more about ${c.title}`}>
              <article
                className="relative overflow-hidden rounded-xl border border-white/10 p-6 shadow bg-white/10 backdrop-blur-xl hover:shadow-lg transition-transform duration-150 hover:scale-105 text-slate-200"
                onClick={playClick}
              >
                <h3 className="font-bold text-xl mb-2 text-white">{c.title}</h3>
                <p className="mb-2 text-slate-300">{c.summary}</p>
                <Tooltip text="Open case study in new tab">
                  <a
                    href={c.link}
                    className="text-cyan-300 underline inline-block transition-colors duration-150 hover:text-cyan-200"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={playClick}
                  >
                    Read more about {c.title}
                  </a>
                </Tooltip>
              </article>
            </Tooltip>
          ))}
        </div>
      </div>
    </section>
  );
}
