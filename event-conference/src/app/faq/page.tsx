import { SiteShell } from "@/components/site-shell";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Link from "next/link";

const categories = [
  {
    label: "Tickets & Registration",
    faqs: [
      {
        q: "What ticket tiers are available?",
        a: "We offer three tiers: Early Bird ($249 CAD), Standard ($399 CAD), and VIP ($799 CAD). Each tier includes different levels of access, session types, and perks.",
      },
      {
        q: "Can I transfer my ticket to someone else?",
        a: "Yes. Self-serve ticket transfers are available until September 10, 2026 via the attendee portal. After that date, transfers require manual approval by our team.",
      },
      {
        q: "Is there a group or team discount?",
        a: "Yes — teams of 4 or more qualify for group pricing. Email team@voltagesummit.com with your headcount for a custom invoice-based checkout.",
      },
      {
        q: "What's your refund policy?",
        a: "Full refunds are available up to 60 days before the event (July 19, 2026). After that, tickets are non-refundable but fully transferable.",
      },
      {
        q: "Do I get a physical ticket or pass?",
        a: "Your ticket is a digital QR pass emailed upon purchase. Present it on your phone or a printed copy at check-in. VIP passes include a printed lanyard badge.",
      },
    ],
  },
  {
    label: "Access & Sessions",
    faqs: [
      {
        q: "What's included with each tier?",
        a: "Early Bird: 3-day general admission, all main stage and track sessions, partner lounge, and digital replay pass. Standard adds priority check-in, Speaker AMAs, and night sessions. VIP adds the studio lounge, founder dinner, front-row seating, and gifting.",
      },
      {
        q: "Are night sessions included?",
        a: "Night sessions (After Dark track, Warehouse 3 programming) are included with Standard and VIP tickets. Early Bird holders can purchase night session add-ons separately.",
      },
      {
        q: "Can I attend any session I want?",
        a: "Yes — all ticketed sessions are open seating within your tier's access level. Seating is first-come, first-seated except for VIP reserved areas.",
      },
      {
        q: "Is the event filmed or live-streamed?",
        a: "Main Stage keynotes will be live-streamed for a limited audience. All ticket holders receive a digital replay pass covering Main Stage content within 30 days post-event.",
      },
    ],
  },
  {
    label: "Venue & Logistics",
    faqs: [
      {
        q: "Where exactly is the event held?",
        a: "The event spans two connected venues: The Bentway (under the Gardiner Expressway at Bathurst) and Stackt Market. Both are at 250 Fort York Blvd, Toronto, ON.",
      },
      {
        q: "What time do doors open each day?",
        a: "Doors open at 8:30am each day. Programming starts at 9:00am Day 1, 9:30am Day 2, and 9:15am Day 3. Night programming typically runs 6pm–midnight.",
      },
      {
        q: "Is there food and drink at the venue?",
        a: "Yes — Stackt Market vendors will operate throughout the event. VIP holders have catered access to the Studio Lounge. Founder Dinner is a plated sit-down on Day 2 evening.",
      },
      {
        q: "Is there parking available?",
        a: "There is a surface lot at Stackt Market plus several Green P garages within a 5-minute walk. We strongly recommend transit — TTC King streetcar stops at the venue entrance.",
      },
    ],
  },
  {
    label: "Speakers & Content",
    faqs: [
      {
        q: "How are speakers selected?",
        a: "Speakers are curated by K2 Digital Media's editorial team with a focus on actionability, energy, and cross-industry relevance. We don't sell speaker slots.",
      },
      {
        q: "Can I submit a talk proposal?",
        a: "Proposal submissions open in January 2026 at voltagesummit.com/speak. We review all proposals and prioritize first-time conference speakers with strong POVs.",
      },
      {
        q: "Will all speaker sessions be recorded?",
        a: "Main Stage sessions will be recorded. Breakout and track sessions are not recorded by default, preserving the intimacy of smaller room formats.",
      },
    ],
  },
  {
    label: "Sponsorships & Partners",
    faqs: [
      {
        q: "How can my company become a sponsor?",
        a: "Sponsorship decks and partnership tiers are available at voltagesummit.com/sponsor or by emailing partnerships@voltagesummit.com.",
      },
      {
        q: "What sponsorship tiers are available?",
        a: "We offer Title, Track, Experience, and Community sponsor categories. Each comes with different activation rights, visibility, and networking access.",
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <SiteShell>
      <main className="px-6 py-16 lg:px-10">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-16">
            <p className="text-xs uppercase tracking-[0.42em] text-primary">FAQ</p>
            <h1 className="mt-4 font-heading text-5xl font-black uppercase text-foreground md:text-7xl">
              Everything you need to know.
            </h1>
            <p className="mt-5 text-lg leading-8 text-foreground/65">
              Answers to the most common questions about Voltage Summit 2026. Can&apos;t find what you&apos;re looking for?
              Email{" "}
              <a href="mailto:hello@voltagesummit.com" className="text-primary hover:underline">
                hello@voltagesummit.com
              </a>
            </p>
          </div>

          {/* FAQ categories */}
          <div className="space-y-12">
            {categories.map((category) => (
              <section key={category.label}>
                <p className="mb-5 text-xs uppercase tracking-[0.32em] text-primary">{category.label}</p>
                <Accordion className="border-border">
                  {category.faqs.map((faq, i) => (
                    <AccordionItem key={i} value={`${category.label}-${i}`}>
                      <AccordionTrigger className="font-heading text-xl uppercase text-foreground hover:no-underline">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-foreground/65 leading-7">{faq.a}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>
            ))}
          </div>

          {/* Still have questions CTA */}
          <div className="mt-20 panel-edge rounded-[2rem] border border-border bg-foreground/[0.03] p-8 text-center">
            <p className="text-xs uppercase tracking-[0.42em] text-primary">Still Have Questions?</p>
            <h2 className="mt-4 font-heading text-4xl font-black uppercase text-foreground">We&apos;re here.</h2>
            <p className="mx-auto mt-4 max-w-md text-foreground/60">
              Our team typically responds within one business day. For urgent or VIP matters, use the priority line.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href="mailto:hello@voltagesummit.com"
                className="rounded-full bg-primary px-8 py-4 text-sm font-semibold uppercase tracking-[0.28em] text-primary-foreground transition hover:opacity-85"
              >
                Email Us
              </a>
              <Link
                href="/register"
                className="rounded-full border border-border px-8 py-4 text-sm font-semibold uppercase tracking-[0.28em] text-foreground/65 transition hover:border-foreground/40 hover:text-foreground"
              >
                Buy Tickets
              </Link>
            </div>
          </div>
        </div>
      </main>
    </SiteShell>
  );
}
