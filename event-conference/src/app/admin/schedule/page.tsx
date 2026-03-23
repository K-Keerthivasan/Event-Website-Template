import { ScheduleManager } from "@/components/admin/schedule-manager";
import { getScheduleWithSpeakers } from "@/lib/supabase/mock";

export default async function AdminSchedulePage() {
  const { talks, speakers } = await getScheduleWithSpeakers();

  return (
    <div className="space-y-8">
      <div className="max-w-3xl">
        <p className="text-xs uppercase tracking-[0.32em] text-primary">Admin</p>
        <h1 className="mt-4 font-heading text-5xl font-black uppercase text-foreground md:text-6xl">Schedule manager.</h1>
        <p className="mt-5 text-lg leading-8 text-foreground/65">
          Edit talk slots or add new ones with React Hook Form. The table and form stay in sync from the same dataset.
        </p>
      </div>
      <ScheduleManager initialTalks={talks} speakers={speakers} />
    </div>
  );
}
