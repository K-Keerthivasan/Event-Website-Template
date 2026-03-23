"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";
import type { TicketTier } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "Can I transfer a ticket later?",
    answer: "Yes. Transfers stay open until September 10, 2026, with self-serve reassignment from the attendee portal.",
  },
  {
    question: "Are meals or night sessions included?",
    answer: "Night sessions are included with Standard and VIP. VIP also includes dinner and hosted hospitality.",
  },
  {
    question: "Do teams get a better workflow?",
    answer: "Yes — group codes, invoice-based checkout, and post-purchase attendee assignment flows are all supported.",
  },
];

export function TicketsShowcase({ tiers }: { tiers: TicketTier[] }) {
  const [openFaq, setOpenFaq] = useState<string | null>(faqs[0]?.question ?? null);
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const router = useRouter();

  const handleCheckout = async (tierId: string) => {
    setSelectedTier(tierId);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tierId }),
      });
      if (res.ok) {
        const { url } = await res.json();
        if (url) router.push(url);
      } else {
        // Boilerplate: redirect to register page with tier pre-selected
        router.push(`/register?tier=${tierId}`);
      }
    } catch {
      router.push(`/register?tier=${tierId}`);
    } finally {
      setSelectedTier(null);
    }
  };

  return (
    <div className="space-y-12">
      {/* Ticket tier cards + QR preview */}
      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
        <div className="grid gap-6 lg:grid-cols-3">
          {tiers.map((tier) => (
            <article
              key={tier.id}
              className={cn(
                "panel-edge rounded-[2rem] border p-6",
                tier.featured ? "border-primary bg-primary pink-glow" : "border-border bg-foreground/[0.03]"
              )}
            >
              <p className={cn("text-xs uppercase tracking-[0.32em]", tier.featured ? "text-primary-foreground/70" : "text-foreground/45")}>
                {tier.name}
              </p>
              <div className="mt-5 flex items-end gap-2">
                <span className={cn("font-heading text-6xl font-black tracking-[-0.08em]", tier.featured ? "text-primary-foreground" : "text-foreground")}>
                  ${tier.price}
                </span>
                <span className={cn("pb-3 text-sm", tier.featured ? "text-primary-foreground/60" : "text-foreground/50")}>CAD</span>
              </div>
              <p className={cn("mt-4 text-sm leading-6", tier.featured ? "text-primary-foreground/75" : "text-foreground/65")}>{tier.tagline}</p>
              <ul className="mt-6 space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className={cn("text-sm", tier.featured ? "text-primary-foreground/80" : "text-foreground/70")}>
                    ✓ {feature}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => handleCheckout(tier.id)}
                disabled={selectedTier === tier.id}
                className={cn(
                  "mt-8 w-full rounded-full border px-5 py-3 text-sm font-semibold uppercase tracking-[0.26em] transition disabled:opacity-70",
                  tier.featured
                    ? "border-primary-foreground/20 bg-primary-foreground text-primary hover:opacity-90"
                    : "border-foreground/20 bg-foreground text-background hover:bg-primary hover:text-primary-foreground hover:border-primary"
                )}
              >
                {selectedTier === tier.id ? "Loading…" : `Choose ${tier.name}`}
              </button>
            </article>
          ))}
        </div>

        {/* QR Preview panel */}
        <aside className="panel-edge rounded-[2rem] border border-border bg-foreground/[0.03] p-6">
          <p className="text-xs uppercase tracking-[0.32em] text-primary">Secure Checkout</p>
          <h3 className="mt-4 font-heading text-4xl font-black uppercase text-foreground">
            Fast lane ticketing, invoice-ready flows.
          </h3>
          <p className="mt-4 max-w-sm text-sm leading-6 text-foreground/65">
            Stripe-powered checkout with tier selection. On completion your QR pass is emailed instantly.
          </p>
          <div className="mt-8 rounded-[2rem] border border-border bg-background p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-foreground/45">Voltage Pass</p>
                <p className="mt-1 font-heading text-2xl font-bold uppercase text-foreground">VIP Preview</p>
              </div>
              <div className="rounded-full border border-primary/30 bg-primary/15 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-primary">
                Encrypted
              </div>
            </div>
            <div className="mt-6 flex items-center justify-center rounded-[1.5rem] bg-white p-5">
              <QRCodeSVG value="https://voltage.k2digitalmedia.com/checkin/vip-preview" size={160} />
            </div>
          </div>
        </aside>
      </div>

      {/* Feature comparison table */}
      <div className="panel-edge rounded-[2rem] border border-border bg-foreground/[0.03] p-6">
        <p className="mb-6 text-xs uppercase tracking-[0.32em] text-primary">Feature Comparison</p>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="text-xs uppercase tracking-[0.28em] text-foreground/45">
              <tr>
                <th className="pb-4 pr-8">Feature</th>
                {tiers.map((tier) => (
                  <th key={tier.id} className={cn("pb-4 pr-8", tier.featured && "text-primary")}>
                    {tier.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-foreground/70">
              {[
                { label: "Conference Access", values: [true, true, true] },
                { label: "Night Sessions", values: [false, true, true] },
                { label: "Priority Check-in", values: [false, true, true] },
                { label: "Speaker AMA Access", values: [false, true, true] },
                { label: "VIP Studio Lounge", values: [false, false, true] },
                { label: "Founder Dinner", values: [false, false, true] },
              ].map((row) => (
                <tr key={row.label} className="border-t border-border">
                  <td className="py-4 pr-8">{row.label}</td>
                  {row.values.map((val, i) => (
                    <td key={i} className="py-4 pr-8">
                      {val ? (
                        <span className="text-[#7dff98] dark:text-[#7dff98]">✓</span>
                      ) : (
                        <span className="text-foreground/25">—</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mini FAQ */}
      <div className="panel-edge rounded-[2rem] border border-border bg-foreground/[0.03] p-6">
        <div className="mb-6">
          <p className="text-xs uppercase tracking-[0.32em] text-primary">FAQ</p>
          <h3 className="mt-3 font-heading text-3xl font-black uppercase text-foreground">Questions before checkout</h3>
        </div>
        <div className="space-y-3">
          {faqs.map((faq) => {
            const open = openFaq === faq.question;
            return (
              <div key={faq.question} className="rounded-[1.5rem] border border-border bg-background/60">
                <button
                  type="button"
                  onClick={() => setOpenFaq(open ? null : faq.question)}
                  className="flex w-full items-center justify-between px-5 py-4 text-left"
                >
                  <span className="font-heading text-xl uppercase text-foreground">{faq.question}</span>
                  <span className="text-xs uppercase tracking-[0.28em] text-foreground/40">{open ? "Hide" : "Open"}</span>
                </button>
                {open ? <p className="px-5 pb-5 text-sm leading-6 text-foreground/65">{faq.answer}</p> : null}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
