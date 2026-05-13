import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

import LogoutButton from "../LogoutButton";
import ManualAppointmentForm from "../ManualAppointmentForm";

export default async function AddManualAppointmentPage() {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get("admin-auth")?.value === "true";

  if (!isAdmin) {
    redirect("/admin/login");
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-slate-500">Админ панел</p>
            <h1 className="text-xl font-bold text-slate-950">
              Добави час по телефон
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
              href="/admin/grafik"
              className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-sky-300 hover:text-sky-700"
            >
              График
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
        <ManualAppointmentForm />
      </section>
    </main>
  );
}