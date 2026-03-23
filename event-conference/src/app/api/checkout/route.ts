import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * POST /api/checkout
 *
 * Creates a Stripe Checkout Session for the selected ticket tier.
 *
 * Required env vars:
 *   STRIPE_SECRET_KEY        — Stripe secret key (sk_live_… or sk_test_…)
 *   NEXT_PUBLIC_SITE_URL     — e.g. https://voltagesummit.com
 *
 * Install: npm install stripe
 */

// Stripe price IDs mapped to ticket tier IDs.
// Create these products in your Stripe Dashboard and paste the Price IDs here.
const STRIPE_PRICE_IDS: Record<string, string> = {
  "early-bird": process.env.STRIPE_PRICE_EARLY_BIRD ?? "",
  standard: process.env.STRIPE_PRICE_STANDARD ?? "",
  vip: process.env.STRIPE_PRICE_VIP ?? "",
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tierId, email, name, company } = body as {
      tierId: string;
      email?: string;
      name?: string;
      company?: string;
    };

    const priceId = STRIPE_PRICE_IDS[tierId];

    if (!priceId) {
      return NextResponse.json({ error: "Invalid ticket tier" }, { status: 400 });
    }

    if (!process.env.STRIPE_SECRET_KEY) {
      // Boilerplate mode: return a mock response so the register page
      // can show the confirmation UI without Stripe configured.
      return NextResponse.json({ url: null, mock: true }, { status: 200 });
    }

    // Dynamic import so the build doesn't fail if 'stripe' isn't installed yet.
    const Stripe = (await import("stripe")).default;
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2025-02-24.acacia",
    });

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: email,
      metadata: {
        tierId,
        name: name ?? "",
        company: company ?? "",
      },
      success_url: `${siteUrl}/register/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/register?tier=${tierId}`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal server error";
    console.error("[/api/checkout]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
