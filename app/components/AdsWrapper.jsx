'use client'
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const ALLOWED_ROUTES = new Set([
  "/", "/booking", "/privacy-policy", "/terms"
]);
const MIN_CHARS = 300;

export default function AdsWrapper() {
  const pathname = usePathname() || "/";
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ALLOWED_ROUTES.has(pathname)) return;
    let attempts = 0;
    const maxAttempts = 70;
    const id = setInterval(() => {
      attempts++;
      const consent = !!window.__consented;
      const main = document.getElementById("main-content");
      const txt = (main?.textContent || "").replace(/\s+/g," ").trim();
      const enough = txt.length >= MIN_CHARS;
      if ((consent && enough) || attempts >= maxAttempts) {
        injectScript();
        setReady(true);
        setVisible(enough);
        clearInterval(id);
      }
    }, 220);
    return () => clearInterval(id);
  }, [pathname]);

  function injectScript() {
    if (document.getElementById("adsbygoogle-js")) return;
    const s = document.createElement("script");
    s.id = "adsbygoogle-js";
    s.async = true;
    s.crossOrigin = "anonymous";
    s.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4121958416488188";
    s.onload = () => { try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch {} };
    document.head.appendChild(s);
  }
  if (!ready || !visible) return null;
  return (
    <div className="w-full flex justify-center py-8" aria-label="Sponsored">
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
