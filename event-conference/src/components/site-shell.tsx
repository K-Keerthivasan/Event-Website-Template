import Link from "next/link";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";

const nav = [
  { href: "/", label: "Home" },
  { href: "/schedule", label: "Schedule" },
  { href: "/speakers", label: "Speakers" },
  { href: "/venue", label: "Venue" },
  { href: "/tickets", label: "Tickets" },
  { href: "/faq", label: "FAQ" },
];

export function SiteShell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative min-h-screen overflow-hidden", className)}>
      <div className="pointer-events-none absolute inset-0 grid-overlay opacity-20" />
      <header
        className="sticky top-0 z-40 border-b backdrop-blur-xl"
        style={{ background: "var(--nav-bg)", borderColor: "var(--nav-border)" }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4 lg:px-10">
          <Link href="/" className="flex shrink-0 items-center gap-3">
            <span className="inline-flex size-3 rounded-full bg-primary shadow-[0_0_20px_rgba(255,45,120,0.9)]" />
            <div>
              <p className="font-heading text-sm uppercase tracking-[0.35em] text-foreground/55">K2 Digital Media</p>
              <p className="font-heading text-xl uppercase tracking-[0.2em] text-foreground">Voltage Summit</p>
            </div>
          </Link>
          <nav className="hidden items-center gap-5 xl:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm uppercase tracking-[0.24em] text-foreground/65 transition hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/register"
              className="rounded-full bg-primary px-5 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-primary-foreground transition hover:opacity-85"
            >
              Register
            </Link>
          </div>
        </div>
      </header>
      {children}
      <footer className="border-t border-border bg-background/80 px-6 py-10 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-heading text-sm uppercase tracking-[0.35em] text-foreground/50">K2 Digital Media</p>
            <p className="mt-1 font-heading text-2xl font-black uppercase tracking-[0.1em] text-foreground">Voltage Summit</p>
          </div>
          <nav className="flex flex-wrap gap-5">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs uppercase tracking-[0.28em] text-foreground/50 hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
            <Link href="/admin" className="text-xs uppercase tracking-[0.28em] text-foreground/50 hover:text-foreground">
              Admin
            </Link>
          </nav>
          <p className="text-xs text-foreground/35">© 2026 K2 Digital Media. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
