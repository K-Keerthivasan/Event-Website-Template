import { SiteShell } from "@/components/site-shell";
import { TicketsShowcase } from "@/components/tickets-showcase";
import { getMarketingData } from "@/lib/supabase/mock";

export default async function TicketsPage() {
  const { ticketTiers } = await getMarketingData();

  return (
    <SiteShell>
      <main className="px-6 py-16 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-3xl">
            <p className="text-xs uppercase tracking-[0.32em] text-primary">Tickets</p>
            <h1 className="mt-4 font-heading text-5xl font-black uppercase text-foreground md:text-7xl">
              Price the energy. Protect the premium.
            </h1>
            <p className="mt-5 text-lg leading-8 text-foreground/65">
              Three tiers, side-by-side comparison, and a secure Stripe checkout with QR pass on completion.
            </p>
          </div>
          <TicketsShowcase tiers={ticketTiers} />
        </div>
      </main>
    </SiteShell>
  );
}
