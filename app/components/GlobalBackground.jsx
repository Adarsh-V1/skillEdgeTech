export default function GlobalBackground() {
  return (
    <div className="fixed inset-0 -z-50 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Base gradient: indigo → neutral → slate */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-neutral-100 to-slate-200" />
      {/* Soft gloss sweeps */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-tr from-white/25 via-transparent to-white/10" />
      </div>
      {/* Subtle grain */}
      <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(rgba(0,0,0,0.035)_1px,transparent_1.2px)] [background-size:2px_2px]" />
    </div>
  );
}
