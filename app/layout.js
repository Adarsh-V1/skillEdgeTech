import "./globals.css";
import { defaultSEO } from "./utils/seo";
import { siteContent } from "./content";
import Navbar from "./components/Navbar";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ReferralModal from "./components/ReferralModal";
import EasterEgg from "./components/EasterEgg";
import StickyCTA from "./components/StickyCTA";
import GlobalBackground from "./components/GlobalBackground"; // NEW

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
      <body className="font-sans min-h-screen flex flex-col text-gray-800 bg-transparent">
        <GlobalBackground />
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
