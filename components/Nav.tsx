"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import { site } from "@/lib/site";

export default function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/80 backdrop-blur">
      <nav aria-label="Main" className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link href="/" className="flex items-center gap-2 font-semibold"><Logo /> {site.name}</Link>
        <ul className="hidden gap-8 text-sm md:flex">
          {site.nav.map((n) => <li key={n.href}><Link className="text-white/70 hover:text-white" href={n.href}>{n.label}</Link></li>)}
        </ul>
        <Link href="/contact" className="hidden rounded-full bg-volt px-5 py-2 text-sm font-medium md:block">Get a free quote</Link>
        <button className="md:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      {open && (
        <ul className="space-y-1 border-t border-white/10 px-5 py-3 md:hidden">
          {site.nav.map((n) => <li key={n.href}><Link onClick={() => setOpen(false)} className="block py-2" href={n.href}>{n.label}</Link></li>)}
        </ul>
      )}
    </header>
  );
}
