'use client'
import { useEffect, useState } from "react";
import { siteContent } from "../content";

const demoProofs = [
  { type: "booking", name: "Priya S.", msg: "just booked a Business Pack!" },
  { type: "testimonial", name: "Alex M.", msg: "left a 5-star review!" },
  { type: "booking", name: "Liam C.", msg: "just booked a Pro Pack!" },
  { type: "testimonial", name: "Sofia R.", msg: "said: 'Love the oceanic vibes!'" }
];

export default function SocialProofPopup() {
  const [show, setShow] = useState(false);
  const [proof, setProof] = useState(null);

  useEffect(() => {
    let idx = 0;
    const interval = setInterval(() => {
      setProof(demoProofs[idx % demoProofs.length]);
      setShow(true);
      setTimeout(() => setShow(false), 3400);
      idx++;
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  if (!show || !proof) return null;
  return (
    <div
      className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[9999] pointer-events-none rounded-full px-5 py-2.5 border border-gray-200 bg-white shadow-md shadow-black/5 text-gray-800 text-sm font-semibold"
      role="status"
      aria-live="polite"
    >
      <span className="mr-2">{proof.type === "booking" ? "🛒" : "⭐"}</span>
      <b className="text-gray-900">{proof.name}</b> {proof.msg}
    </div>
  );
}
