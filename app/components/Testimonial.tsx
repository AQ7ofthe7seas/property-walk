import { Reveal } from "./Reveal";

export function Testimonial() {
  return (
    <section className="border-b border-white/10 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-2xl">
        {/* Update with real customer feedback */}
        <Reveal>
          <div
            className="glass-gold relative overflow-hidden rounded-2xl border-l-2 border-l-gold p-8 shadow-[0_0_16px_rgba(226,185,110,0.25)]"
            style={{ "--glow-pos": "90% -20%" } as React.CSSProperties}
          >
            <div
              className="pointer-events-none absolute inset-0 bg-cover opacity-[0.14] mix-blend-luminosity"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1600&auto=format&fit=crop')",
                backgroundPosition: "center 75%",
              }}
              aria-hidden="true"
            />
            <div className="relative z-10 pl-2">
              <blockquote className="font-display text-xl font-medium leading-tight text-champagne sm:text-2xl">
                This just sold my property 10x faster. Buyers could actually see the flow
                of the house instead of guessing from static photos. Worth every penny.
              </blockquote>
              <p className="mt-6 text-sm font-semibold text-slate-400">
                Sarah M., Real Estate Agent, London ON
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
