"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const hours = [
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

export default function ManualAppointmentForm() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        appointmentDate: "",
        appointmentHour: "",
        name: "",
        phone: "",
        note: "",
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
            const response = await fetch("/api/manual-appointments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (!response.ok) {
                alert(result.error || "Часът не беше добавен.");
                setIsSubmitting(false);
                return;
            }

            setFormData({
                appointmentDate: "",
                appointmentHour: "",
                name: "",
                phone: "",
                note: "",
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
                    График
                </p>
                <h2 className="mt-1 text-xl font-bold text-slate-950">
                    Добави час по телефон
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                    Използвайте тази форма за пациенти, записани извън сайта.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="grid gap-3 md:grid-cols-2">
                <label className="grid gap-2 text-sm font-semibold text-slate-700">
                    Дата *
                    <input
                        type="date"
                        name="appointmentDate"
                        value={formData.appointmentDate}
                        onChange={handleChange}
                        required
                        className="rounded-2xl border border-slate-200 px-3 py-2.5 text-slate-900 outline-none transition focus:border-sky-400"
                    />
                </label>

                <label className="grid gap-2 text-sm font-semibold text-slate-700">
                    Час *
                    <select
                        name="appointmentHour"
                        value={formData.appointmentHour}
                        onChange={handleChange}
                        required
                        className="rounded-2xl border border-slate-200 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-400"
                    >
                        <option value="">Изберете час</option>
                        {hours.map((hour) => (
                            <option key={hour} value={hour}>
                                {hour}
                            </option>
                        ))}
                    </select>
                </label>

                <label className="grid gap-2 text-sm font-semibold text-slate-700">
                    Име на пациент *
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Напр. Иван Петров"
                        className="rounded-2xl border border-slate-200 px-3 py-2.5 text-slate-900 outline-none transition focus:border-sky-400"
                    />
                </label>

                <label className="grid gap-2 text-sm font-semibold text-slate-700">
                    Телефон
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Напр. 0888 123 456"
                        className="rounded-2xl border border-slate-200 px-3 py-2.5 text-slate-900 outline-none transition focus:border-sky-400"
                    />
                </label>

                <label className="grid gap-2 text-sm font-semibold text-slate-700 md:col-span-2">
                    Бележка
                    <textarea
                        name="note"
                        value={formData.note}
                        onChange={handleChange}
                        placeholder="Напр. записан по телефон, контролен преглед..."
                        rows={3}
                        className="resize-none rounded-2xl border border-slate-200 px-3 py-2.5 text-slate-900 outline-none transition focus:border-sky-400"
                    />
                </label>

                <div className="md:col-span-2">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="rounded-full bg-sky-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-sky-600/20 transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isSubmitting ? "Добавяне..." : "Добави в графика"}
                    </button>
                </div>
            </form>
        </section>
    );
}