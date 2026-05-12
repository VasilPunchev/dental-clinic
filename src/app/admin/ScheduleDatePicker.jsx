"use client";

import { useRouter } from "next/navigation";

export default function ScheduleDatePicker({ selectedDate }) {
  const router = useRouter();

  function handleChange(event) {
    const date = event.target.value;

    if (!date) {
      return;
    }

    router.push(`/admin/grafik?date=${date}`);
  }

  return (
    <div className="mb-6 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
      <label className="grid gap-2 text-sm font-semibold text-slate-700">
        Избери дата
        <input
          type="date"
          value={selectedDate}
          onChange={handleChange}
          className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-400 sm:max-w-xs"
        />
      </label>
    </div>
  );
}