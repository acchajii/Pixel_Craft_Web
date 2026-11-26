import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Chrome from "@/components/Chrome";
import Footer from "@/components/Footer";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | Websites for businesses`, template: `%s | ${site.name}` },
  description: "PixelCraft Web Studio designs and develops fast, modern websites for businesses.",
  openGraph: { title: site.name, description: "Websites for businesses, built to convert.", type: "website" },
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-volt focus:p-3">Skip to content</a>
        <Chrome />
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
