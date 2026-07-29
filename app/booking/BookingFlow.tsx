"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, ArrowLeft, ArrowRight, Check, Home, Loader2, MapPin, Phone } from "lucide-react";
import Link from "next/link";

type PlanId = "starter" | "pro";

const PLANS: Record<PlanId, { name: string; price: string; blurb: string }> = {
  starter: { name: "Starter", price: "$49", blurb: "5 photos in, 1 video out" },
  pro: { name: "Pro", price: "$89", blurb: "10 photos in, 2 videos out" },
};

const STEP_LABELS = ["Package", "Property", "Contact", "Review"];

export function BookingFlow() {
  const searchParams = useSearchParams();
  const preselected = searchParams.get("plan");
  const initialPlan: PlanId | null =
    preselected === "starter" || preselected === "pro" ? preselected : null;

  const [step, setStep] = useState(0);
  const [plan, setPlan] = useState<PlanId | null>(initialPlan);
  const [propertyName, setPropertyName] = useState("");
  const [propertyType, setPropertyType] = useState("MLS listing");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const canAdvance =
    (step === 0 && plan !== null) ||
    (step === 1 && propertyName.trim().length > 0) ||
    (step === 2 && name.trim().length > 0 && phone.trim().length > 0) ||
    step === 3;

  function next() {
    if (canAdvance) setStep((s) => Math.min(s + 1, STEP_LABELS.length - 1));
  }
  function back() {
    setStep((s) => Math.max(s - 1, 0));
  }

  async function startCheckout() {
    if (!plan) return;
    setSubmitting(true);
    setCheckoutError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, propertyName, propertyType, name, phone }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.error || "Could not start checkout.");
      }
      window.location.href = data.url;
    } catch (err) {
      setCheckoutError(err instanceof Error ? err.message : "Could not start checkout.");
      setSubmitting(false);
    }
  }

  const selectedPlan = plan ? PLANS[plan] : null;

  return (
    <div className="mx-auto max-w-2xl px-6 py-16 md:py-24">
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-champagne"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to PropertyWalk
      </Link>

      <h1 className="font-display text-3xl font-bold tracking-tight text-champagne sm:text-4xl">
        Book Your Walkthrough
      </h1>

      {/* Step indicator */}
      <div className="mt-8 flex items-center gap-2">
        {STEP_LABELS.map((label, i) => (
          <div key={label} className="flex flex-1 items-center gap-2">
            <div
              className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border text-xs font-bold transition-colors ${
                i <= step
                  ? "border-gold bg-gold text-slate-950"
                  : "border-white/15 text-slate-500"
              }`}
            >
              {i < step ? <Check className="h-4 w-4" /> : i + 1}
            </div>
            {i < STEP_LABELS.length - 1 && (
              <div
                className={`h-px flex-1 transition-colors ${
                  i < step ? "bg-gold" : "bg-white/10"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <div className="glass-gold relative mt-8 min-h-[320px] overflow-hidden rounded-2xl p-8">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="plan"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="mb-6 text-lg font-semibold text-champagne">Choose your package</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {(Object.keys(PLANS) as PlanId[]).map((id) => {
                  const p = PLANS[id];
                  const active = plan === id;
                  return (
                    <motion.button
                      key={id}
                      onClick={() => setPlan(id)}
                      whileHover={{ y: -2, scale: 1.01 }}
                      whileTap={{ y: 0, scale: 0.99 }}
                      className={`rounded-xl border p-5 text-left transition-colors ${
                        active
                          ? "border-gold bg-gold/10"
                          : "border-white/12 hover:border-white/25"
                      }`}
                    >
                      <p className="font-semibold text-champagne">{p.name}</p>
                      <p className="text-shine font-display mt-1 text-3xl font-bold">
                        {p.price}
                      </p>
                      <p className="mt-2 text-sm text-slate-400">{p.blurb}</p>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="property"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="mb-6 flex items-center gap-2 text-lg font-semibold text-champagne">
                <Home className="h-5 w-5 text-gold" />
                Property details
              </h2>
              <label className="mb-1 block text-sm font-medium text-slate-300">
                Property nickname or address
              </label>
              <input
                value={propertyName}
                onChange={(e) => setPropertyName(e.target.value)}
                placeholder="e.g. 42 Maple St, or “Downtown Loft”"
                className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-champagne placeholder:text-slate-500 outline-none transition-colors focus:border-gold"
              />
              <label className="mb-1 mt-5 block text-sm font-medium text-slate-300">
                Listing type
              </label>
              <div className="flex flex-wrap gap-2">
                {["MLS listing", "Airbnb", "Other rental"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setPropertyType(t)}
                    className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                      propertyType === t
                        ? "border-gold bg-gold/10 text-champagne"
                        : "border-white/15 text-slate-400 hover:border-white/30"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="mb-6 flex items-center gap-2 text-lg font-semibold text-champagne">
                <Phone className="h-5 w-5 text-gold" />
                Your contact info
              </h2>
              <label className="mb-1 block text-sm font-medium text-slate-300">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jordan Casey"
                className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-champagne placeholder:text-slate-500 outline-none transition-colors focus:border-gold"
              />
              <label className="mb-1 mt-5 block text-sm font-medium text-slate-300">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="226 577 9768"
                className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-champagne placeholder:text-slate-500 outline-none transition-colors focus:border-gold"
              />
              <p className="mt-3 text-xs text-slate-500">
                We&apos;ll call or text you with delivery updates.
              </p>
            </motion.div>
          )}

          {step === 3 && selectedPlan && (
            <motion.div
              key="review"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="mb-6 text-lg font-semibold text-champagne">Review your order</h2>
              <dl className="flex flex-col gap-4 text-sm">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <dt className="text-slate-400">Package</dt>
                  <dd className="font-semibold text-champagne">
                    {selectedPlan.name} &middot; {selectedPlan.price}
                  </dd>
                </div>
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <dt className="flex items-center gap-1.5 text-slate-400">
                    <MapPin className="h-4 w-4" /> Property
                  </dt>
                  <dd className="font-semibold text-champagne">
                    {propertyName} ({propertyType})
                  </dd>
                </div>
                <div className="flex items-center justify-between pb-2">
                  <dt className="text-slate-400">Contact</dt>
                  <dd className="text-right font-semibold text-champagne">
                    {name}
                    <br />
                    <span className="font-normal text-slate-400">{phone}</span>
                  </dd>
                </div>
              </dl>

              {checkoutError && (
                <div className="mt-6 flex items-start gap-2 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
                  <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  {checkoutError}
                </div>
              )}

              <motion.div
                className="mt-8"
                whileHover={submitting ? undefined : { y: -2, scale: 1.01 }}
                whileTap={submitting ? undefined : { y: 0, scale: 0.98 }}
              >
                <button
                  onClick={startCheckout}
                  disabled={submitting}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-gold px-6 py-4 font-semibold text-slate-950 transition-shadow hover:shadow-[0_0_20px_rgba(226,185,110,0.6)] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                  {submitting ? "Redirecting to Stripe…" : "Continue to Payment"}
                </button>
              </motion.div>
              <p className="mt-3 text-center text-xs text-slate-500">
                You&apos;ll complete payment securely via Stripe Checkout.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {step < 3 && (
        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={back}
            disabled={step === 0}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 transition-colors hover:text-champagne disabled:opacity-0"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
          <motion.button
            onClick={next}
            disabled={!canAdvance}
            whileHover={canAdvance ? { y: -2, scale: 1.02 } : undefined}
            whileTap={canAdvance ? { y: 0, scale: 0.98 } : undefined}
            className="inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-3 font-semibold text-slate-950 transition-opacity disabled:cursor-not-allowed disabled:opacity-30"
          >
            Continue
            <ArrowRight className="h-4 w-4" />
          </motion.button>
        </div>
      )}
    </div>
  );
}
