import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { getStripe } from "@/lib/stripe";

export const metadata: Metadata = {
  title: "Order Confirmed | PropertyWalk",
};

export default async function BookingSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id: sessionId } = await searchParams;

  let phone: string | null = null;
  let plan: string | null = null;
  let propertyName: string | null = null;
  let paid = false;

  if (sessionId) {
    try {
      const stripe = getStripe();
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      phone = session.metadata?.contact_phone ?? null;
      plan = session.metadata?.plan ?? null;
      propertyName = session.metadata?.property_name || null;
      paid = session.payment_status === "paid";
    } catch {
      // Session lookup failed (bad/expired id). Fall through to the generic confirmation below.
    }
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-lg flex-col items-center justify-center px-6 py-24 text-center">
      <div className="glass mx-auto flex h-14 w-14 items-center justify-center rounded-full">
        <CheckCircle2 className="h-7 w-7 text-gold" strokeWidth={1.5} />
      </div>

      <h1 className="font-display mt-6 text-3xl font-bold tracking-tight text-champagne">
        {paid ? "You're all set" : "Order received"}
      </h1>

      <p className="mt-4 text-slate-400">
        {paid
          ? "Payment confirmed. We'll have your walkthrough video ready within 24 hours."
          : "We received your order. If payment doesn't show as confirmed shortly, check your email or contact us."}
      </p>

      {(plan || propertyName || phone) && (
        <dl className="glass mt-8 w-full rounded-xl p-6 text-left text-sm">
          {plan && (
            <div className="flex justify-between border-b border-white/10 py-2 first:pt-0">
              <dt className="text-slate-400">Package</dt>
              <dd className="font-semibold capitalize text-champagne">{plan}</dd>
            </div>
          )}
          {propertyName && (
            <div className="flex justify-between border-b border-white/10 py-2">
              <dt className="text-slate-400">Property</dt>
              <dd className="font-semibold text-champagne">{propertyName}</dd>
            </div>
          )}
          {phone && (
            <div className="flex justify-between py-2 last:border-none">
              <dt className="text-slate-400">Contact number</dt>
              <dd className="font-semibold text-champagne">{phone}</dd>
            </div>
          )}
        </dl>
      )}

      <Link
        href="/"
        className="mt-10 inline-flex items-center rounded-lg bg-gold px-6 py-3 font-semibold text-slate-950 transition-shadow hover:shadow-[0_0_20px_rgba(226,185,110,0.6)]"
      >
        Back to PropertyWalk
      </Link>
    </div>
  );
}
