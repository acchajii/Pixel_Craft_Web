import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { site } from "@/lib/site";
export const metadata: Metadata = { title: "Contact", alternates: { canonical: "/contact" } };

export default function Contact() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-20">
      <h1 className="text-4xl font-semibold">Get a free quote</h1>
      <p className="mt-3 mb-10 text-white/65">Tell us what you need. You can also message us on <a className="text-volt underline" href={site.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>.</p>
      <ContactForm />
    </div>
  );
}
