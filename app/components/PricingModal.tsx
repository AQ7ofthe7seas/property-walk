"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export type PricingPlan = {
  id: "starter" | "pro";
  name: string;
  price: string;
  tagline: string;
  features: string[];
};

export function PricingModal({
  plan,
  onClose,
}: {
  plan: PricingPlan | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!plan) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [plan, onClose]);

  return (
    <>
      {plan && (
        <motion.div
          key="pricing-modal-backdrop"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-6 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={onClose}
          role="presentation"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="pricing-modal-title"
            className="glass-gold relative w-full max-w-md overflow-hidden rounded-2xl p-8"
            style={{ "--glow-pos": "80% -10%" } as React.CSSProperties}
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              aria-label="Close breakdown"
              className="absolute right-5 top-5 z-10 text-slate-400 transition-colors hover:text-champagne"
            >
              <X className="h-5 w-5" />
            </button>

            <span className="text-sm font-semibold uppercase tracking-[0.1em] text-slate-400">
              {plan.name} plan
            </span>
            <h3
              id="pricing-modal-title"
              className="text-shine font-display mt-1 text-4xl font-bold"
            >
              {plan.price}
            </h3>
            <p className="mt-2 text-slate-400">{plan.tagline}</p>

            <ul className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-6">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-slate-300">
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold" strokeWidth={2} />
                  {f}
                </li>
              ))}
            </ul>

            <motion.div
              className="mt-8"
              whileHover={{ y: -2, scale: 1.01 }}
              whileTap={{ y: 0, scale: 0.98 }}
            >
              <Link
                href={`/booking?plan=${plan.id}`}
                className="flex w-full items-center justify-center rounded-lg bg-gold px-6 py-4 font-semibold text-slate-950 transition-shadow hover:shadow-[0_0_20px_rgba(226,185,110,0.6)]"
              >
                Order Now
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
