"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ImagePlus, Loader2, Play, RotateCcw, X } from "lucide-react";
import Link from "next/link";
import { Reveal } from "./Reveal";

type Stage = "empty" | "staged" | "processing" | "ready";

const MAX_PHOTOS = 8;

export function VideoPreviewBuilder() {
  const [photos, setPhotos] = useState<{ url: string; name: string }[]>([]);
  const [stage, setStage] = useState<Stage>("empty");
  const inputRef = useRef<HTMLInputElement>(null);

  // Revoke object URLs on change/unmount so this doesn't leak memory as photos are swapped in and out.
  useEffect(() => {
    return () => {
      photos.forEach((p) => URL.revokeObjectURL(p.url));
    };
  }, [photos]);

  function handleFiles(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return;
    const files = Array.from(fileList)
      .filter((f) => f.type.startsWith("image/"))
      .slice(0, MAX_PHOTOS);
    const next = files.map((f) => ({ url: URL.createObjectURL(f), name: f.name }));
    setPhotos(next);
    setStage(next.length > 0 ? "staged" : "empty");
  }

  function reset() {
    setPhotos([]);
    setStage("empty");
    if (inputRef.current) inputRef.current.value = "";
  }

  function runPreview() {
    setStage("processing");
    // Client-side only: this simulates the pacing of a render, it does not call any video generation service.
    window.setTimeout(() => setStage("ready"), 2200);
  }

  return (
    <section id="preview" className="border-b border-white/10 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <h2 className="font-display text-3xl font-bold tracking-tight text-champagne sm:text-4xl md:text-5xl">
            Try the Preview Builder
          </h2>
          <p className="mt-4 max-w-xl text-lg text-slate-400">
            Drop in a few photos to see how your walkthrough will be staged. This is a
            visual preview, not the final render, your real video comes back in 24 hours.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="glass-gold relative mt-10 overflow-hidden rounded-2xl p-8">
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => handleFiles(e.target.files)}
            />

            <AnimatePresence mode="wait">
              {stage === "empty" && (
                <motion.button
                  key="empty"
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="flex w-full flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-white/20 py-16 text-center transition-colors hover:border-gold/50"
                >
                  <ImagePlus className="h-10 w-10 text-slate-400" strokeWidth={1.5} />
                  <span className="text-champagne font-semibold">
                    Click to select listing photos
                  </span>
                  <span className="text-sm text-slate-500">
                    Up to {MAX_PHOTOS} images, staged locally in your browser
                  </span>
                </motion.button>
              )}

              {stage === "staged" && (
                <motion.div
                  key="staged"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="mb-6 grid grid-cols-3 gap-3 sm:grid-cols-4">
                    {photos.map((p, i) => (
                      <motion.div
                        key={p.url}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05, type: "spring", stiffness: 260, damping: 22 }}
                        className="relative aspect-square overflow-hidden rounded-lg border border-white/10"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={p.url}
                          alt={`Listing photo ${i + 1}`}
                          className="h-full w-full object-cover"
                        />
                      </motion.div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <motion.button
                      whileHover={{ y: -2, scale: 1.02 }}
                      whileTap={{ y: 0, scale: 0.98 }}
                      onClick={runPreview}
                      className="inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-3 font-semibold text-slate-950 transition-shadow hover:shadow-[0_0_20px_rgba(226,185,110,0.6)]"
                    >
                      <Play className="h-4 w-4" strokeWidth={2} />
                      Stage Preview
                    </motion.button>
                    <button
                      onClick={reset}
                      className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-6 py-3 font-semibold text-slate-300 transition-colors hover:border-white/30"
                    >
                      <X className="h-4 w-4" strokeWidth={2} />
                      Clear
                    </button>
                  </div>
                </motion.div>
              )}

              {stage === "processing" && (
                <motion.div
                  key="processing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center gap-4 py-16 text-center"
                >
                  <Loader2 className="h-10 w-10 animate-spin text-gold" strokeWidth={1.5} />
                  <span className="text-champagne font-semibold">Staging your preview&hellip;</span>
                </motion.div>
              )}

              {stage === "ready" && (
                <motion.div
                  key="ready"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center gap-6 py-6 text-center"
                >
                  <div className="relative mx-auto w-full max-w-[220px] overflow-hidden rounded-[28px] border border-white/25 bg-black shadow-[0_0_60px_rgba(226,185,110,0.25)]">
                    <div className="relative aspect-[9/16] w-full">
                      {photos[0] && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={photos[0].url}
                          alt="Staged preview frame"
                          className="h-full w-full object-cover opacity-70"
                        />
                      )}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur">
                          <Play className="h-6 w-6 translate-x-0.5 text-champagne" strokeWidth={2} />
                        </div>
                      </div>
                      <span className="glass absolute left-4 top-4 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-champagne">
                        Preview
                      </span>
                    </div>
                  </div>
                  <p className="max-w-sm text-sm text-slate-400">
                    That&apos;s the staging order your video will follow. Order now and we&apos;ll
                    deliver the real cinematic walkthrough within 24 hours.
                  </p>
                  <div className="flex flex-wrap justify-center gap-3">
                    <motion.div whileHover={{ y: -2, scale: 1.02 }} whileTap={{ y: 0, scale: 0.98 }}>
                      <Link
                        href="/booking"
                        className="inline-flex items-center rounded-lg bg-gold px-6 py-3 font-semibold text-slate-950 transition-shadow hover:shadow-[0_0_20px_rgba(226,185,110,0.6)]"
                      >
                        Order This Video
                      </Link>
                    </motion.div>
                    <button
                      onClick={reset}
                      className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-6 py-3 font-semibold text-slate-300 transition-colors hover:border-white/30"
                    >
                      <RotateCcw className="h-4 w-4" strokeWidth={2} />
                      Start Over
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
