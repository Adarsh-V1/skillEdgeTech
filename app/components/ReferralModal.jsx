'use client'
import { useState, useEffect } from "react";

export default function ReferralModal() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const url = typeof window !== "undefined" ? window.location.origin + "/?ref=yourname" : "https://bluvia.tech/?ref=yourname";

  useEffect(() => {
    window.openReferral = () => setOpen(true);
  }, []);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative rounded-2xl border border-gray-200 bg-white shadow-2xl p-6 max-w-md w-full text-gray-800">
        {/* added gloss overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/30 via-transparent to-white/10 opacity-60 rounded-2xl pointer-events-none" />
        <button onClick={() => setOpen(false)} className="absolute top-3 right-3 text-gray-500 text-2xl font-bold hover:text-gray-800" aria-label="Close">×</button>
        <h3 className="text-xl font-semibold mb-2 text-gray-900 text-center">Refer & Earn!</h3>
        <div className="text-center text-gray-600 mb-4">
          Share your referral link. If your friend books, you both get a reward!
        </div>
        <div className="flex gap-2 items-center justify-center mb-4">
          <input
            value={url}
            readOnly
            className="rounded px-3 py-2 w-2/3 bg-white border border-gray-200 text-gray-800 placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button
            className="rounded-full px-4 py-2 font-semibold text-white shadow-lg hover:shadow-black/10 transition relative overflow-hidden bg-gradient-to-r from-[#3B82F6] via-[#60A5FA] to-[#3B82F6]"
            onClick={() => {
              navigator.clipboard.writeText(url);
              setCopied(true);
              setTimeout(() => setCopied(false), 1200);
            }}
          >
            <span className="absolute inset-0 bg-white/20 opacity-20" />
            <span className="relative">{copied ? "Copied!" : "Copy"}</span>
          </button>
        </div>
        <div className="text-xs text-gray-500 text-center">
          <b className="text-gray-700">How it works:</b> Share your link. If someone books, you both get a ₹200 Amazon voucher!
        </div>
      </div>
    </div>
  );
}
