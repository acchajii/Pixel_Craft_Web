import Link from "next/link";
import Hero from "@/components/Hero";
import SpotlightCard from "@/components/SpotlightCard";
import { Reveal, StaggerList, StaggerItem } from "@/components/Reveal";
import { services, workflow } from "@/lib/site";

export default function Home() {
  return (
    <>
      <Hero />
      <section id="services" className="mx-auto max-w-6xl px-5 py-24">
        <Reveal><h2 className="text-3xl font-semibold md:text-4xl">Websites for the way your business works</h2></Reveal>
        <StaggerList className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <StaggerItem key={s.title}><SpotlightCard className="h-full"><h3 className="relative text-lg font-medium">{s.title}</h3><p className="relative mt-2 text-sm text-white/65">{s.text}</p></SpotlightCard></StaggerItem>
          ))}
        </StaggerList>
      </section>
      <section className="border-y border-white/10 bg-slate2/40 px-5 py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal><h2 className="text-3xl font-semibold md:text-4xl">How a project runs</h2></Reveal>
          <StaggerList className="mt-12 grid gap-6 md:grid-cols-4">
            {process.map((p, i) => (
              <StaggerItem key={p.title}><div className="border-l-2 border-volt/60 pl-5"><span className="text-sm text-volt">Step {i + 1}</span><h3 className="mt-1 text-lg font-medium">{p.title}</h3><p className="mt-2 text-sm text-white/65">{p.text}</p></div></StaggerItem>
            ))}
          </StaggerList>
        </div>
      </section>
      <section className="relative isolate overflow-hidden px-5 py-28 text-center">
        <div aria-hidden className="hero-glow absolute -inset-10 -z-10 opacity-70" />
        <Reveal>
          <h2 className="text-glow text-3xl font-semibold md:text-5xl">Tell us about your next website</h2>
          <p className="mx-auto mt-4 max-w-md text-white/70">Send a short enquiry and we will reply with next steps.</p>
          <Link href="/contact" className="btn-glow mt-8 inline-block rounded-full bg-volt px-8 py-3 font-medium">Get a free quote</Link>
        </Reveal>
      </section>
    </>
  );
}
