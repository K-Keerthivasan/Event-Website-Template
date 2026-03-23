import { AttendeesManager } from "@/components/admin/attendees-manager";
import { getAttendees } from "@/lib/supabase/mock";

export default async function AdminAttendeesPage() {
  const attendees = await getAttendees();

  return (
    <div className="space-y-8">
      <div className="max-w-3xl">
        <p className="text-xs uppercase tracking-[0.32em] text-primary">Admin</p>
        <h1 className="mt-4 font-heading text-5xl font-black uppercase text-foreground md:text-6xl">Attendees manager.</h1>
        <p className="mt-5 text-lg leading-8 text-foreground/65">
          Manage registrations, flip check-in state, and export a CSV for operations or on-site scanning tools.
        </p>
      </div>
      <AttendeesManager initialAttendees={attendees} />
    </div>
  );
}
