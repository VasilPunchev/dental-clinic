import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getWorkingHoursForDate } from "@/lib/workingHours";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY
);



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
    const workingHours = getWorkingHoursForDate(date);
    const { data: unavailableDay, error: unavailableDayError } = await supabase
      .from("unavailable_days")
      .select("id, reason")
      .lte("start_date", date)
      .gte("end_date", date)
      .maybeSingle();

    if (unavailableDayError) {
      return NextResponse.json(
        { error: "Грешка при проверка на почивни дни." },
        { status: 500 }
      );
    }

    if (unavailableDay) {
      return NextResponse.json({
        date,
        availableHours: [],
        unavailableReason: unavailableDay.reason || "Почивен ден",
      });
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