import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * POST /api/webhook
 *
 * Stripe webhook handler. On successful checkout:
 *   1. Saves the registration to Supabase
 *   2. Generates a unique QR ticket code
 *   3. Sends the ticket email via Resend
 *
 * Required env vars:
 *   STRIPE_SECRET_KEY         — Stripe secret key
 *   STRIPE_WEBHOOK_SECRET     — Stripe webhook signing secret (whsec_…)
 *   SUPABASE_URL              — Supabase project URL
 *   SUPABASE_SERVICE_ROLE_KEY — Supabase service role key
 *   RESEND_API_KEY            — Resend API key
 *   RESEND_FROM_EMAIL         — e.g. "Voltage Summit <tickets@voltagesummit.com>"
 *   NEXT_PUBLIC_SITE_URL      — e.g. https://voltagesummit.com
 *
 * Configure webhook in Stripe Dashboard:
 *   Endpoint URL: https://your-domain.com/api/webhook
 *   Events to listen: checkout.session.completed
 */

// Map Stripe price IDs → ticket tier names
const TIER_NAMES: Record<string, string> = {
  [process.env.STRIPE_PRICE_EARLY_BIRD ?? "__early_bird"]: "Early Bird",
  [process.env.STRIPE_PRICE_STANDARD ?? "__standard"]: "Standard",
  [process.env.STRIPE_PRICE_VIP ?? "__vip"]: "VIP",
};

function generateTicketCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "VS26-";
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ received: true, note: "Stripe not configured" });
  }

  let event;
  try {
    const Stripe = (await import("stripe")).default;
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2025-02-24.acacia",
    });
    event = stripe.webhooks.constructEvent(body, signature!, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Webhook signature verification failed";
    console.error("[/api/webhook] Signature error:", message);
    return NextResponse.json({ error: message }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const { tierId, name, company } = session.metadata ?? {};
    const email = session.customer_email ?? "";
    const priceId = session.line_items?.data[0]?.price?.id ?? "";
    const ticketType = TIER_NAMES[priceId] ?? tierId ?? "General";
    const ticketCode = generateTicketCode();
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://voltagesummit.com";

    // ── Save to Supabase ─────────────────────────────────────────────────────
    if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const { createClient } = await import("@supabase/supabase-js");
      const supabase = createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY
      );

      const { error } = await supabase.from("registrations").insert({
        stripe_session_id: session.id,
        ticket_code: ticketCode,
        name,
        email,
        company,
        ticket_type: ticketType,
        tier_id: tierId,
        amount_paid: (session.amount_total ?? 0) / 100,
        checked_in: false,
        created_at: new Date().toISOString(),
      });

      if (error) {
        console.error("[/api/webhook] Supabase insert error:", error.message);
      }
    }

    // ── Send ticket email via Resend ─────────────────────────────────────────
    if (process.env.RESEND_API_KEY && email) {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);
      const from = process.env.RESEND_FROM_EMAIL ?? "Voltage Summit <tickets@voltagesummit.com>";
      const checkinUrl = `${siteUrl}/checkin/${ticketCode}`;

      await resend.emails.send({
        from,
        to: email,
        subject: `Your Voltage Summit 2026 Ticket — ${ticketType}`,
        html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Voltage Summit 2026 Ticket</title></head>
<body style="margin:0;padding:0;background:#050505;font-family:'Helvetica Neue',Arial,sans-serif;color:#ffffff;">
  <div style="max-width:600px;margin:0 auto;padding:40px 24px;">
    <div style="margin-bottom:32px;">
      <p style="margin:0;color:#ff2d78;font-size:11px;letter-spacing:0.4em;text-transform:uppercase;">K2 Digital Media</p>
      <h1 style="margin:12px 0 0;font-size:48px;font-weight:900;text-transform:uppercase;letter-spacing:-0.06em;line-height:1;">Voltage<br>Summit</h1>
    </div>

    <div style="background:#0d0d0d;border:1px solid rgba(255,255,255,0.12);border-radius:24px;padding:32px;margin-bottom:24px;">
      <p style="margin:0 0 8px;color:rgba(255,255,255,0.45);font-size:11px;letter-spacing:0.32em;text-transform:uppercase;">Your Ticket</p>
      <h2 style="margin:0 0 4px;font-size:28px;font-weight:900;text-transform:uppercase;">${name ?? "Attendee"}</h2>
      <p style="margin:0;color:rgba(255,255,255,0.6);">${ticketType} · Voltage Summit 2026</p>
      <div style="margin:24px 0;padding:20px;background:#ffffff;border-radius:16px;text-align:center;">
        <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(checkinUrl)}" width="200" height="200" alt="QR Code" style="display:block;margin:0 auto;" />
      </div>
      <div style="background:#0a0a0a;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:16px;text-align:center;">
        <p style="margin:0 0 4px;color:rgba(255,255,255,0.4);font-size:10px;letter-spacing:0.3em;text-transform:uppercase;">Ticket Code</p>
        <p style="margin:0;font-size:28px;font-weight:900;letter-spacing:0.15em;">${ticketCode}</p>
      </div>
    </div>

    <div style="background:#0d0d0d;border:1px solid rgba(255,255,255,0.12);border-radius:24px;padding:32px;margin-bottom:24px;">
      <p style="margin:0 0 16px;color:#ff2d78;font-size:11px;letter-spacing:0.32em;text-transform:uppercase;">Event Details</p>
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:8px 0;color:rgba(255,255,255,0.45);font-size:12px;letter-spacing:0.2em;text-transform:uppercase;width:120px;">Dates</td><td style="color:#fff;">September 18–20, 2026</td></tr>
        <tr><td style="padding:8px 0;color:rgba(255,255,255,0.45);font-size:12px;letter-spacing:0.2em;text-transform:uppercase;">Venue</td><td style="color:#fff;">The Bentway + Stackt Market, Toronto</td></tr>
        <tr><td style="padding:8px 0;color:rgba(255,255,255,0.45);font-size:12px;letter-spacing:0.2em;text-transform:uppercase;">Doors</td><td style="color:#fff;">8:30am daily, September 18–20</td></tr>
        <tr><td style="padding:8px 0;color:rgba(255,255,255,0.45);font-size:12px;letter-spacing:0.2em;text-transform:uppercase;">Tier</td><td style="color:#fff;">${ticketType}</td></tr>
      </table>
    </div>

    <p style="color:rgba(255,255,255,0.35);font-size:12px;line-height:1.6;">
      Questions? Email <a href="mailto:hello@voltagesummit.com" style="color:#ff2d78;">hello@voltagesummit.com</a><br>
      Ticket transfers available until September 10, 2026 via the attendee portal.
    </p>
  </div>
</body>
</html>`,
      });
    }
  }

  return NextResponse.json({ received: true });
}
