import Link from "next/link";
import { Countdown } from "@/components/countdown";
import { SiteShell } from "@/components/site-shell";
import { getMarketingData } from "@/lib/supabase/mock";

export default async function HomePage() {
  const { event, speakers } = await getMarketingData();

  return (
    <SiteShell>
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden px-6 py-16 lg:px-10 lg:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="relative">
              <p className="text-sm uppercase tracking-[0.42em] text-primary">September 18-20, 2026 / Toronto</p>
              <h1 className="mt-6 font-heading text-[4.5rem] font-black uppercase leading-[0.9] tracking-[-0.08em] text-foreground md:text-[7.5rem] xl:text-[9rem]">
                Voltage
                <span className="block text-stroke">Summit</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-foreground/70">
                High-energy festival atmosphere, premium tech conference precision. Three days of talks, launches,
                installations, and after-dark networking engineered to feel urgent.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/register"
                  className="rounded-full bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-[0.28em] text-primary-foreground transition hover:opacity-85"
                >
                  Get Your Ticket
                </Link>
                <Link
                  href="/schedule"
                  className="rounded-full border border-border px-6 py-3 text-sm font-semibold uppercase tracking-[0.28em] text-foreground/70 transition hover:border-foreground/40 hover:text-foreground"
                >
                  Explore Schedule
                </Link>
              </div>
              <div className="mt-14 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {event.stats.map((stat) => (
                  <div key={stat.label} className="panel-edge rounded-[1.8rem] border border-border bg-foreground/[0.03] p-5">
                    <p className="font-heading text-4xl font-black uppercase text-foreground">{stat.value}</p>
                    <p className="mt-2 text-xs uppercase tracking-[0.24em] text-foreground/45">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <div className="panel-edge rounded-[2rem] border border-border bg-foreground/[0.03] p-6">
                <p className="text-xs uppercase tracking-[0.32em] text-primary">Live Countdown</p>
                <h2 className="mt-3 font-heading text-3xl font-black uppercase text-foreground">{event.dateLabel}</h2>
                <p className="mt-2 text-sm text-foreground/60">{event.venue}, {event.location}</p>
                <div className="mt-6">
                  <Countdown target={event.countdownTarget} />
                </div>
              </div>
              <div className="panel-edge rounded-[2rem] border border-border bg-foreground/[0.03] p-6">
                <p className="text-xs uppercase tracking-[0.32em] text-primary">Past Edition Highlights</p>
                <div className="mt-6 space-y-4">
                  {event.highlights.map((highlight) => (
                    <div key={highlight} className="rounded-[1.5rem] border border-border bg-background/60 px-4 py-4 text-sm text-foreground/70">
                      {highlight}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ticker bar */}
        <section className="border-y border-border bg-foreground/[0.02] px-6 py-5 lg:px-10">
          <div className="mx-auto flex max-w-7xl flex-wrap gap-6 text-sm uppercase tracking-[0.32em] text-foreground/50">
            <span>Past edition energy:</span>
            <span>sold out in 12 days</span>
            <span>headline launches</span>
            <span>night sessions</span>
            <span>creator lounges</span>
            <span>VIP studio critiques</span>
          </div>
        </section>

        {/* Featured Speakers */}
        <section className="px-6 py-16 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.32em] text-primary">Featured Speakers</p>
                <h2 className="mt-3 font-heading text-4xl font-black uppercase text-foreground md:text-5xl">
                  A lineup with stage presence.
                </h2>
              </div>
              <Link href="/speakers" className="text-sm uppercase tracking-[0.28em] text-foreground/55 transition hover:text-foreground">
                View all 12 speakers →
              </Link>
            </div>
            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {speakers.slice(0, 4).map((speaker) => (
                <Link key={speaker.id} href={`/speakers/${speaker.id}`}>
                  <article className="panel-edge rounded-[2rem] border border-border bg-foreground/[0.03] p-5 transition hover:border-primary/40">
                    <div className={`aspect-[4/5] rounded-[1.6rem] bg-gradient-to-br ${speaker.palette}`} />
                    <h3 className="mt-4 font-heading text-2xl font-bold uppercase text-foreground">{speaker.name}</h3>
                    <p className="mt-2 text-sm text-foreground/60">
                      {speaker.title}, {speaker.company}
                    </p>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-border px-6 py-20 lg:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs uppercase tracking-[0.42em] text-primary">September 18-20, 2026</p>
            <h2 className="mt-5 font-heading text-5xl font-black uppercase text-foreground md:text-7xl">
              Be in the room.
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-lg text-foreground/65">
              Three ticket tiers. Early Bird moves fast. Get on the list before capacity closes.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/register"
                className="rounded-full bg-primary px-8 py-4 text-sm font-semibold uppercase tracking-[0.28em] text-primary-foreground transition hover:opacity-85"
              >
                Buy Tickets
              </Link>
              <Link
                href="/venue"
                className="rounded-full border border-border px-8 py-4 text-sm font-semibold uppercase tracking-[0.28em] text-foreground/65 transition hover:border-foreground/40 hover:text-foreground"
              >
                View Venue
              </Link>
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
