import { ScheduleExplorer } from "@/components/schedule-explorer";
import { SiteShell } from "@/components/site-shell";
import { getMarketingData } from "@/lib/supabase/mock";

export default async function SchedulePage() {
  const { schedule, speakers } = await getMarketingData();

  return (
    <SiteShell>
      <main className="px-6 py-16 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-3xl">
            <p className="text-xs uppercase tracking-[0.32em] text-primary">Schedule</p>
            <h1 className="mt-4 font-heading text-5xl font-black uppercase text-foreground md:text-7xl">
              Three days. Four tracks. Twenty moments.
            </h1>
            <p className="mt-5 text-lg leading-8 text-foreground/65">
              Switch days, filter by track, and preview the exact pacing of the event.
            </p>
          </div>
          <ScheduleExplorer talks={schedule} speakers={speakers} />
        </div>
      </main>
    </SiteShell>
  );
}
