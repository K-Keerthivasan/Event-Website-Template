import { DashboardClient } from "@/components/admin/dashboard-client";
import { getAdminDashboardData } from "@/lib/supabase/mock";

export default async function AdminDashboardPage() {
  const { metrics, capacity } = await getAdminDashboardData();

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="max-w-3xl">
        <p className="text-xs uppercase tracking-[0.32em] text-primary">Dashboard</p>
        <h1 className="mt-3 font-heading text-4xl font-black uppercase text-foreground sm:text-5xl md:text-6xl">
          Live event command center.
        </h1>
        <p className="mt-4 text-base leading-7 text-foreground/60 sm:text-lg sm:leading-8">
          Revenue, registrations, sell-through, and ticket mix in one admin surface.
        </p>
      </div>
      <DashboardClient
        capacity={capacity}
        sold={metrics.sold}
        revenue={metrics.revenue}
        registrationsToday={metrics.registrationsToday}
        breakdown={metrics.breakdown}
      />
    </div>
  );
}
