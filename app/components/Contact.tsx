import { Reveal } from "./Reveal";

export function Contact() {
  return (
    <section id="contact" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-xl text-center">
        <Reveal>
          <h3 className="font-display text-3xl font-bold tracking-tight text-champagne sm:text-4xl">
            Questions?
          </h3>
          <p className="mt-4 text-slate-400">
            Call or text anytime. We&apos;ll get back to you within a few hours.
          </p>
          <p className="mt-2">
            <a
              href="tel:226-577-9768"
              className="font-semibold text-champagne underline decoration-white/20 underline-offset-4 transition-colors hover:text-gold"
            >
              226 577 9768
            </a>
          </p>
          <p className="mt-6 text-sm text-slate-500">
            Based in London, Ontario &middot; 24-hour turnaround &middot; 100% satisfaction
          </p>
        </Reveal>
      </div>
    </section>
  );
}
