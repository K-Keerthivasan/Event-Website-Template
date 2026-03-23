"use client";

import { useState } from "react";
import type { Attendee } from "@/lib/mock-data";

export function AttendeesManager({ initialAttendees }: { initialAttendees: Attendee[] }) {
  const [rows, setRows] = useState(initialAttendees);
  const [search, setSearch] = useState("");

  const toggleCheckIn = (id: string) => {
    setRows((current) =>
      current.map((attendee) =>
        attendee.id === id ? { ...attendee, checkedIn: !attendee.checkedIn } : attendee
      )
    );
  };

  const exportCsv = () => {
    const header = ["Name", "Email", "Company", "Ticket Type", "Checked In"];
    const csv = [
      header.join(","),
      ...rows.map((row) =>
        [row.name, row.email, row.company, row.ticketType, row.checkedIn ? "Yes" : "No"]
          .map((value) => `"${value}"`)
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "voltage-attendees.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const filtered = rows.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.email.toLowerCase().includes(search.toLowerCase()) ||
      r.company.toLowerCase().includes(search.toLowerCase())
  );

  const checkedInCount = rows.filter((r) => r.checkedIn).length;

  return (
    <div className="space-y-6">
      {/* Stats bar */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Total Registered", value: rows.length },
          { label: "Checked In", value: checkedInCount },
          { label: "Pending", value: rows.length - checkedInCount },
        ].map((stat) => (
          <div key={stat.label} className="panel-edge rounded-[1.8rem] border border-border bg-foreground/[0.03] p-5">
            <p className="text-xs uppercase tracking-[0.28em] text-foreground/45">{stat.label}</p>
            <p className="mt-3 font-heading text-4xl font-black uppercase text-foreground">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="panel-edge rounded-[2rem] border border-border bg-foreground/[0.03] p-6">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-primary">Attendees</p>
            <h2 className="mt-3 font-heading text-3xl font-black uppercase text-foreground">Check-in control room</h2>
          </div>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Search attendees…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="rounded-full border border-border bg-foreground/[0.04] px-4 py-2 text-sm text-foreground placeholder:text-foreground/40 outline-none focus:border-primary"
            />
            <button
              type="button"
              onClick={exportCsv}
              className="rounded-full border border-border bg-foreground px-5 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-background transition hover:bg-primary hover:text-primary-foreground hover:border-primary"
            >
              Export CSV
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="text-xs uppercase tracking-[0.28em] text-foreground/45">
              <tr>
                <th className="pb-4 pr-6">Name</th>
                <th className="pb-4 pr-6">Ticket</th>
                <th className="pb-4 pr-6">Email</th>
                <th className="pb-4 pr-6">Status</th>
                <th className="pb-4 pr-6">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((attendee) => (
                <tr key={attendee.id} className="border-t border-border text-foreground/70">
                  <td className="py-4 pr-6">
                    <div>
                      <p className="font-medium text-foreground">{attendee.name}</p>
                      <p className="text-xs uppercase tracking-[0.2em] text-foreground/40">{attendee.company}</p>
                    </div>
                  </td>
                  <td className="py-4 pr-6">{attendee.ticketType}</td>
                  <td className="py-4 pr-6">{attendee.email}</td>
                  <td className="py-4 pr-6">
                    <span
                      className={`rounded-full border px-3 py-1 text-[11px] uppercase tracking-[0.24em] ${
                        attendee.checkedIn
                          ? "border-[#7DFF98]/30 bg-[#7DFF98]/14 text-[#2e9b3e] dark:text-[#7DFF98]"
                          : "border-border bg-foreground/[0.04] text-foreground/50"
                      }`}
                    >
                      {attendee.checkedIn ? "Checked In" : "Pending"}
                    </span>
                  </td>
                  <td className="py-4 pr-6">
                    <button
                      type="button"
                      onClick={() => toggleCheckIn(attendee.id)}
                      className="rounded-full border border-border px-4 py-2 text-xs uppercase tracking-[0.24em] text-foreground/65 transition hover:border-primary hover:text-primary"
                    >
                      Toggle
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <p className="py-8 text-center text-sm text-foreground/45">No attendees match your search.</p>
          )}
        </div>
      </div>
    </div>
  );
}
