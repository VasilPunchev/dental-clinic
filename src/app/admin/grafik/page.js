import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

import LogoutButton from "../LogoutButton";
import SchedulePanel from "../SchedulePanel";
import ScheduleDatePicker from "../ScheduleDatePicker";
import { isPastDate } from "@/lib/workingHours";
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY
);

export default async function AdminSchedulePage({ searchParams }) {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get("admin-auth")?.value === "true";

  if (!isAdmin) {
    redirect("/admin/login");
  }

  const today = new Date().toISOString().split("T")[0];
  const resolvedSearchParams = await searchParams;
  const selectedDate = resolvedSearchParams?.date || today;
  const pastDateReason = isPastDate(selectedDate) ? "Изминала дата" : null;
  const { data: unavailableDay } = await supabase
    .from("unavailable_days")
    .select("id, reason")
    .lte("start_date", selectedDate)
    .gte("end_date", selectedDate)
    .maybeSingle();

  const { data: manualAppointments = [] } = await supabase
    .from("manual_appointments")
    .select("*")
    .eq("appointment_date", selectedDate)
    .order("appointment_hour", { ascending: true });

  const { data: confirmedAppointments = [] } = await supabase
    .from("appointments")
    .select("*")
    .eq("preferred_date", selectedDate)
    .eq("status", "confirmed")
    .order("preferred_hour", { ascending: true });

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-slate-500">Админ панел</p>
            <h1 className="text-xl font-bold text-slate-950">
              Дневен график
            </h1>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-2">
            <Link
              href="/admin"
              className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-sky-300 hover:text-sky-700"
            >
              Заявки
            </Link>

            <Link
              href="/admin/dobavi-chas"
              className="rounded-full bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-sky-600/20 transition hover:bg-sky-700"
            >
              Добави час
            </Link>
            <Link
              href="/admin/pochivni-dni"
              className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-sky-300 hover:text-sky-700"
            >
              Почивни дни
            </Link>
            <Link
              href="/"
              className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-sky-300 hover:text-sky-700"
            >
              Към сайта
            </Link>

            <LogoutButton />
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-4xl px-6 py-10">
        <ScheduleDatePicker selectedDate={selectedDate} />

        <SchedulePanel
          selectedDate={selectedDate}
          confirmedAppointments={confirmedAppointments}
          manualAppointments={manualAppointments}
          unavailableReason={pastDateReason || unavailableDay?.reason}
        />
      </section>
    </main>
  );
}