"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function ManualAppointmentForm() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        appointmentDate: "",
        appointmentHour: "",
        name: "",
        phone: "",
        note: "",
    });

    const [availableHours, setAvailableHours] = useState([]);
    const [isLoadingHours, setIsLoadingHours] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (!formData.appointmentDate) {
            setAvailableHours([]);
            return;
        }

        async function loadAvailableHours() {
            setIsLoadingHours(true);

            try {
                const response = await fetch(
                    `/api/available-hours?date=${formData.appointmentDate}`
                );

                const result = await response.json();

                if (!response.ok) {
                    setAvailableHours([]);
                    return;
                }

                setAvailableHours(result.availableHours || []);

                if (
                    formData.appointmentHour &&
                    !result.availableHours?.includes(formData.appointmentHour)
                ) {
                    setFormData((current) => ({
                        ...current,
                        appointmentHour: "",
                    }));
                }
            } catch (error) {
                setAvailableHours([]);
            } finally {
                setIsLoadingHours(false);
            }
        }

        loadAvailableHours();
    }, [formData.appointmentDate, formData.appointmentHour]);

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
                        disabled={isLoadingHours || availableHours.length === 0}
                        className="rounded-2xl border border-slate-200 px-3 py-2.5 text-slate-900 outline-none transition focus:border-sky-400 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
                    >
                        <option value="">
                            {isLoadingHours
                                ? "Зареждане на свободни часове..."
                                : availableHours.length === 0
                                    ? "Няма свободни часове"
                                    : "Изберете час"}
                        </option>

                        {availableHours.map((hour) => (
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