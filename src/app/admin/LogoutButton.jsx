"use client";

export default function LogoutButton() {
  async function handleLogout() {
    await fetch("/api/admin/logout", {
      method: "POST",
    });

    window.location.href = "/admin/login";
  }

  return (
    <button
      onClick={handleLogout}
      className="rounded-full border border-red-200 px-5 py-2 text-sm font-semibold text-red-600 transition hover:border-red-300 hover:bg-red-50"
    >
      Изход
    </button>
  );
}