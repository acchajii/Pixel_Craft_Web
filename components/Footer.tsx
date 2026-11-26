import Link from "next/link";
import { site } from "@/lib/site";
export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-5 py-10 text-sm text-white/60">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
        <p>© {new Date().getFullYear()} {site.name}</p>
        <div className="flex gap-6">
          <Link href="/contact" className="hover:text-white">Contact</Link>
          <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white">Instagram @pixelcraft.web.in</a>
        </div>
      </div>
    </footer>
  );
}
