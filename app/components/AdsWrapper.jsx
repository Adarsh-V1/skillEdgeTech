'use client'
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const ALLOWED_ROUTES = new Set([
  "/", "/booking", "/privacy-policy", "/terms"
  // add blog article routes like "/blog/slug" dynamically if needed
]);
const MIN_CHARS = 300;
const MAX_WAIT_MS = 7000;

export default function AdsWrapper() {
  const pathname = usePathname() || "/";
  const [ready, setReady] = useState(false);
  const [slotVisible, setSlotVisible] = useState(false);

  useEffect(() => {
    let cancelled = false;
    if (!ALLOWED_ROUTES.has(pathname)) return;
    const start = performance.now();

    function hasEnoughContent() {
      const main = document.getElementById("main-content");
      if (!main) return false;
      // strip repetitive nav text
      const txt = (main.textContent || "").replace(/\s+/g," ").trim();
      return txt.length >= MIN_CHARS;
    }

    function attempt() {
      if (cancelled) return;
      const consent = !!window.__consented;
      const enough = hasEnoughContent();
      const timedOut = performance.now() - start > MAX_WAIT_MS;
      if (consent && (enough || timedOut)) {
        injectScript();
        setReady(true);
        setSlotVisible(enough); // show ad only if enough; no blank screens
      } else {
        requestAnimationFrame(attempt);
      }
    }
    attempt();
    return () => { cancelled = true; };
  }, [pathname]);

  function injectScript() {
    if (document.getElementById("adsbygoogle-js")) return;
    const s = document.createElement("script");
    s.id = "adsbygoogle-js";
    s.async = true;
    s.crossOrigin = "anonymous";
    s.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4121958416488188";
    s.onload = () => {
      try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch {}
    };
    document.head.appendChild(s);
  }

  if (!ready || !slotVisible) return null;

  return (
    <div
      className="w-full flex justify-center py-8"
      aria-label="Sponsored"
    >
      <ins
        className="adsbygoogle block"
        style={{ display: "block", minHeight: 120 }}
        data-ad-client="ca-pub-4121958416488188"
        data-ad-slot="0000000000"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
