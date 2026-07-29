"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function Nav() {
  return (
    <header className="glass sticky top-0 z-50 h-18 border-b border-white/10">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="font-body text-sm font-semibold tracking-[0.2em] text-champagne uppercase"
        >
          PropertyWalk
        </Link>
        <motion.div whileHover={{ y: -2, scale: 1.02 }} whileTap={{ y: 0, scale: 0.98 }}>
          <Link
            href="/booking"
            className="inline-flex items-center rounded-lg border border-white/15 px-4 py-2 text-sm font-semibold text-champagne transition-colors hover:border-gold/60 hover:bg-gold hover:text-slate-950"
          >
            Order Now
          </Link>
        </motion.div>
      </div>
    </header>
  );
}
