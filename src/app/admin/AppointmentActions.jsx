"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AppointmentActions({ appointment }) {
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);

  async function updateStatus(status) {
    setIsUpdating(true);

    try {
      const response = await fetch(`/api/appointments/${appointment.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        alert("Статусът не беше обновен. Опитайте отново.");
        setIsUpdating(false);
        return;
      }

      router.refresh();
    } catch (error) {
      alert("Възникна грешка. Опитайте отново.");
      setIsUpdating(false);
    }
  }

  const phoneNumber = `359${appointment.phone
    .replace(/\D/g, "")
    .replace(/^0/, "")}`;

  const confirmationMessage = `Здравейте, ${appointment.name}! Получихме вашата заявка за час за ${appointment.service} на ${appointment.preferred_date} в ${appointment.preferred_hour}. Моля, потвърдете дали часът е удобен за Вас.`;

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    confirmationMessage
  )}`;

  const viberUrl = `viber://chat?number=%2B${phoneNumber}`;
  if (appointment.status === "cancelled") {
    return (
      <span className="text-xs font-medium text-slate-400">
        Няма активни действия
      </span>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        disabled={isUpdating || appointment.status === "confirmed"}
        onClick={() => updateStatus("confirmed")}
        className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-100 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Потвърди
      </button>

      <button
        type="button"
        disabled={isUpdating || appointment.status === "cancelled"}
        onClick={() => updateStatus("cancelled")}
        className="rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Откажи
      </button>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-700 transition hover:bg-sky-100"
      >
        WhatsApp
      </a>
      <a
        href={viberUrl}
        className="rounded-full bg-purple-50 px-3 py-1.5 text-xs font-semibold text-purple-700 transition hover:bg-purple-100"
      >
        Viber
      </a>
    </div>
  );
}