import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY
);

const workingHours = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");

    if (!date) {
      return NextResponse.json(
        { error: "Липсва дата." },
        { status: 400 }
      );
    }

    const { data: confirmedAppointments = [], error: confirmedError } =
      await supabase
        .from("appointments")
        .select("preferred_hour")
        .eq("preferred_date", date)
        .eq("status", "confirmed");

    if (confirmedError) {
      return NextResponse.json(
        { error: "Грешка при проверка на потвърдени часове." },
        { status: 500 }
      );
    }

    const { data: manualAppointments = [], error: manualError } =
      await supabase
        .from("manual_appointments")
        .select("appointment_hour")
        .eq("appointment_date", date);

    if (manualError) {
      return NextResponse.json(
        { error: "Грешка при проверка на ръчни часове." },
        { status: 500 }
      );
    }

    const busyHours = new Set([
      ...confirmedAppointments.map((appointment) => appointment.preferred_hour),
      ...manualAppointments.map((appointment) => appointment.appointment_hour),
    ]);

    const availableHours = workingHours.filter((hour) => !busyHours.has(hour));

    return NextResponse.json({
      date,
      availableHours,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Възникна грешка. Опитайте отново." },
      { status: 500 }
    );
  }
}