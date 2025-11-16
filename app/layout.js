import "./globals.css";
import { defaultSEO } from "./utils/seo";
import { siteContent } from "./content";
import Navbar from "./components/Navbar";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ReferralModal from "./components/ReferralModal";
import EasterEgg from "./components/EasterEgg";
import StickyCTA from "./components/StickyCTA";

// Build metadata from content.js and defaultSEO util
const seo = defaultSEO(siteContent);
const ogImage = seo?.openGraph?.images?.[0]?.url;

export const metadata = {
  title: "Bluvia – Modern Web Design & Development",
  description:
    "Bluvia builds stunning, high-performance websites and digital experiences for businesses, startups, and creators. Get a modern, SEO-optimized website that stands out.",
  openGraph: {
    title: "Bluvia – Modern Web Design & Development",
    description:
      "Bluvia builds stunning, high-performance websites and digital experiences for businesses, startups, and creators. Get a modern, SEO-optimized website that stands out.",
    url: seo.openGraph.url.replace(/skilledge\.tech/gi, "bluvia.tech"),
    type: seo.openGraph.type,
    images: [
      {
        url: ogImage,
        alt: "Bluvia Logo",
      },
    ],
    site_name: "Bluvia",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    site: "@bluvia_tech",
    creator: "@bluvia_tech",
    title: "Bluvia – Modern Web Design & Development",
    description:
      "Bluvia builds stunning, high-performance websites and digital experiences for businesses, startups, and creators. Get a modern, SEO-optimized website that stands out.",
    image: ogImage,
    image_alt: "Bluvia Logo",
  },
  icons: {
    icon: "/assets/logo_round.png",
  },
  metadataBase: new URL(
    (siteContent.seo?.url || siteContent.url || "http://localhost:3000").replace(
      /skilledge\.tech/gi,
      "bluvia.tech"
    )
  ),
  alternates: {
    canonical: "https://bluvia.tech/",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* --- SEO: For top-notch SEO, set unique <title> and <meta name="description"> in each page/route if you add more pages. --- */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="description" content={metadata.description} />
        <meta name="robots" content="index,follow" />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:type" content="website" />
        <meta
          property="og:site_name"
          content={siteContent.companyName.replace(/SkillEdge/gi, "Bluvia")}
        />
        <meta property="og:url" content={metadata.openGraph.url} />
        <meta property="og:image" content={metadata.openGraph.images[0].url} />
        <meta property="og:image:alt" content={metadata.openGraph.images[0].alt} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:image" content={metadata.openGraph.images[0].url} />
        <meta name="twitter:image:alt" content={metadata.openGraph.images[0].alt} />
        <meta
          name="keywords"
          content="Bluvia, web design, web development, oceanic design, glassmorphism, SEO, responsive websites, modern websites, business websites, SaaS, e-commerce, portfolio, branding, India"
        />
        <meta name="author" content="Bluvia Team" />
        <meta property="og:locale" content="en_IN" />
        <meta property="og:site_name" content="Bluvia" />
        <meta property="og:url" content="https://bluvia.tech/" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        <meta name="twitter:site" content="@bluvia_tech" />
        <meta name="twitter:creator" content="@bluvia_tech" />
        <meta name="twitter:image:alt" content="Bluvia Logo" />
        <link rel="canonical" href="https://bluvia.tech/" />
        <link rel="alternate" href="https://bluvia.tech/" hrefLang="en-in" />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <title>{metadata.title}</title>
        <link rel="icon" href="/assets/logo_round.png" type="image/png" />
        {/* JSON-LD for Organization and Website */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: siteContent.companyName.replace(/SkillEdge/gi, "Bluvia"),
              url: "https://bluvia.vercel.app/",
              logo: "/assets/logo_round.png",
              sameAs: [siteContent.contact.instagram],
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  email: siteContent.contact.email,
                  telephone: siteContent.contact.phone,
                  contactType: "customer support",
                },
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              url: "https://bluvia.vercel.app/",
              name: "Bluvia – Modern Web Design & Development",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://bluvia.tech/?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX');
            `,
          }}
        />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4121958416488188"
          crossOrigin="anonymous"
        ></script>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#F4F6F8" />
      </head>
      <body className="font-sans min-h-screen flex flex-col text-gray-800 bg-gradient-to-br from-[#F0F3F8] via-[#E3E8EF] to-[#CED4DF]">
        {/* Fixed background layers (Tailwind only, no <style> tag) */}
        <div className="fixed inset-0 -z-50 pointer-events-none overflow-hidden">
          {/* Color glow orbs (screen blend) */}
          <div className="absolute inset-[-20%] mix-blend-screen saturate-110">
            <div className="absolute left-[12%] top-[16%] w-[38vw] h-[32vw] rounded-full blur-[64px] opacity-30 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(125,211,252,0.35)_0%,rgba(125,211,252,0)_60%)]" />
            <div className="absolute right-[10%] top-[12%] w-[32vw] h-[28vw] rounded-full blur-[60px] opacity-28 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(167,139,250,0.30)_0%,rgba(167,139,250,0)_62%)]" />
            <div className="absolute left-[22%] bottom-[14%] w-[34vw] h-[28vw] rounded-full blur-[56px] opacity-26 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(96,165,250,0.28)_0%,rgba(96,165,250,0)_60%)]" />
            <div className="absolute right-[18%] bottom-[16%] w-[28vw] h-[24vw] rounded-full blur-[52px] opacity-26 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(192,132,252,0.26)_0%,rgba(192,132,252,0)_60%)]" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[24vw] h-[20vw] rounded-full blur-[48px] opacity-22 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(94,234,212,0.22)_0%,rgba(94,234,212,0)_60%)]" />
          </div>

          {/* Aurora + gloss sweeps */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/25 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-tr from-white/25 via-transparent to-white/10" />
            <div className="absolute left-[8%] top-[10%] w-[46vw] h-[40vw] rounded-full blur-3xl opacity-35 bg-[radial-gradient(60%_50%_at_50%_50%,rgba(214,222,235,0.36)_0%,rgba(214,222,235,0)_60%)]" />
            <div className="absolute right-[8%] bottom-[10%] w-[50vw] h-[42vw] rounded-full blur-3xl opacity-30 bg-[radial-gradient(60%_50%_at_50%_50%,rgba(180,194,217,0.30)_0%,rgba(180,194,217,0)_60%)]" />
          </div>

          {/* Star streaks (static, thin, rotated) */}
          <div className="absolute inset-0">
            <div className="absolute left-[8%] top-[6%] w-px h-[140px] rotate-[-16deg] bg-gradient-to-b from-transparent via-[#D6DEEB99] to-transparent opacity-60 drop-shadow-[0_0_6px_rgba(180,194,217,0.35)]" />
            <div className="absolute left-[22%] top-[-10%] w-px h-[120px] rotate-[-16deg] bg-gradient-to-b from-transparent via-[#D6DEEB80] to-transparent opacity-55 drop-shadow-[0_0_6px_rgba(180,194,217,0.35)]" />
            <div className="absolute left-[38%] top-[0%] w-px h-[100px] rotate-[-16deg] bg-gradient-to-b from-transparent via-[#D6DEEB70] to-transparent opacity-55 drop-shadow-[0_0_6px_rgba(180,194,217,0.35)]" />
            <div className="absolute left-[56%] top-[-14%] w-px h-[160px] rotate-[-16deg] bg-gradient-to-b from-transparent via-[#D6DEEB90] to-transparent opacity-60 drop-shadow-[0_0_6px_rgba(180,194,217,0.35)]" />
            <div className="absolute left-[72%] top-[-8%] w-px h-[110px] rotate-[-16deg] bg-gradient-to-b from-transparent via-[#D6DEEB66] to-transparent opacity-55 drop-shadow-[0_0_6px_rgba(180,194,217,0.35)]" />
            <div className="absolute left-[88%] top-[12%] w-px h-[130px] rotate-[-16deg] bg-gradient-to-b from-transparent via-[#D6DEEB80] to-transparent opacity-60 drop-shadow-[0_0_6px_rgba(180,194,217,0.35)]" />
            <div className="absolute left-[14%] top-[42%] w-px h-[120px] rotate-[-16deg] bg-gradient-to-b from-transparent via-[#D6DEEB70] to-transparent opacity-55 drop-shadow-[0_0_6px_rgba(180,194,217,0.35)]" />
            <div className="absolute left-[30%] top-[34%] w-px h-[150px] rotate-[-16deg] bg-gradient-to-b from-transparent via-[#D6DEEB80] to-transparent opacity-60 drop-shadow-[0_0_6px_rgba(180,194,217,0.35)]" />
            <div className="absolute left-[50%] top-[46%] w-px h-[130px] rotate-[-16deg] bg-gradient-to-b from-transparent via-[#D6DEEB70] to-transparent opacity-55 drop-shadow-[0_0_6px_rgba(180,194,217,0.35)]" />
            <div className="absolute left-[68%] top-[40%] w-px h-[140px] rotate-[-16deg] bg-gradient-to-b from-transparent via-[#D6DEEB90] to-transparent opacity-60 drop-shadow-[0_0_6px_rgba(180,194,217,0.35)]" />
            <div className="absolute left-[84%] top-[50%] w-px h-[110px] rotate-[-16deg] bg-gradient-to-b from-transparent via-[#D6DEEB66] to-transparent opacity-55 drop-shadow-[0_0_6px_rgba(180,194,217,0.35)]" />
          </div>

          {/* Subtle grain/noise */}
          <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(rgba(0,0,0,0.035)_1px,transparent_1.2px)] [background-size:2px_2px]" />
        </div>

        <EasterEgg />
        <ReferralModal />
        <Navbar />
        <main
          id="main-content"
          className="relative z-10 flex-1 flex flex-col items-center justify-center"
          tabIndex={-1}
        >
          {children}
        </main>
        <StickyCTA />
        <SpeedInsights />
      </body>
    </html>
  );
}
