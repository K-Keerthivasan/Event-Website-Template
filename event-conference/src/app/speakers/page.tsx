import { SiteShell } from "@/components/site-shell";
import { SpeakersGrid } from "@/components/speakers-grid";
import { getMarketingData } from "@/lib/supabase/mock";

export default async function SpeakersPage() {
  const { speakers } = await getMarketingData();

  return (
    <SiteShell>
      <main className="px-6 py-16 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-3xl">
            <p className="text-xs uppercase tracking-[0.32em] text-primary">Speakers</p>
            <h1 className="mt-4 font-heading text-5xl font-black uppercase text-foreground md:text-7xl">
              Builders, operators, designers, producers.
            </h1>
            <p className="mt-5 text-lg leading-8 text-foreground/65">
              Twelve speakers with biographies, talk titles, and social links.
            </p>
          </div>
          <SpeakersGrid speakers={speakers} />
        </div>
      </main>
    </SiteShell>
  );
}
