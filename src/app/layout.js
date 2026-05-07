import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Д-р Копринка Чорбаджиева | Дентален кабинет в Пловдив",
    template: "%s | Д-р Копринка Чорбаджиева",
  },
  description:
    "Дентален кабинет в Пловдив с фокус върху профилактика, лечение, бондинг, алайнери и естетична стоматология. Онлайн заявка за час.",
  keywords: [
    "дентален кабинет Пловдив",
    "зъболекар Пловдив",
    "Д-р Копринка Чорбаджиева",
    "бондинг Пловдив",
    "алайнери Пловдив",
    "естетична стоматология",
    "профилактичен преглед",
    "почистване на зъбен камък",
  ],
  authors: [{ name: "Д-р Копринка Чорбаджиева" }],
  creator: "Д-р Копринка Чорбаджиева",
  publisher: "Д-р Копринка Чорбаджиева",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "Д-р Копринка Чорбаджиева | Дентален кабинет в Пловдив",
    description:
      "Профилактика, лечение, бондинг, алайнери и естетична стоматология в Пловдив. Онлайн заявка за час.",
    url: "https://example.com",
    siteName: "Д-р Копринка Чорбаджиева",
    locale: "bg_BG",
    type: "website",
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="bg"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
