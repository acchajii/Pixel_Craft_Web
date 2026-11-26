"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ArrowUp } from "lucide-react";
import Logo from "./Logo";

export default function Chrome() {
  const [loading, setLoading] = useState(true);
  const [showTop, setShowTop] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  useEffect(() => {
    let seen = false;
    try { seen = sessionStorage.getItem("pc-loaded") === "1"; sessionStorage.setItem("pc-loaded", "1"); } catch {}
    const t = setTimeout(() => setLoading(false), seen ? 0 : 1600);
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { clearTimeout(t); window.removeEventListener("scroll", onScroll); };
  }, []);

  return (
    <>
      <motion.div aria-hidden style={{ scaleX }} className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-volt shadow-[0_0_12px_#2F6BFF]" />
      <AnimatePresence>
        {loading && (
          <motion.div key="loader" role="status" aria-label="Loading" className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-ink"
            exit={{ opacity: 0, scale: 1.05 }} transition={{ duration: 0.5 }}>
            <motion.div animate={{ scale: [0.9, 1.1, 0.9] }} transition={{ repeat: Infinity, duration: 1.4 }} className="drop-shadow-[0_0_24px_#2F6BFF]"><Logo size={72} /></motion.div>
            <div className="h-0.5 w-40 overflow-hidden rounded bg-white/10"><motion.div className="h-full bg-volt" initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 1.4 }} /></div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showTop && (
          <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top"
            className="btn-glow glass fixed bottom-6 right-6 z-50 rounded-full p-3"><ArrowUp size={20} /></motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
