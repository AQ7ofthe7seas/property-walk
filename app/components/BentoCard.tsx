"use client";

import { motion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function BentoCard({
  children,
  className,
  glowPosition = "20% -10%",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  glowPosition?: string;
  as?: "div" | "article";
}) {
  return (
    <motion.div
      className={cn(
        "glass-gold glass-gold-hover relative overflow-hidden rounded-2xl transition-shadow duration-300",
        className
      )}
      style={{ "--glow-pos": glowPosition } as CSSProperties}
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ y: -1, scale: 0.995 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
    >
      <Tag className="relative z-10 h-full">{children}</Tag>
    </motion.div>
  );
}
