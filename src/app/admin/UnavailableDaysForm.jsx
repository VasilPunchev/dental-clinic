"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function UnavailableDaysForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    reason: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/unavailable-days", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.error || "Почивният период не беше добавен.");
        setIsSubmitting(false);
        return;
      }

      setFormData({
        startDate: "",
        endDate: "",
        reason: "",
      });

      setIsSubmitting(false);
      router.refresh();
    } catch (error) {
      alert("Възникна грешка. Опитайте отново.");
      setIsSubmitting(false);
    }
  }

  return (
    <section className="mb-6 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
      <div className="mb-4">
        <p className="text-sm font-semibold uppercase tracking-wide text-sky-600">
          Почивни дни
        </p>
        <h2 className="mt-1 text-xl font-bold text-slate-950">
          Добави почивен период
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Използвайте тази форма за отпуск, празници или дни, в които кабинетът
          няма да работи.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-3 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-slate-700">
          Начална дата *
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
            className="rounded-2xl border border-slate-200 px-3 py-2.5 text-slate-900 outline-none transition focus:border-sky-400"
          />
        </label>

        <label className="grid gap-2 text-sm font-semibold text-slate-700">
          Крайна дата *
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
            className="rounded-2xl border border-slate-200 px-3 py-2.5 text-slate-900 outline-none transition focus:border-sky-400"
          />
        </label>

        <label className="grid gap-2 text-sm font-semibold text-slate-700 md:col-span-2">
          Причина
          <input
            type="text"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            placeholder="Напр. отпуск, празник, личен ангажимент..."
            className="rounded-2xl border border-slate-200 px-3 py-2.5 text-slate-900 outline-none transition focus:border-sky-400"
          />
        </label>

        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-full bg-sky-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-sky-600/20 transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Добавяне..." : "Добави почивен период"}
          </button>
        </div>
      </form>
    </section>
  );
}