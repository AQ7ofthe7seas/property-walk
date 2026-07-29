import { NextRequest, NextResponse } from "next/server";
import { getStripe, STRIPE_PRICE_IDS, type PlanId } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  let body: {
    plan?: string;
    propertyName?: string;
    propertyType?: string;
    name?: string;
    phone?: string;
  };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { plan, propertyName, propertyType, name, phone } = body;

  if (plan !== "starter" && plan !== "pro") {
    return NextResponse.json(
      { error: "plan must be 'starter' or 'pro'." },
      { status: 400 }
    );
  }

  const priceId = STRIPE_PRICE_IDS[plan as PlanId];
  if (!priceId) {
    return NextResponse.json(
      {
        error: `No Stripe price configured for plan '${plan}'. Set STRIPE_PRICE_${plan.toUpperCase()} in .env.local.`,
      },
      { status: 500 }
    );
  }

  if (!phone || phone.trim().length === 0) {
    return NextResponse.json({ error: "A phone number is required." }, { status: 400 });
  }

  const origin = req.headers.get("origin") ?? new URL(req.url).origin;

  // Generate a placeholder email for Stripe (which requires it)
  // Format: phone@propertywalk.local (not used for actual email communication)
  const placeholderEmail = `${phone?.replace(/\D/g, "")}@propertywalk.local`;

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: placeholderEmail,
      success_url: `${origin}/booking/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/booking`,
      metadata: {
        plan,
        property_name: propertyName ?? "",
        property_type: propertyType ?? "",
        contact_name: name ?? "",
        contact_phone: phone ?? "",
      },
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Stripe did not return a checkout URL." },
        { status: 502 }
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error creating checkout session.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
