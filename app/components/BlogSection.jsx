'use client'
import { siteContent } from "../content";
import Tooltip from "./Tooltip";

export default function BlogSection() {
  return (
    <section className="px-2 py-16">
      <div className="max-w-[1200px] mx-auto px-4">
        <h2 className="fx-text-expand text-2xl sm:text-3xl md:text-4xl font-semibold mb-8 text-gray-900">Blog & Resources</h2>
        <div className="grid gap-8 md:grid-cols-2">
          {siteContent.blogPosts?.map((post, idx) => (
            <Tooltip key={idx} text={post.title}>
              <article className="relative rounded-xl border border-gray-200 bg-white p-6 shadow-md shadow-black/5 hover:shadow-lg hover:shadow-black/10 transition-transform duration-150">
                <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent rounded-xl pointer-events-none" />
                <h3 className="fx-text-expand font-semibold text-xl mb-2 text-gray-900">{post.title} | Bluvia Web Design Insights</h3>
                <p className="mb-2 text-gray-600">{post.summary}</p>
                <a href={post.link} className="pressable text-blue-600 underline inline-block transition hover:text-blue-500" target="_blank" rel="noopener noreferrer">
                  Read the full article: {post.title}
                </a>
              </article>
            </Tooltip>
          ))}
        </div>
      </div>
    </section>
  );
}
