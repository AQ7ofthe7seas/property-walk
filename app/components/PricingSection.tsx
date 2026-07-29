"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Minus, Plus } from "lucide-react";
import Link from "next/link";
import { Reveal } from "./Reveal";
import { BentoCard } from "./BentoCard";
import { PricingModal, type PricingPlan } from "./PricingModal";

const STARTER_PRICE = 49;
const PRO_PRICE = 89;
const PRO_VIDEOS = 2;

const plans: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    price: "$49",
    tagline: "5 Photos → 1 Video",
    features: [
      "5 photos in, 1 video out",
      "24-hour turnaround",
      "You own the video",
      "Perfect for one listing or property",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: "$89",
    tagline: "10 Photos → 2 Videos",
    features: [
      "10 photos in, 2 videos out",
      "24-hour turnaround",
      "You own every video",
      "Two properties, or multiple edits of the same property",
    ],
  },
];

export function PricingSection() {
  const [activePlan, setActivePlan] = useState<PricingPlan | null>(null);
  const [properties, setProperties] = useState(1);

  const starterTotal = properties * STARTER_PRICE;
  const proBundles = Math.ceil(properties / PRO_VIDEOS);
  const proTotal = proBundles * PRO_PRICE;
  const worthSwitching = properties >= 2 && proTotal < starterTotal;

  return (
    <section id="pricing" className="border-b border-white/10 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="font-display text-3xl font-bold tracking-tight text-champagne sm:text-4xl md:text-5xl">
            Simple Pricing
          </h2>
        </Reveal>

        {/* Dynamic estimator: recalculates against both tiers as you change volume */}
        <Reveal delay={0.05}>
          <div className="glass mt-8 flex flex-col items-start gap-4 rounded-2xl p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-semibold text-champagne">How many properties this month?</p>
              <p className="text-sm text-slate-400">
                We&apos;ll estimate your total on Starter vs. Pro pricing.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setProperties((n) => Math.max(1, n - 1))}
                aria-label="Decrease properties"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-champagne transition-colors hover:border-gold/60"
              >
                <Minus className="h-4 w-4" />
              </button>
              <motion.span
                key={properties}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-6 text-center font-display text-xl font-bold text-champagne"
              >
                {properties}
              </motion.span>
              <button
                onClick={() => setProperties((n) => Math.min(20, n + 1))}
                aria-label="Increase properties"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-champagne transition-colors hover:border-gold/60"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-400">
                Starter: <span className="text-champagne">${starterTotal}</span>
              </p>
              <p className="text-sm text-slate-400">
                Pro: <span className="text-champagne">${proTotal}</span>
                {worthSwitching && (
                  <span className="ml-2 text-gold">cheaper on Pro</span>
                )}
              </p>
            </div>
          </div>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {plans.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 0.1}>
              <BentoCard glowPosition="15% -10%" className="h-full">
                <div className="flex h-full flex-col p-8">
                  <h3 className="text-xl font-bold text-champagne">{plan.name}</h3>
                  <div className="text-shine font-display mt-2 mb-6 text-4xl font-bold sm:text-5xl">
                    {plan.price}
                  </div>
                  <ul className="mb-6 flex flex-1 flex-col gap-3">
                    {plan.features.slice(0, 3).map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm text-slate-400">
                        <Check className="mt-0.5 h-[18px] w-[18px] flex-shrink-0 text-gold" strokeWidth={2} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-col gap-3">
                    <motion.div whileHover={{ y: -2, scale: 1.01 }} whileTap={{ y: 0, scale: 0.98 }}>
                      <Link
                        href={`/booking?plan=${plan.id}`}
                        className="flex w-full items-center justify-center rounded-lg bg-gold px-6 py-4 font-semibold text-slate-950 transition-shadow hover:shadow-[0_0_20px_rgba(226,185,110,0.6)]"
                      >
                        Order Now
                      </Link>
                    </motion.div>
                    <button
                      onClick={() => setActivePlan(plan)}
                      className="text-sm font-semibold text-slate-400 underline decoration-white/20 underline-offset-4 transition-colors hover:text-champagne"
                    >
                      View full breakdown
                    </button>
                  </div>
                </div>
              </BentoCard>
            </Reveal>
          ))}
        </div>
      </div>

      <PricingModal plan={activePlan} onClose={() => setActivePlan(null)} />
    </section>
  );
}
