"use client";

import { useState, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";

type CheckinResult = {
  success: boolean;
  message: string;
  attendee?: {
    name: string;
    email: string;
    company?: string;
    ticketType: string;
    checkedIn: boolean;
  };
};

export function QrScanner() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState<CheckinResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<Array<CheckinResult & { code: string; time: string }>>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/checkin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ticketCode: code.trim() }),
      });
      const data: CheckinResult = await res.json();
      setResult(data);
      setHistory((prev) => [
        { ...data, code: code.trim().toUpperCase(), time: new Date().toLocaleTimeString() },
        ...prev.slice(0, 9),
      ]);
      if (data.success) {
        setCode("");
        // Re-focus for fast serial scanning
        setTimeout(() => inputRef.current?.focus(), 100);
      }
    } catch {
      setResult({ success: false, message: "Network error. Check your connection." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
      {/* Scanner input */}
      <div className="space-y-6">
        <div className="panel-edge rounded-[2rem] border border-border bg-foreground/[0.03] p-6">
          <p className="text-xs uppercase tracking-[0.32em] text-primary">QR Scanner</p>
          <h2 className="mt-3 font-heading text-3xl font-black uppercase text-foreground">Scan or enter code</h2>
          <p className="mt-3 text-sm text-foreground/60">
            Point a barcode scanner at the QR pass or type the ticket code manually. Format: VS26-XXXXXX
          </p>

          <form onSubmit={handleSubmit} className="mt-6 flex gap-3">
            <input
              ref={inputRef}
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="VS26-XXXXXX"
              autoFocus
              autoComplete="off"
              spellCheck={false}
              className="flex-1 rounded-full border border-border bg-foreground/[0.04] px-5 py-3 font-heading text-lg uppercase tracking-[0.12em] text-foreground placeholder:text-foreground/30 outline-none transition focus:border-primary"
            />
            <button
              type="submit"
              disabled={loading || !code.trim()}
              className="rounded-full bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-[0.26em] text-primary-foreground transition hover:opacity-85 disabled:opacity-50"
            >
              {loading ? "…" : "Check In"}
            </button>
          </form>
        </div>

        {/* Result */}
        {result && (
          <div
            className={`panel-edge rounded-[2rem] border p-6 transition ${
              result.success
                ? "border-[#7DFF98]/30 bg-[#7DFF98]/[0.06]"
                : "border-destructive/30 bg-destructive/[0.06]"
            }`}
          >
            <div className="flex items-start gap-4">
              <div
                className={`flex size-12 shrink-0 items-center justify-center rounded-full ${
                  result.success ? "bg-[#7DFF98]/20 text-[#2e9b3e] dark:text-[#7dff98]" : "bg-destructive/20 text-destructive"
                }`}
              >
                {result.success ? (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                )}
              </div>
              <div className="flex-1">
                <p className={`font-heading text-xl font-bold uppercase ${result.success ? "text-[#2e9b3e] dark:text-[#7dff98]" : "text-destructive"}`}>
                  {result.success ? "Checked In!" : "Check-in Failed"}
                </p>
                <p className="mt-1 text-sm text-foreground/70">{result.message}</p>
                {result.attendee && (
                  <div className="mt-4 space-y-1">
                    <p className="font-heading text-2xl font-bold uppercase text-foreground">{result.attendee.name}</p>
                    <p className="text-sm text-foreground/60">{result.attendee.email}</p>
                    {result.attendee.company && (
                      <p className="text-sm text-foreground/60">{result.attendee.company}</p>
                    )}
                    <div className="mt-3 inline-block rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-primary">
                      {result.attendee.ticketType}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* QR preview for testing */}
        <div className="panel-edge rounded-[2rem] border border-border bg-foreground/[0.03] p-6">
          <p className="text-xs uppercase tracking-[0.32em] text-primary">Test QR Code</p>
          <p className="mt-2 text-sm text-foreground/55">Scan this demo code to test the scanner.</p>
          <div className="mt-4 flex items-center justify-center rounded-[1.5rem] bg-white p-4">
            <QRCodeSVG value="VS26-DEMO01" size={140} />
          </div>
          <p className="mt-3 text-center font-heading text-lg font-bold tracking-[0.15em] text-foreground">VS26-DEMO01</p>
        </div>
      </div>

      {/* Recent scan history */}
      <div className="panel-edge rounded-[2rem] border border-border bg-foreground/[0.03] p-6">
        <p className="text-xs uppercase tracking-[0.32em] text-primary">Recent Scans</p>
        <h2 className="mt-3 font-heading text-3xl font-black uppercase text-foreground">Scan history</h2>
        {history.length === 0 ? (
          <div className="mt-8 rounded-[1.5rem] border border-dashed border-border p-8 text-center">
            <p className="text-foreground/40">No scans yet. Check in your first attendee.</p>
          </div>
        ) : (
          <div className="mt-6 space-y-3">
            {history.map((entry, i) => (
              <div
                key={i}
                className={`flex items-center justify-between rounded-[1.5rem] border px-4 py-3 ${
                  entry.success ? "border-[#7DFF98]/20 bg-[#7DFF98]/[0.04]" : "border-destructive/20 bg-destructive/[0.04]"
                }`}
              >
                <div>
                  <p className="font-heading text-sm font-bold uppercase text-foreground">{entry.code}</p>
                  <p className="text-xs text-foreground/50">
                    {entry.attendee?.name ?? "Unknown"} · {entry.attendee?.ticketType ?? "—"}
                  </p>
                </div>
                <div className="text-right">
                  <span
                    className={`block text-[11px] uppercase tracking-[0.24em] ${
                      entry.success ? "text-[#2e9b3e] dark:text-[#7dff98]" : "text-destructive"
                    }`}
                  >
                    {entry.success ? "✓ OK" : "✗ Failed"}
                  </span>
                  <span className="text-xs text-foreground/35">{entry.time}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
