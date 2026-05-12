import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY
);

export async function POST(request) {
  try {
    const body = await request.json();

    const appointmentDate = body.appointmentDate;
    const appointmentHour = body.appointmentHour;
    const name = body.name;
    const phone = body.phone || "";
    const note = body.note || "";

    if (!appointmentDate || !appointmentHour || !name) {
      return NextResponse.json(
        { error: "Дата, час и име са задължителни." },
        { status: 400 }
      );
    }

    const { error } = await supabase.from("manual_appointments").insert({
      appointment_date: appointmentDate,
      appointment_hour: appointmentHour,
      name,
      phone,
      note,
      source: "phone",
    });

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json(
          { error: "Този час вече е добавен в графика." },
          { status: 409 }
        );
      }

      return NextResponse.json(
        { error: "Часът не беше добавен. Опитайте отново." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Възникна грешка. Опитайте отново." },
      { status: 500 }
    );
  }
}