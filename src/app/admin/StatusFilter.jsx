import Link from "next/link";

const filters = [
  {
    label: "Всички",
    value: "all",
    href: "/admin",
  },
  {
    label: "Нови",
    value: "new",
    href: "/admin?status=new",
  },
  {
    label: "Потвърдени",
    value: "confirmed",
    href: "/admin?status=confirmed",
  },
  {
    label: "Отказани",
    value: "cancelled",
    href: "/admin?status=cancelled",
  },
];

export default function StatusFilter({ activeStatus }) {
  return (
    <div className="mb-6 flex flex-wrap gap-2">
      {filters.map((filter) => {
        const isActive = activeStatus === filter.value;

        return (
          <Link
            key={filter.value}
            href={filter.href}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              isActive
                ? "bg-sky-600 text-white shadow-lg shadow-sky-600/20"
                : "bg-white text-slate-600 ring-1 ring-slate-200 hover:text-sky-700 hover:ring-sky-200"
            }`}
          >
            {filter.label}
          </Link>
        );
      })}
    </div>
  );
}