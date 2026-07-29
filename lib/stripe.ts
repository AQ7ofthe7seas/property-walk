import Stripe from "stripe";

let stripeClient: Stripe | null = null;

// Lazily constructed so the app can still build/render without STRIPE_SECRET_KEY set;
// it only throws when a checkout is actually attempted.
export function getStripe(): Stripe {
  if (!stripeClient) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      throw new Error(
        "STRIPE_SECRET_KEY is not set. Add it to .env.local (see .env.example)."
      );
    }
    stripeClient = new Stripe(key);
  }
  return stripeClient;
}

export const STRIPE_PRICE_IDS = {
  starter: process.env.STRIPE_PRICE_STARTER ?? "",
  pro: process.env.STRIPE_PRICE_PRO ?? "",
} as const;

export type PlanId = keyof typeof STRIPE_PRICE_IDS;
