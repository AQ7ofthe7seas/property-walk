import { Upload, Video, Download } from "lucide-react";
import { Reveal } from "./Reveal";
import { BentoCard } from "./BentoCard";

const steps = [
  {
    icon: Upload,
    photo:
      "https://images.unsplash.com/photo-1564078516393-cf04bd966897?q=80&w=1200&auto=format&fit=crop",
    index: "01",
    title: "You Send Photos",
    body: "Upload 5-8 high-quality photos from your Airbnb, MLS listing, or property. Email, Google Drive, Dropbox, whatever works.",
  },
  {
    icon: Video,
    photo:
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?q=80&w=1200&auto=format&fit=crop",
    index: "02",
    title: "We Generate Video",
    body: "We create a smooth, professional walkthrough with cinematic movement. 24-hour turnaround.",
  },
  {
    icon: Download,
    photo:
      "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?q=80&w=1200&auto=format&fit=crop",
    index: "03",
    title: "Download & Use",
    body: "Get a download link. Use it on Airbnb, Instagram, Facebook, your listing, anywhere. You own the video.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-b border-white/10 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="font-display text-3xl font-bold tracking-tight text-champagne sm:text-4xl md:text-5xl">
            How It Works
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.1}>
              <BentoCard glowPosition="20% -10%" className="h-full">
                <div
                  className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-15 mix-blend-luminosity"
                  style={{ backgroundImage: `url('${step.photo}')` }}
                  aria-hidden="true"
                />
                <div className="relative z-10 flex h-full flex-col p-8">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg border border-white/12 bg-white/5 text-champagne">
                    <step.icon className="h-6 w-6" strokeWidth={1.5} />
                  </div>
                  <span className="mb-2 text-sm font-semibold tracking-[0.1em] text-slate-400">
                    {step.index}
                  </span>
                  <h3 className="mb-2 text-xl font-bold tracking-tight text-champagne">
                    {step.title}
                  </h3>
                  <p className="text-slate-400">{step.body}</p>
                </div>
              </BentoCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
