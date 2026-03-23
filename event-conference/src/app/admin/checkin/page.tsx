import { QrScanner } from "@/components/admin/qr-scanner";

export default function AdminCheckinPage() {
  return (
    <div className="space-y-8">
      <div className="max-w-3xl">
        <p className="text-xs uppercase tracking-[0.32em] text-primary">Admin</p>
        <h1 className="mt-4 font-heading text-5xl font-black uppercase text-foreground md:text-6xl">QR Check-in.</h1>
        <p className="mt-5 text-lg leading-8 text-foreground/65">
          Scan attendee QR passes or enter ticket codes manually. Each valid scan marks the attendee as checked in via{" "}
          <code className="rounded-md border border-border bg-foreground/[0.06] px-2 py-0.5 text-sm text-foreground/80">
            /api/checkin
          </code>
          .
        </p>
      </div>
      <QrScanner />
    </div>
  );
}
