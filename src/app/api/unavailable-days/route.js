import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY
);

export async function POST(request) {
  try {
    const body = await request.json();

    const startDate = body.startDate;
    const endDate = body.endDate;
    const reason = body.reason || "";

    if (!startDate || !endDate) {
      return NextResponse.json(
        { error: "Начална и крайна дата са задължителни." },
        { status: 400 }
      );
    }

    if (endDate < startDate) {
      return NextResponse.json(
        { error: "Крайната дата не може да бъде преди началната." },
        { status: 400 }
      );
    }

    const { error } = await supabase.from("unavailable_days").insert({
      start_date: startDate,
      end_date: endDate,
      reason,
    });

    if (error) {
      return NextResponse.json(
        { error: "Почивният период не беше добавен. Опитайте отново." },
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