'use client'
import { useEffect, useState } from "react";

export default function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const m = document.cookie.match(/(?:^|; )ad_consent=(granted|denied)/);
      setVisible(!(m && (m[1] === "granted" || m[1] === "denied")));
    } catch {
      setVisible(true);
    }
  }, []);

  function setCookie(k, v, days) {
    const d = new Date();
    d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${k}=${v}; path=/; expires=${d.toUTCString()}; SameSite=Lax`;
  }

  function acceptAll() {
    setCookie("ad_consent", "granted", 180);
    if (typeof window.gtag === "function") {
      window.gtag("consent", "update", {
        ad_storage: "granted",
        ad_user_data: "granted",
        ad_personalization: "granted",
        analytics_storage: "granted",
      });
    }
    // sync global flag so AdsWrapper can proceed immediately
    if (typeof window.__acceptConsent === "function") {
      window.__acceptConsent();
    } else {
      window.__consented = true;
    }
    setVisible(false); // AdsWrapper will load script after content validates
  }

  function onlyNecessary() {
    setCookie("ad_consent", "denied", 180);
    if (typeof window.gtag === "function") {
      window.gtag("consent", "update", {
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
        analytics_storage: "denied",
      });
    }
    if (typeof window.__rejectConsent === "function") {
      window.__rejectConsent();
    } else {
      window.__consented = false;
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 inset-x-0 z-[2000] bg-white/90 backdrop-blur shadow-lg"
      role="dialog"
      aria-label="Cookie consent"
    >
      <div className="max-w-[1200px] mx-auto px-4 py-3 flex flex-col sm:flex-row items-center gap-3">
        <p className="text-sm text-gray-700 text-center sm:text-left">
          We use cookies for analytics and personalized ads (Google AdSense). You can accept or continue with limited, non-personalized use.
          See our <a href="/privacy-policy" className="underline text-blue-600 hover:text-blue-500">Privacy Policy</a>.
        </p>
        <div className="flex gap-2 ml-0 sm:ml-auto">
          <button
            onClick={onlyNecessary}
            className="pressable px-4 py-2 rounded-full border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 text-sm"
          >
            Only necessary
          </button>
          <button
            onClick={acceptAll}
            className="pressable px-4 py-2 rounded-full text-white bg-blue-600 hover:bg-blue-700 text-sm"
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}
