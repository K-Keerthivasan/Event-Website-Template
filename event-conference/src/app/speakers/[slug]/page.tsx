import { notFound } from "next/navigation";
import Link from "next/link";
import { SiteShell } from "@/components/site-shell";
import { speakers, schedule, trackStyles } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export async function generateStaticParams() {
  return speakers.map((s) => ({ slug: s.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const speaker = speakers.find((s) => s.id === slug);
  if (!speaker) return {};
  return {
    title: `${speaker.name} — Voltage Summit 2026`,
    description: speaker.bio,
  };
}

export default async function SpeakerProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const speaker = speakers.find((s) => s.id === slug);

  if (!speaker) notFound();

  const speakerTalks = schedule.filter((t) => t.speakerId === speaker.id);
  const initials = speaker.name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2);

  return (
    <SiteShell>
      <main className="px-6 py-16 lg:px-10">
        <div className="mx-auto max-w-7xl">
          {/* Back link */}
          <Link
            href="/speakers"
            className="mb-10 inline-flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-foreground/50 transition hover:text-foreground"
          >
            ← All Speakers
          </Link>

          {/* Profile hero */}
          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
            {/* Portrait */}
            <div className={`relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-gradient-to-br ${speaker.palette}`}>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.35),transparent_34%)]" />
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <span className="font-heading text-8xl font-black uppercase text-white/90">{initials}</span>
                <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.28em] text-white/70">
                  Speaker
                </span>
              </div>
            </div>

            {/* Info */}
            <div className="flex flex-col justify-center space-y-6">
              <div>
                <p className="text-xs uppercase tracking-[0.42em] text-primary">Speaker Profile</p>
                <h1 className="mt-4 font-heading text-5xl font-black uppercase text-foreground md:text-7xl">
                  {speaker.name}
                </h1>
                <p className="mt-3 text-xl text-foreground/65">
                  {speaker.title}, {speaker.company}
                </p>
              </div>

              <p className="max-w-2xl text-lg leading-8 text-foreground/70">{speaker.bio}</p>

              {/* Social links */}
              <div className="flex flex-wrap gap-3">
                <a
                  href={speaker.social.x}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-border px-5 py-2.5 text-xs uppercase tracking-[0.28em] text-foreground/65 transition hover:border-primary hover:text-primary"
                >
                  X / Twitter
                </a>
                <a
                  href={speaker.social.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-border px-5 py-2.5 text-xs uppercase tracking-[0.28em] text-foreground/65 transition hover:border-primary hover:text-primary"
                >
                  LinkedIn
                </a>
                <Link
                  href="/register"
                  className="rounded-full bg-primary px-5 py-2.5 text-xs uppercase tracking-[0.28em] text-primary-foreground transition hover:opacity-85"
                >
                  Get Your Ticket
                </Link>
              </div>
            </div>
          </div>

          {/* Sessions */}
          {speakerTalks.length > 0 && (
            <section className="mt-16">
              <p className="text-xs uppercase tracking-[0.32em] text-primary">Sessions</p>
              <h2 className="mt-4 font-heading text-4xl font-black uppercase text-foreground">
                On the schedule
              </h2>
              <div className="mt-8 space-y-4">
                {speakerTalks.map((talk) => (
                  <article
                    key={talk.id}
                    className="panel-edge grid gap-5 rounded-[2rem] border border-border bg-foreground/[0.03] p-6 lg:grid-cols-[120px_1fr_180px]"
                  >
                    <div className="font-heading text-3xl font-black tracking-[-0.06em] text-foreground">{talk.time}</div>
                    <div>
                      <div className="mb-3 flex flex-wrap items-center gap-3">
                        <span className={cn("rounded-full border px-3 py-1 text-[11px] uppercase tracking-[0.28em]", trackStyles[talk.track])}>
                          {talk.track}
                        </span>
                        <span className="text-xs uppercase tracking-[0.24em] text-foreground/45">{talk.room}</span>
                      </div>
                      <h3 className="text-2xl font-bold uppercase text-foreground">{talk.title}</h3>
                    </div>
                    <div className="flex items-center justify-start lg:justify-end">
                      <div className="rounded-[1.5rem] border border-border bg-background/60 px-4 py-3 text-right">
                        <p className="font-heading text-lg uppercase text-foreground">{talk.day}</p>
                        <p className="text-xs uppercase tracking-[0.24em] text-foreground/40">Sep 2026</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          {/* CTA */}
          <section className="mt-16 panel-edge rounded-[2rem] border border-border bg-foreground/[0.03] p-8 text-center">
            <p className="text-xs uppercase tracking-[0.42em] text-primary">Be in the room</p>
            <h2 className="mt-4 font-heading text-4xl font-black uppercase text-foreground">
              See {speaker.name.split(" ")[0]} live.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-foreground/65">
              Voltage Summit 2026 · September 18-20 · The Bentway + Stackt Market, Toronto
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/register"
                className="rounded-full bg-primary px-8 py-4 text-sm font-semibold uppercase tracking-[0.28em] text-primary-foreground transition hover:opacity-85"
              >
                Buy Tickets
              </Link>
              <Link
                href="/schedule"
                className="rounded-full border border-border px-8 py-4 text-sm font-semibold uppercase tracking-[0.28em] text-foreground/65 transition hover:border-foreground/40 hover:text-foreground"
              >
                Full Schedule
              </Link>
            </div>
          </section>
        </div>
      </main>
    </SiteShell>
  );
}
