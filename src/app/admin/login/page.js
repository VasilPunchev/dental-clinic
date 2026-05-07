"use client";

import { useState } from "react";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    setStatus("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus(data.error || "Грешна парола.");
        setIsSubmitting(false);
        return;
      }

      window.location.href = "/admin";
    } catch (error) {
      setStatus("Възникна грешка. Опитайте отново.");
      setIsSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 text-slate-900">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-[2rem] bg-white p-8 shadow-2xl shadow-slate-200"
      >
        <p className="text-sm font-semibold uppercase tracking-wide text-sky-600">
          Админ достъп
        </p>

        <h1 className="mt-2 text-3xl font-bold text-slate-950">
          Вход в админ панела
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-500">
          Въведете админ паролата, за да видите заявките за час.
        </p>

        <div className="mt-8">
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Парола
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Въведете парола"
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-6 w-full rounded-full bg-sky-600 px-7 py-3 font-semibold text-white shadow-lg shadow-sky-600/20 transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-slate-400 disabled:shadow-none"
        >
          {isSubmitting ? "Проверка..." : "Вход"}
        </button>

        {status && (
          <p className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {status}
          </p>
        )}
      </form>
    </main>
  );
}