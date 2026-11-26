"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import Particles from "./Particles";

const cells = Array.from({ length: 24 }, (_, i) => i);

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden px-5 py-24 md:py-36">
      <div aria-hidden className="hero-glow absolute -inset-10 -z-20" />
      <div aria-hidden className="grid-bg fade-mask absolute inset-0 -z-10" />
      <div className="absolute inset-0 -z-10"><Particles /></div>
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[1.2fr_1fr]">
        <div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="glass mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm text-white/80">
            <span className="h-2 w-2 animate-pulse rounded-full bg-volt shadow-[0_0_10px_#2F6BFF]" /> Taking new website projects
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 24, filter: "blur(10px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 0.9, delay: 0.2 }}
            className="text-glow text-4xl font-semibold leading-[1.1] tracking-tight md:text-6xl">
            We Build Digital Experiences That Move Businesses Forward.
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.7 }} className="mt-6 max-w-xl text-lg text-white/70">
            PixelCraft designs and develops fast, accessible websites for salons, clinics, travel companies, shops and growing businesses.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="mt-8 flex flex-wrap gap-4">
            <Link href="/contact" className="btn-glow rounded-full bg-volt px-7 py-3 font-medium">Get a free quote</Link>
            <Link href="#services" className="glass rounded-full px-7 py-3 font-medium transition hover:bg-white/10">See what we build</Link>
          </motion.div>
        </div>
        <motion.div aria-hidden className="grid aspect-[6/4] max-w-sm grid-cols-6 gap-2 justify-self-center"
          animate={{ y: [0, -12, 0] }} transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 2 }}>
          {cells.map((i) => {
            const col = i % 6, row = Math.floor(i / 6);
            const on = col === 1 || (row === 0 && col <= 4) || (row === 2 && col <= 4) || (row === 1 && col === 4);
            return (
              <motion.span key={i} className="aspect-square rounded-md"
                style={{ background: on ? "#2F6BFF" : "rgba(255,255,255,.05)", boxShadow: on ? "0 0 22px rgba(47,107,255,.7)" : "none", animation: on ? `shimmer 3s ${(col + row) * 0.25}s infinite` : undefined }}
                initial={{ opacity: 0, scale: 0.2, rotate: 45 }} animate={{ opacity: on ? undefined : 1, scale: 1, rotate: 0 }}
                transition={{ delay: 0.5 + (col + row) * 0.07, duration: 0.5 }} />
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
