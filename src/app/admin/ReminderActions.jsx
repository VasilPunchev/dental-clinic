import { formatBulgarianPhoneForMessaging } from "@/lib/phone";

export default function ReminderActions({ name, phone, hour }) {
  const phoneNumber = formatBulgarianPhoneForMessaging(phone);

  if (!phoneNumber) {
    return null;
  }

  const reminderMessage = `Здравейте, ${name}! Напомняме Ви, че имате запазен час днес в ${hour} в дентален кабинет Д-р Копринка Чорбаджиева. Очакваме Ви!`;

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    reminderMessage
  )}`;

  const viberUrl = `viber://chat?number=%2B${phoneNumber}`;

  return (
    <div className="flex flex-wrap gap-2 sm:justify-end">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-100"
      >
        WhatsApp
      </a>

      <a
        href={viberUrl}
        className="rounded-full bg-purple-50 px-2.5 py-1 text-xs font-semibold text-purple-700 transition hover:bg-purple-100"
      >
        Viber
      </a>
    </div>
  );
}