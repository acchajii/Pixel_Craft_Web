"use client";
export default function SpotlightCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`spot glass rounded-2xl p-6 ${className}`}
      onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`); e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`); }}>
      {children}
    </div>
  );
}
