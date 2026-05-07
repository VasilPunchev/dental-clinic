"use client";

import { useState } from "react";
import Link from "next/link";

const services = [
    "Профилактичен преглед",
    "Почистване на зъбен камък",
    "Бондинг",
    "Алайнери",
    "Лечение на кариес",
    "Естетична стоматология",
    "Консултация",
];

export default function AppointmentPage() {
    const today = new Date().toISOString().split("T")[0];

    const [form, setForm] = useState({
        name: "",
        phone: "",
        service: "",
        preferredDate: today,
        preferredHour: "",
        message: "",
    });

    const [status, setStatus] = useState("");
    const [statusType, setStatusType] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);



    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const phoneDigits = form.phone.replace(/\D/g, "");

        const nameParts = form.name.trim().split(/\s+/);
        const cyrillicNameRegex = /^[А-Я][а-я]+(?:-[А-Я][а-я]+)?$/;

        if (nameParts.length < 2) {
            setStatus("Моля, въведете име и фамилия.");
            setStatusType("error");
            return;
        }

        if (nameParts.some((part) => !cyrillicNameRegex.test(part))) {
            setStatus("Моля, въведете име и фамилия на кирилица, започващи с главна буква.");
            setStatusType("error");
            return;
        }

        if (phoneDigits.length < 8) {
            setStatus("Моля, въведете валиден телефонен номер.");
            setStatusType("error");
            return;
        }

        if (!form.service || !form.preferredDate || !form.preferredHour) {
            setStatus("Моля, попълнете всички задължителни полета.");
            setStatusType("error");
            return;
        }

        setStatus("Изпращане на заявката...");
        setStatusType("loading");
        setIsSubmitting(true);

        try {
            const response = await fetch("/api/appointments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            const data = await response.json();

            if (!response.ok) {
                setStatus(data.error || "Възникна грешка. Опитайте отново.");
                setStatusType("error");
                setIsSubmitting(false);
                return;
            }

            setStatus(
                "Заявката е изпратена успешно. Ще се свържем с вас за потвърждение."
            );
            setStatusType("success");

            setForm({
                name: "",
                phone: "",
                service: "",
                preferredDate: today,
                preferredHour: "",
                message: "",
            });
            setIsSubmitting(false);
        } catch (error) {
            setStatus("Възникна грешка при изпращане. Опитайте отново.");
            setStatusType("error");
            setIsSubmitting(false);
        }
    }

    return (
        <main className="min-h-screen bg-slate-50 text-slate-900">
            <header className="border-b border-slate-200 bg-white">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                    <Link href="/" className="text-xl font-bold text-sky-700">
                        Д-р Копринка Чорбаджиева
                    </Link>

                    <Link
                        href="/"
                        className="rounded-full border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-700 transition hover:border-sky-300 hover:text-sky-700"
                    >
                        Начало
                    </Link>
                </div>
            </header>

            <section className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[1fr_0.9fr]">
                <div>
                    <p className="mb-4 inline-flex rounded-full bg-sky-100 px-4 py-2 text-sm font-medium text-sky-700">
                        Онлайн заявка за час
                    </p>

                    <h1 className="max-w-2xl text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl md:text-[44px]">
                        Запазете час за преглед или консултация
                    </h1>

                    <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                        Попълнете формата и ще се свържем с вас за потвърждение. Заявката
                        не е автоматично потвърден час.
                    </p>

                    <div className="mt-8 grid gap-4 sm:grid-cols-2">
                        <div className="rounded-3xl bg-white p-6 shadow-sm">
                            <p className="text-sm font-medium text-slate-500">
                                Телефон за връзка
                            </p>
                            <p className="mt-2 text-xl font-bold text-slate-950">
                                0888 498 226
                            </p>
                            <p className="mt-2 text-sm text-slate-500">
                                За спешни въпроси можете да се свържете директно по телефон.
                            </p>
                        </div>

                        <div className="rounded-3xl bg-white p-6 shadow-sm">
                            <p className="text-sm font-medium text-slate-500">
                                Работно време
                            </p>
                            <p className="mt-2 text-xl font-bold text-slate-950">
                                Понеделник - Петък
                            </p>
                            <p className="mt-1 text-slate-600">09:00 - 18:00</p>
                        </div>
                    </div>

                    <div className="mt-6 rounded-3xl bg-white p-6 shadow-sm">
                        <p className="font-semibold text-slate-950">
                            Какво се случва след изпращане?
                        </p>

                        <div className="mt-4 grid gap-3 text-sm text-slate-600">
                            <div className="flex gap-3">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-700">
                                    1
                                </span>
                                <p>Получаваме вашата заявка за час.</p>
                            </div>

                            <div className="flex gap-3">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-700">
                                    2
                                </span>
                                <p>Преглеждаме желаната дата, час и услуга.</p>
                            </div>

                            <div className="flex gap-3">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-700">
                                    3
                                </span>
                                <p>Свързваме се с вас за потвърждение.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="rounded-[2rem] bg-white p-5 pb-7 shadow-2xl shadow-slate-200 sm:p-6 sm:pb-8"
                >
                    <div className="mb-6">
                        <p className="text-sm font-semibold uppercase tracking-wide text-sky-600">
                            Форма за заявка
                        </p>
                        <h2 className="mt-2 text-2xl font-bold text-slate-950">
                            Данни за контакт
                        </h2>
                        <p className="mt-2 text-sm leading-6 text-slate-500">
                            Попълнете коректно данните си, за да можем да се свържем с вас.
                        </p>
                    </div>

                    <div className="grid gap-5">
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Име и фамилия
                            </label>
                            <input
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                required
                                placeholder="Напр. Иван Петров"
                                className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Телефон
                            </label>
                            <input
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                required
                                placeholder="Напр. 0888 123 456"
                                className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Услуга
                            </label>
                            <select
                                name="service"
                                value={form.service}
                                onChange={handleChange}
                                required
                                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                            >
                                <option value="">Изберете услуга</option>
                                {services.map((service) => (
                                    <option key={service} value={service}>
                                        {service}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="grid gap-5 sm:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Предпочитана дата
                                </label>
                                <input
                                    type="date"
                                    name="preferredDate"
                                    value={form.preferredDate}
                                    onChange={handleChange}
                                    min={today}
                                    required
                                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-700 outline-none transition [color-scheme:light] focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Предпочитан час
                                </label>
                                <select
                                    name="preferredHour"
                                    value={form.preferredHour}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-700 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                                >
                                    <option value="">Изберете час</option>
                                    <option value="09:00">09:00</option>
                                    <option value="10:00">10:00</option>
                                    <option value="11:00">11:00</option>
                                    <option value="12:00">12:00</option>
                                    <option value="13:00">13:00</option>
                                    <option value="14:00">14:00</option>
                                    <option value="15:00">15:00</option>
                                    <option value="16:00">16:00</option>
                                    <option value="17:00">17:00</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Допълнително съобщение
                            </label>
                            <textarea
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                rows={4}
                                placeholder="Опишете накратко причината за посещението"
                                className="w-full resize-none rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="rounded-full bg-sky-600 px-7 py-3 font-semibold text-white shadow-lg shadow-sky-600/20 transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-slate-400 disabled:shadow-none"
                        >
                            {isSubmitting ? "Изпращане..." : "Изпрати заявка"}
                        </button>
                        <p className="text-center text-xs leading-5 text-slate-500">
                            Изпращането на заявка не потвърждава автоматично час. Ще се свържем с вас за
                            потвърждение.
                        </p>
                        {status && (
                            <p
                                className={`rounded-2xl px-4 py-3 text-sm font-medium ${statusType === "success"
                                    ? "bg-emerald-50 text-emerald-700"
                                    : statusType === "error"
                                        ? "bg-red-50 text-red-700"
                                        : "bg-sky-50 text-sky-700"
                                    }`}
                            >
                                {status}
                            </p>
                        )}
                    </div>
                </form>
            </section>
        </main>
    );
}