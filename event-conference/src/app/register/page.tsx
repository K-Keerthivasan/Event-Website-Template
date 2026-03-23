"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import { SiteShell } from "@/components/site-shell";
import { ticketTiers } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { Suspense } from "react";

const schema = z.object({
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  email: z.string().email("Valid email required"),
  company: z.string().min(1, "Required"),
  tier: z.enum(["early-bird", "standard", "vip"] as const, { error: "Select a ticket tier" }),
  agreeTerms: z.boolean().refine((v) => v === true, { message: "You must agree to the terms" }),
});

type FormValues = z.infer<typeof schema>;
// agreeTerms is boolean in the inferred type but must be true at runtime

function RegisterForm() {
  const searchParams = useSearchParams();
  const defaultTier = (searchParams.get("tier") as FormValues["tier"]) ?? "standard";
  const [submitted, setSubmitted] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [stripeError, setStripeError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { tier: defaultTier },
  });

  const selectedTier = watch("tier");
  const tier = ticketTiers.find((t) => t.id === selectedTier);

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    setStripeError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tierId: values.tier,
          email: values.email,
          name: `${values.firstName} ${values.lastName}`,
          company: values.company,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.url) {
          window.location.href = data.url;
          return;
        }
      }

      // Boilerplate fallback: show mock confirmation
      const code = `VS26-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
      setConfirmationCode(code);
      setSubmitted(true);
    } catch {
      setStripeError("Something went wrong. Please try again or contact hello@voltagesummit.com.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl text-center">
        <div className="panel-edge rounded-[2rem] border border-border bg-foreground/[0.03] p-8">
          <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-[#7dff98]/15 text-[#2e9b3e] dark:text-[#7dff98]">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <p className="text-xs uppercase tracking-[0.42em] text-primary">Registration Confirmed</p>
          <h2 className="mt-4 font-heading text-4xl font-black uppercase text-foreground">You&apos;re in.</h2>
          <p className="mt-4 text-foreground/65">
            Your QR pass has been emailed. Present it at check-in — Hangar A gate, September 18.
          </p>
          <div className="my-8 flex items-center justify-center rounded-[1.5rem] bg-white p-6">
            <QRCodeSVG value={`https://voltage.k2digitalmedia.com/checkin/${confirmationCode}`} size={200} />
          </div>
          <div className="rounded-[1.5rem] border border-border bg-background/60 px-6 py-4">
            <p className="text-xs uppercase tracking-[0.28em] text-foreground/45">Ticket Code</p>
            <p className="mt-2 font-heading text-3xl font-bold uppercase tracking-[0.1em] text-foreground">{confirmationCode}</p>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/schedule" className="rounded-full bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-[0.28em] text-primary-foreground transition hover:opacity-85">
              Browse Schedule
            </Link>
            <Link href="/venue" className="rounded-full border border-border px-6 py-3 text-sm font-semibold uppercase tracking-[0.28em] text-foreground/65 transition hover:border-foreground/40 hover:text-foreground">
              Venue Info
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const inputCls = (hasError: boolean) =>
    cn(
      "w-full rounded-[1.2rem] border bg-foreground/[0.04] px-4 py-3 text-foreground placeholder:text-foreground/35 outline-none transition focus:border-primary",
      hasError ? "border-destructive" : "border-border"
    );

  return (
    <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="panel-edge rounded-[2rem] border border-border bg-foreground/[0.03] p-6">
          <p className="text-xs uppercase tracking-[0.32em] text-primary">Your Details</p>
          <h2 className="mt-3 font-heading text-3xl font-black uppercase text-foreground">Personal info</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-xs uppercase tracking-[0.24em] text-foreground/45">First Name *</span>
              <input {...register("firstName")} placeholder="Nova" className={inputCls(!!errors.firstName)} />
              {errors.firstName && <p className="mt-1 text-xs text-destructive">{errors.firstName.message}</p>}
            </label>
            <label className="block">
              <span className="mb-2 block text-xs uppercase tracking-[0.24em] text-foreground/45">Last Name *</span>
              <input {...register("lastName")} placeholder="Chen" className={inputCls(!!errors.lastName)} />
              {errors.lastName && <p className="mt-1 text-xs text-destructive">{errors.lastName.message}</p>}
            </label>
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-xs uppercase tracking-[0.24em] text-foreground/45">Email *</span>
              <input {...register("email")} type="email" placeholder="nova@aetherlabs.co" className={inputCls(!!errors.email)} />
              {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
            </label>
            <label className="block">
              <span className="mb-2 block text-xs uppercase tracking-[0.24em] text-foreground/45">Company *</span>
              <input {...register("company")} placeholder="Aether Labs" className={inputCls(!!errors.company)} />
              {errors.company && <p className="mt-1 text-xs text-destructive">{errors.company.message}</p>}
            </label>
          </div>
        </div>

        {/* Ticket tier */}
        <div className="panel-edge rounded-[2rem] border border-border bg-foreground/[0.03] p-6">
          <p className="text-xs uppercase tracking-[0.32em] text-primary">Ticket Tier</p>
          <h2 className="mt-3 font-heading text-3xl font-black uppercase text-foreground">Choose your access</h2>
          <div className="mt-6 space-y-3">
            {ticketTiers.map((t) => (
              <label
                key={t.id}
                className={cn(
                  "flex cursor-pointer items-center gap-4 rounded-[1.5rem] border p-4 transition",
                  selectedTier === t.id
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-foreground/30"
                )}
              >
                <input
                  type="radio"
                  value={t.id}
                  {...register("tier")}
                  className="accent-primary"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-heading text-xl font-bold uppercase text-foreground">{t.name}</p>
                    <p className="font-heading text-2xl font-black text-foreground">${t.price} <span className="text-sm text-foreground/50">CAD</span></p>
                  </div>
                  <p className="mt-1 text-sm text-foreground/60">{t.tagline}</p>
                </div>
              </label>
            ))}
          </div>
          {errors.tier && <p className="mt-2 text-xs text-destructive">{errors.tier.message}</p>}
        </div>

        {/* Terms */}
        <div className="panel-edge rounded-[2rem] border border-border bg-foreground/[0.03] p-6">
          <label className="flex cursor-pointer items-start gap-3">
            <input type="checkbox" {...register("agreeTerms")} className="mt-1 accent-primary" />
            <span className="text-sm leading-6 text-foreground/65">
              I agree to the{" "}
              <Link href="/faq" className="text-primary hover:underline">
                Terms & Conditions
              </Link>{" "}
              and confirm my registration details are accurate.
            </span>
          </label>
          {errors.agreeTerms && <p className="mt-2 text-xs text-destructive">{errors.agreeTerms.message}</p>}
        </div>

        {stripeError && (
          <div className="rounded-[1.2rem] border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
            {stripeError}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-primary py-4 text-sm font-semibold uppercase tracking-[0.28em] text-primary-foreground transition hover:opacity-85 disabled:opacity-60"
        >
          {loading ? "Processing…" : `Complete Registration — $${tier?.price ?? "—"} CAD`}
        </button>
        <p className="text-center text-xs text-foreground/40">
          Secured by Stripe. Your card details never touch our servers.
        </p>
      </form>

      {/* Order summary */}
      <aside className="space-y-6">
        <div className="panel-edge sticky top-24 rounded-[2rem] border border-border bg-foreground/[0.03] p-6">
          <p className="text-xs uppercase tracking-[0.32em] text-primary">Order Summary</p>
          <h3 className="mt-3 font-heading text-3xl font-black uppercase text-foreground">Voltage Summit 2026</h3>
          <p className="mt-2 text-sm text-foreground/60">September 18–20 · Toronto, Canada</p>

          {tier && (
            <div className="mt-6 rounded-[1.5rem] border border-border bg-background/60 p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-heading text-lg font-bold uppercase text-foreground">{tier.name} Ticket</p>
                  <p className="mt-1 text-xs text-foreground/55">{tier.tagline}</p>
                </div>
                <p className="font-heading text-2xl font-black text-foreground">${tier.price}</p>
              </div>
              <ul className="mt-4 space-y-1.5">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs text-foreground/60">
                    <span className="mt-0.5 text-[#2e9b3e] dark:text-[#7dff98]">✓</span> {f}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-6 flex items-center justify-between border-t border-border pt-6">
            <p className="text-foreground/60">Total</p>
            <p className="font-heading text-3xl font-black text-foreground">${tier?.price ?? "—"} <span className="text-sm text-foreground/50">CAD</span></p>
          </div>

          <div className="mt-6 space-y-2 text-xs text-foreground/45">
            <p>✓ Instant QR pass by email</p>
            <p>✓ Transfer available until Sep 10</p>
            <p>✓ Full refund before Jul 19</p>
          </div>
        </div>
      </aside>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <SiteShell>
      <main className="px-6 py-16 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10">
            <p className="text-xs uppercase tracking-[0.42em] text-primary">Register</p>
            <h1 className="mt-4 font-heading text-5xl font-black uppercase text-foreground md:text-7xl">
              Secure your seat.
            </h1>
            <p className="mt-5 text-lg leading-8 text-foreground/65">
              Complete your registration below. Checkout is secured by Stripe — your QR pass arrives instantly.
            </p>
          </div>
          <Suspense fallback={<div className="h-96 animate-pulse rounded-[2rem] bg-foreground/[0.04]" />}>
            <RegisterForm />
          </Suspense>
        </div>
      </main>
    </SiteShell>
  );
}
