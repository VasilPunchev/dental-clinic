import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import StatusFilter from "./StatusFilter";

import LogoutButton from "./LogoutButton";
import AppointmentActions from "./AppointmentActions";
import ManualAppointmentForm from "./ManualAppointmentForm.jsx";
import SchedulePanel from "./SchedulePanel";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;

const supabase = createClient(supabaseUrl, supabaseSecretKey);

export default async function AdminPage({ searchParams }) {
    const cookieStore = await cookies();
    const isAdmin = cookieStore.get("admin-auth")?.value === "true";

    if (!isAdmin) {
        redirect("/admin/login");
    }
    const resolvedSearchParams = await searchParams;
    const activeStatus = resolvedSearchParams?.status || "all";

    let appointmentsQuery = supabase
        .from("appointments")
        .select("*")
        .order("created_at", { ascending: false });

    if (activeStatus !== "all") {
        appointmentsQuery = appointmentsQuery.eq("status", activeStatus);
    }

    const { data: appointments, error } = await appointmentsQuery;
    const today = new Date().toISOString().split("T")[0];

    const { data: manualAppointments = [], error: manualAppointmentsError } =
        await supabase
            .from("manual_appointments")
            .select("*")
            .eq("appointment_date", today)
            .order("appointment_hour", { ascending: true });

    const { data: confirmedAppointments = [], error: confirmedAppointmentsError } =
        await supabase
            .from("appointments")
            .select("*")
            .eq("preferred_date", today)
            .eq("status", "confirmed")
            .order("preferred_hour", { ascending: true });

    return (
        <main className="min-h-screen bg-slate-50 text-slate-900">
            <header className="border-b border-slate-200 bg-white">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                    <div>
                        <p className="text-sm text-slate-500">Админ панел</p>
                        <h1 className="text-xl font-bold text-slate-950">
                            Заявки за час
                        </h1>
                    </div>

                    <div className="flex flex-wrap items-center justify-end gap-2">
                        <Link
                            href="/admin/grafik"
                            className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-sky-300 hover:text-sky-700"
                        >
                            График
                        </Link>

                        <Link
                            href="/admin/dobavi-chas"
                            className="rounded-full bg-sky-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-sky-600/20 transition hover:bg-sky-700"
                        >
                            Добави час
                        </Link>
                        <Link
                            href="/"
                            className="rounded-full bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-sky-600/20 transition hover:bg-sky-700"
                        >
                            Към сайта
                        </Link>

                        <LogoutButton />
                    </div>
                </div>
            </header>

            <section className="mx-auto max-w-6xl px-6 py-10">

                <StatusFilter activeStatus={activeStatus} />
                {error && (
                    <div className="rounded-2xl bg-red-50 p-4 text-sm font-medium text-red-700">
                        Възникна грешка при зареждане на заявките.
                    </div>
                )}

                {!error && appointments.length === 0 && (
                    <div className="rounded-3xl bg-white p-8 text-center shadow-sm">
                        <h2 className="text-xl font-bold text-slate-950">
                            Все още няма заявки
                        </h2>
                        <p className="mt-2 text-slate-600">
                            Когато пациент изпрати заявка, тя ще се появи тук.
                        </p>
                    </div>
                )}

                {!error && appointments.length > 0 && (
                    <div className="overflow-hidden rounded-3xl bg-white shadow-xl shadow-slate-200">
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[900px] text-left text-sm">
                                <thead className="bg-slate-100 text-slate-600">
                                    <tr>
                                        <th className="px-5 py-4 font-semibold">Пациент</th>
                                        <th className="px-5 py-4 text-left">Бележка</th>
                                        <th className="px-5 py-4 font-semibold">Телефон</th>
                                        <th className="px-5 py-4 font-semibold">Услуга</th>
                                        <th className="px-5 py-4 font-semibold">Дата</th>
                                        <th className="px-5 py-4 font-semibold">Час</th>
                                        <th className="px-5 py-4 font-semibold">Статус</th>
                                        <th className="px-5 py-4 font-semibold">Създадена</th>
                                        <th className="px-5 py-4 font-semibold">Действия</th>

                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-slate-100">
                                    {appointments.map((appointment) => (
                                        <tr
                                            key={appointment.id}
                                            className="transition hover:bg-slate-50"
                                        >
                                            <td className="px-5 py-4 font-medium text-slate-950">
                                                {appointment.name}
                                            </td>

                                            <td className="max-w-[220px] px-5 py-4 text-xs leading-5 text-slate-500">
                                                {appointment.message || "—"}
                                            </td>

                                            <td className="px-5 py-4 text-slate-600">
                                                {appointment.phone}
                                            </td>

                                            <td className="px-5 py-4 text-slate-600">
                                                {appointment.service}
                                            </td>

                                            <td className="px-5 py-4 text-slate-600">
                                                {appointment.preferred_date}
                                            </td>

                                            <td className="px-5 py-4 text-slate-600">
                                                {appointment.preferred_hour}
                                            </td>

                                            <td className="px-5 py-4">
                                                <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700">
                                                    {appointment.status}
                                                </span>
                                            </td>

                                            <td className="px-5 py-4 text-slate-500">
                                                {new Date(appointment.created_at).toLocaleString(
                                                    "bg-BG"
                                                )}
                                            </td>
                                            <td className="px-5 py-4">
                                                <AppointmentActions appointment={appointment} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </section>
        </main>
    );
}