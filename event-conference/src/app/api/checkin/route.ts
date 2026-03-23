import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * POST /api/checkin
 *
 * Validates a QR ticket code and marks the attendee as checked in.
 *
 * Request body: { ticketCode: string }
 * Response:     { success: boolean; attendee?: object; message?: string }
 *
 * Required env vars (when using Supabase):
 *   SUPABASE_URL            — Your Supabase project URL
 *   SUPABASE_SERVICE_ROLE_KEY — Service role key (bypasses RLS)
 *
 * Supabase schema expected:
 *   Table: registrations
 *     id           uuid primary key
 *     ticket_code  text unique
 *     name         text
 *     email        text
 *     company      text
 *     ticket_type  text
 *     checked_in   boolean default false
 *     checked_in_at timestamptz
 *     created_at   timestamptz default now()
 */

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { ticketCode } = body as { ticketCode: string };

    if (!ticketCode || typeof ticketCode !== "string") {
      return NextResponse.json({ success: false, message: "Ticket code is required" }, { status: 400 });
    }

    const normalizedCode = ticketCode.trim().toUpperCase();

    // ── Supabase integration ─────────────────────────────────────────────────
    if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const { createClient } = await import("@supabase/supabase-js");
      const supabase = createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY
      );

      // Look up the ticket
      const { data: registration, error: lookupError } = await supabase
        .from("registrations")
        .select("*")
        .eq("ticket_code", normalizedCode)
        .single();

      if (lookupError || !registration) {
        return NextResponse.json(
          { success: false, message: "Ticket not found. Please check the code and try again." },
          { status: 404 }
        );
      }

      if (registration.checked_in) {
        return NextResponse.json({
          success: false,
          message: "This ticket has already been checked in.",
          attendee: {
            name: registration.name,
            email: registration.email,
            ticketType: registration.ticket_type,
            checkedIn: true,
            checkedInAt: registration.checked_in_at,
          },
        });
      }

      // Mark as checked in
      const { error: updateError } = await supabase
        .from("registrations")
        .update({ checked_in: true, checked_in_at: new Date().toISOString() })
        .eq("ticket_code", normalizedCode);

      if (updateError) {
        throw new Error(updateError.message);
      }

      // Log check-in event
      await supabase.from("check_ins").insert({
        registration_id: registration.id,
        checked_in_at: new Date().toISOString(),
        scanned_by: "admin-dashboard",
      });

      return NextResponse.json({
        success: true,
        message: "Check-in successful!",
        attendee: {
          name: registration.name,
          email: registration.email,
          company: registration.company,
          ticketType: registration.ticket_type,
          checkedIn: true,
        },
      });
    }

    // ── Mock mode (no Supabase configured) ───────────────────────────────────
    // Validate against a simple pattern: VS26-XXXXXX
    const isValidFormat = /^VS26-[A-Z0-9]{6}$/.test(normalizedCode);

    if (!isValidFormat) {
      return NextResponse.json(
        { success: false, message: "Invalid ticket format. Expected VS26-XXXXXX." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Check-in successful! (Mock mode — connect Supabase for real validation)",
      attendee: {
        name: "Demo Attendee",
        email: "demo@voltagesummit.com",
        company: "Demo Co.",
        ticketType: "Standard",
        checkedIn: true,
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal server error";
    console.error("[/api/checkin]", message);
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
