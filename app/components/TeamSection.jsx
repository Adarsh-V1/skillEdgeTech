'use client'
import { siteContent } from "../content";
import Tooltip from "./Tooltip";

export default function TeamSection() {
  return (
    <section className="relative max-w-[1200px] mx-auto px-4 py-16">
      {/* unique background accents */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/45 to-transparent" />
      </div>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-8 text-gray-900 text-center">
        Meet Our Team
      </h2>
      <div className="grid gap-8 grid-cols-2 sm:grid-cols-2 md:grid-cols-3">
        {siteContent.team?.map((member, idx) => (
          <Tooltip key={idx} text={`${member.role} – ${member.name}`}>
            <div className="relative rounded-xl border border-gray-200 bg-white shadow-md shadow-black/5 p-6 flex flex-col items-center text-gray-800">
              <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent rounded-xl pointer-events-none" />
              <img
                src={member.avatar}
                alt={member.name}
                className="w-24 h-24 rounded-full mb-4 object-cover ring-2 ring-white"
                loading="lazy"
                decoding="async"
                width={96}
                height={96}
              />
              <div className="font-bold text-gray-900">{member.name}</div>
              <div className="text-gray-500 mb-2">{member.role}</div>
              <div className="text-gray-600 text-sm text-center">{member.bio}</div>
            </div>
          </Tooltip>
        ))}
      </div>
    </section>
  );
}
