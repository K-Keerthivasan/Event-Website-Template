"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const adminNav = [
  { href: "/admin", label: "Dashboard", icon: "◈" },
  { href: "/admin/attendees", label: "Attendees", icon: "◎" },
  { href: "/admin/checkin", label: "QR Check-in", icon: "⬡" },
  { href: "/admin/schedule", label: "Schedule", icon: "≡" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <div className="min-h-screen bg-background">
      {/* ── Mobile top bar ───────────────────────────────────────── */}
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-border bg-background/90 px-4 py-3 backdrop-blur-xl lg:hidden">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="size-2.5 rounded-full bg-primary shadow-[0_0_14px_rgba(255,45,120,0.8)]" />
          <div>
            <p className="font-heading text-[10px] uppercase tracking-[0.35em] text-foreground/50">K2 Digital</p>
            <p className="font-heading text-base font-black uppercase tracking-[0.15em] text-foreground leading-tight">
              Admin
            </p>
          </div>
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
            className="flex size-9 items-center justify-center rounded-full border border-border bg-foreground/[0.04] text-foreground/70"
          >
            {mobileOpen ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* ── Mobile drawer overlay ─────────────────────────────────── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-foreground/40 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        >
          <div
            className="absolute left-0 top-0 h-full w-72 border-r border-border bg-background p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.32em] text-primary">K2 Digital Media</p>
                <h2 className="mt-1 font-heading text-2xl font-black uppercase text-foreground">Voltage Admin</h2>
              </div>
            </div>
            <nav className="mt-8 space-y-2">
              {adminNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm uppercase tracking-[0.22em] transition",
                    isActive(item.href)
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-foreground/[0.03] text-foreground/65 hover:border-primary/40 hover:text-foreground"
                  )}
                >
                  <span className="text-base">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-8 border-t border-border pt-6">
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 text-sm uppercase tracking-[0.24em] text-foreground/45 hover:text-foreground"
              >
                ← Back to site
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ── Mobile horizontal nav pills (below header) ───────────── */}
      <div className="scrollbar-hide sticky top-[57px] z-30 flex gap-2 overflow-x-auto border-b border-border bg-background/90 px-4 py-2.5 backdrop-blur-xl lg:hidden">
        {adminNav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "shrink-0 rounded-full border px-4 py-1.5 text-xs uppercase tracking-[0.22em] transition whitespace-nowrap",
              isActive(item.href)
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-foreground/[0.03] text-foreground/60 hover:text-foreground"
            )}
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* ── Desktop sidebar + content ─────────────────────────────── */}
      <div className="mx-auto grid min-h-screen max-w-7xl gap-0 lg:grid-cols-[260px_1fr]">
        {/* Desktop sidebar — hidden on mobile */}
        <aside className="hidden border-r border-border bg-foreground/[0.02] p-6 lg:flex lg:flex-col">
          <div className="flex items-start justify-between">
            <Link href="/" className="block">
              <p className="text-xs uppercase tracking-[0.32em] text-primary">K2 Digital Media</p>
              <h1 className="mt-3 font-heading text-3xl font-black uppercase text-foreground">Voltage Admin</h1>
            </Link>
            <ThemeToggle />
          </div>
          <nav className="mt-10 space-y-2">
            {adminNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-[1.2rem] border px-4 py-3 text-sm uppercase tracking-[0.22em] transition",
                  isActive(item.href)
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-foreground/[0.03] text-foreground/60 hover:border-primary/40 hover:text-foreground"
                )}
              >
                <span className="text-base leading-none">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto border-t border-border pt-6">
            <Link
              href="/"
              className="block rounded-[1.2rem] border border-border px-4 py-3 text-sm uppercase tracking-[0.24em] text-foreground/45 transition hover:text-foreground"
            >
              ← Back to site
            </Link>
          </div>
        </aside>

        {/* Main content */}
        <main className="min-w-0 px-4 py-6 sm:px-6 lg:px-10 lg:py-10">
          {children}
        </main>
      </div>
    </div>
  );
}
