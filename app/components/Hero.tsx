"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import Link from "next/link";

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 220, damping: 26 },
  },
};

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden border-b border-white/10 px-6 py-24 text-center">
      <div
        className="pointer-events-none absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2500&auto=format&fit=crop')] bg-cover bg-center opacity-15 mix-blend-luminosity"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 50% 35%, transparent 0%, #020617 88%)",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-1/4 left-1/2 h-[700px] w-[min(1100px,140vw)] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 50% 0%, rgba(226,185,110,0.25), transparent 70%)",
        }}
        aria-hidden="true"
      />

      <motion.div
        variants={reduced ? undefined : container}
        initial={reduced ? undefined : "hidden"}
        animate={reduced ? undefined : "show"}
        className="relative z-10 mx-auto max-w-3xl"
      >
        <motion.div
          variants={reduced ? undefined : item}
          className="glass mb-8 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-slate-300"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </span>
          24-Hour Turnaround &middot; London, Ontario
        </motion.div>

        <motion.h1
          variants={reduced ? undefined : item}
          className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-champagne sm:text-6xl md:text-7xl"
        >
          PropertyWalk
        </motion.h1>

        <motion.p
          variants={reduced ? undefined : item}
          className="mx-auto mt-6 max-w-md text-lg text-slate-300 sm:text-xl"
        >
          Professional Property Walkthrough Videos
        </motion.p>

        <motion.div variants={reduced ? undefined : item} className="mt-10">
          <motion.div
            className="inline-block"
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ y: -1, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
          >
            <Link
              href="/booking"
              className="inline-flex items-center rounded-lg bg-gold px-8 py-4 font-semibold text-slate-950 transition-shadow hover:shadow-[0_0_20px_rgba(226,185,110,0.6)]"
            >
              Get Your Video
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
