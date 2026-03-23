import { SiteShell } from "@/components/site-shell";
import Link from "next/link";

const spaces = [
  {
    name: "Hangar A",
    capacity: "1,200",
    type: "Main Stage",
    description: "The primary keynote and headline session space. Full production rig, reactive LED walls, and broadcast-quality live feed.",
    color: "from-[#FF2D78] via-[#8D1CFF] to-[#050505]",
  },
  {
    name: "Signal Room",
    capacity: "350",
    type: "Growth Track",
    description: "Intimate breakout format designed for founder-level conversations, growth strategy sessions, and panel formats.",
    color: "from-[#52F4FF] via-[#FF2D78] to-[#050505]",
  },
  {
    name: "Vector Hall",
    capacity: "280",
    type: "Design Track",
    description: "Studio-style space with projection mapping, ideal for interface critiques, live demos, and design show-and-tells.",
    color: "from-[#FFC857] via-[#FF2D78] to-[#050505]",
  },
  {
    name: "Warehouse 3",
    capacity: "600",
    type: "After Dark",
    description: "The night program venue. Modular layout that shifts from seated panels to standing social format after 7pm.",
    color: "from-[#7DFF98] via-[#52F4FF] to-[#050505]",
  },
  {
    name: "Rooftop",
    capacity: "200",
    type: "Networking",
    description: "Sunset rooftop space for closing ceremonies, VIP receptions, and the final-day rooftop set.",
    color: "from-[#ffffff] via-[#FF2D78] to-[#050505]",
  },
];

const transport = [
  { icon: "🚇", label: "Subway", detail: "Bathurst Station (King streetcar) — 8 min walk" },
  { icon: "🚌", label: "Streetcar", detail: "King St W at Bathurst — 2 min walk" },
  { icon: "🚗", label: "Parking", detail: "Stackt Market surface lot + nearby Green P garages" },
  { icon: "🚲", label: "Bike Share", detail: "Bike Share station at Bathurst & Front" },
  { icon: "✈️", label: "Airport", detail: "Billy Bishop City Airport — 15 min taxi / ferry" },
];

export default function VenuePage() {
  return (
    <SiteShell>
      <main className="px-6 py-16 lg:px-10">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-16 max-w-3xl">
            <p className="text-xs uppercase tracking-[0.42em] text-primary">Venue</p>
            <h1 className="mt-4 font-heading text-5xl font-black uppercase text-foreground md:text-7xl">
              The Bentway + Stackt Market
            </h1>
            <p className="mt-5 text-xl leading-8 text-foreground/65">
              Two of Toronto&apos;s most distinctive urban spaces, merged into one three-day production. Under the Gardiner at
              Bathurst, right on the waterfront edge.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/register"
                className="rounded-full bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-[0.28em] text-primary-foreground transition hover:opacity-85"
              >
                Get Your Ticket
              </Link>
              <a
                href="https://www.thebentway.ca"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-border px-6 py-3 text-sm font-semibold uppercase tracking-[0.28em] text-foreground/65 transition hover:border-foreground/40 hover:text-foreground"
              >
                Venue Website ↗
              </a>
            </div>
          </div>

          {/* Map placeholder */}
          <div className="panel-edge mb-16 overflow-hidden rounded-[2rem] border border-border">
            <div className="relative h-80 bg-foreground/[0.04] lg:h-[480px]">
              <div className="absolute inset-0 grid-overlay opacity-30" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <div className="rounded-full border border-primary/40 bg-primary/10 px-6 py-3">
                  <p className="text-sm uppercase tracking-[0.32em] text-primary">Interactive Map</p>
                </div>
                <p className="text-center text-foreground/50">
                  The Bentway — 250 Fort York Blvd, Toronto, ON M5V 3K9
                </p>
                <p className="text-xs uppercase tracking-[0.28em] text-foreground/35">
                  Connect @react-google-maps/api with NEXT_PUBLIC_GOOGLE_MAPS_KEY
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border p-6">
              <div>
                <p className="font-heading text-2xl font-bold uppercase text-foreground">250 Fort York Blvd</p>
                <p className="text-sm text-foreground/55">Toronto, ON M5V 3K9 · Canada</p>
              </div>
              <a
                href="https://maps.google.com/?q=The+Bentway+Toronto"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-border px-5 py-2.5 text-xs uppercase tracking-[0.28em] text-foreground/65 transition hover:border-primary hover:text-primary"
              >
                Open in Maps ↗
              </a>
            </div>
          </div>

          {/* Venue spaces */}
          <section className="mb-16">
            <p className="text-xs uppercase tracking-[0.32em] text-primary">Spaces</p>
            <h2 className="mt-4 mb-8 font-heading text-4xl font-black uppercase text-foreground">Five distinct rooms.</h2>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {spaces.map((space) => (
                <article key={space.name} className="panel-edge rounded-[2rem] border border-border bg-foreground/[0.03] p-6">
                  <div className={`mb-5 h-28 rounded-[1.5rem] bg-gradient-to-br ${space.color}`} />
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-heading text-2xl font-bold uppercase text-foreground">{space.name}</h3>
                    <span className="shrink-0 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-primary">
                      {space.type}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-foreground/65">{space.description}</p>
                  <p className="mt-5 text-xs uppercase tracking-[0.28em] text-foreground/40">
                    Capacity: <span className="text-foreground/70">{space.capacity}</span>
                  </p>
                </article>
              ))}
            </div>
          </section>

          {/* Getting here */}
          <section className="mb-16">
            <p className="text-xs uppercase tracking-[0.32em] text-primary">Getting Here</p>
            <h2 className="mt-4 mb-8 font-heading text-4xl font-black uppercase text-foreground">
              Every route covered.
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
              {transport.map((t) => (
                <div key={t.label} className="panel-edge rounded-[1.8rem] border border-border bg-foreground/[0.03] p-5">
                  <div className="text-3xl">{t.icon}</div>
                  <p className="mt-4 text-xs uppercase tracking-[0.28em] text-foreground/45">{t.label}</p>
                  <p className="mt-2 text-sm leading-5 text-foreground/70">{t.detail}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Accessibility */}
          <section className="panel-edge rounded-[2rem] border border-border bg-foreground/[0.03] p-8">
            <p className="text-xs uppercase tracking-[0.32em] text-primary">Accessibility</p>
            <h2 className="mt-4 font-heading text-4xl font-black uppercase text-foreground">Everyone in the room.</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {[
                { label: "Mobility Access", detail: "Ramp access at all entrances, accessible washrooms in every building, elevator to rooftop." },
                { label: "ASL Interpretation", detail: "Certified ASL interpreters on Main Stage for all keynotes and headline sessions." },
                { label: "Quiet Zones", detail: "Dedicated low-stimulation areas available throughout the event for decompression and focus." },
              ].map((item) => (
                <div key={item.label} className="rounded-[1.5rem] border border-border bg-background/60 p-5">
                  <p className="font-heading text-lg font-bold uppercase text-foreground">{item.label}</p>
                  <p className="mt-3 text-sm leading-6 text-foreground/65">{item.detail}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </SiteShell>
  );
}
