import Link from "next/link";
import ResultsGallery from "./ResultsGallery";
const services = [
  {
    title: "Бондинг",
    description:
      "Естетична корекция на форма, дължина и малки несъвършенства по зъбите с композитен материал.",
    icon: "✨",
  },
  {
    title: "Алайнери",
    description:
      "Прозрачни шини за постепенно и дискретно подреждане на зъбите без класически брекети.",
    icon: "😁",
  },
  {
    title: "Профилактични прегледи",
    description:
      "Редовни прегледи за ранно откриване на проблеми и поддържане на добра орална хигиена.",
    icon: "🦷",
  },
  {
    title: "Почистване на зъбен камък",
    description:
      "Професионално почистване и полиране за свеж дъх, здрави венци и по-красива усмивка.",
    icon: "🪥",
  },
  {
    title: "Лечение на кариеси",
    description:
      "Щадящо лечение и възстановяване на зъбите с естетични и функционални пломби.",
    icon: "🛡️",
  },
  {
    title: "Естетична стоматология",
    description:
      "Индивидуален подход към визията на усмивката чрез модерни естетични решения.",
    icon: "💎",
  },
];
const results = [
  {
    title: "Преди / След",
    image: "/results/result-1.jpg",
  },
  {
    title: "Преди / След",
    image: "/results/result-2.jpg",
  },
  {
    title: "Преди / След",
    image: "/results/result-3.jpg",
  },
  {
    title: "Преди / След",
    image: "/results/result-4.jpg",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="max-w-[170px] text-lg font-bold leading-tight text-sky-700 sm:max-w-none sm:text-xl">
            Д-р Копринка Чорбаджиева
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
            <a href="#services" className="transition hover:text-sky-700">
              Услуги
            </a>
            <a href="#results" className="transition hover:text-sky-700">
              Резултати
            </a>
            <a href="#about" className="transition hover:text-sky-700">
              За кабинета
            </a>
            <a href="#contact" className="transition hover:text-sky-700">
              Контакти
            </a>
          </nav>

          <Link
            href="/zapazi-chas"
            className="rounded-full bg-sky-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-sky-700 sm:px-5 sm:text-sm"
          >
            Запази час


          </Link>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute left-1/2 top-0 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-sky-200/40 blur-3xl" />

        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-12 md:grid-cols-[1.05fr_0.95fr] md:items-center md:py-20 lg:py-24">
          <div>
            <p className="mb-5 inline-flex rounded-full border border-sky-200 bg-white px-4 py-2 text-sm font-semibold text-sky-700 shadow-sm">
              Дентална грижа с внимание и професионализъм
            </p>

            <h1 className="mb-6 max-w-3xl text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl md:text-5xl lg:text-6xl">
              Професионална грижа за здрава и красива усмивка
            </h1>

            <p className="mb-8 max-w-2xl text-lg leading-8 text-slate-600">
              Индивидуален подход, спокойна атмосфера и съвременна дентална грижа —
              от профилактика и лечение до бондинг, алайнери и естетична
              стоматология.
            </p>



            <div className="mt-8 grid gap-3 text-sm text-slate-600 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                ✓ Индивидуален подход
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                ✓ Естетични резултати
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                ✓ Спокойна атмосфера
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-8 -top-8 h-44 w-44 rounded-full bg-sky-200 blur-3xl" />
            <div className="absolute -bottom-8 -right-8 h-44 w-44 rounded-full bg-cyan-200 blur-3xl" />

            <div className="relative overflow-hidden rounded-[2.25rem] border border-slate-200 bg-white p-4 shadow-2xl shadow-slate-200">
              <div className="rounded-[1.75rem] bg-gradient-to-br from-sky-100 via-white to-cyan-50 p-7">
                <div className="rounded-3xl bg-slate-900 p-6 text-white shadow-lg shadow-slate-900/20">
                  <p className="text-sm text-slate-300">Дентален кабинет</p>
                  <p className="mt-2 text-2xl font-bold">
                    Д-р Копринка Чорбаджиева
                  </p>
                  <p className="mt-3 text-sm leading-6 text-slate-300">
                    Профилактика, лечение, бондинг, алайнери и естетична
                    стоматология.
                  </p>
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl bg-white p-5 shadow-sm">
                    <p className="text-sm font-medium text-slate-500">
                      Работно време
                    </p>
                    <p className="mt-2 text-lg font-bold text-slate-950">
                      Понеделник - Петък
                    </p>
                    <p className="mt-1 text-slate-600">09:00 - 18:00</p>
                  </div>

                  <div className="rounded-3xl bg-white p-5 shadow-sm">
                    <p className="text-sm font-medium text-slate-500">
                      Телефон
                    </p>
                    <p className="mt-2 text-lg font-bold text-slate-950">
                      0888 498 226
                    </p>
                    <p className="mt-1 text-sm text-slate-600">
                      За връзка с кабинета
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl bg-white p-5 shadow-sm">
                    <p className="text-3xl font-bold text-sky-700">25+</p>
                    <p className="mt-2 text-sm text-slate-600">години опит</p>
                  </div>

                  <div className="rounded-3xl bg-white p-5 shadow-sm">
                    <p className="text-3xl font-bold text-sky-700">1000+</p>
                    <p className="mt-2 text-sm text-slate-600">доволни пациенти</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-sky-600">
              Услуги
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
              Дентални услуги с индивидуален подход
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              Профилактика, лечение и естетични решения, съобразени с нуждите,
              комфорта и усмивката на всеки пациент.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.title}
                className="group rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-sky-200 hover:shadow-xl hover:shadow-slate-200"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-100 text-2xl transition group-hover:bg-sky-600">
                  <span className="transition group-hover:scale-110">
                    {service.icon}
                  </span>
                </div>

                <h3 className="mb-3 text-xl font-bold text-slate-950">
                  {service.title}
                </h3>

                <p className="text-sm leading-7 text-slate-600">
                  {service.description}
                </p>


              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="results" className="bg-slate-50 py-10">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 max-w-2xl">

            <h2 className="text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
              Реални резултати
            </h2>

          </div>

          <ResultsGallery results={results} />
        </div>
      </section>
      <section id="about" className="bg-slate-50 py-16">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-[1fr_1fr] md:items-stretch">
          <div className="h-fit rounded-[2rem] bg-white p-8 shadow-xl shadow-slate-200">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-sky-600">
              За кабинета
            </p>

            <h2 className="mb-5 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
              Спокойна среда и внимателен подход към пациента
            </h2>

            <p className="leading-8 text-slate-600">
              В кабинета се обръща внимание не само на лечението, но и на комфорта
              на пациента. Всяка процедура се обяснява ясно, спокойно и се
              съобразява с конкретния случай.
            </p>

            <div className="mt-8 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 px-4 py-3">
                ✓ Ясно обяснение
              </div>

              <div className="rounded-2xl bg-slate-50 px-4 py-3">
                ✓ Индивидуален план
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <p className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-100 text-xl">
                🦷
              </p>
              <h3 className="font-bold text-slate-950">Съвременна дентална грижа</h3>
              <p className="mt-2 leading-7 text-slate-600">
                Профилактика, лечение и естетични решения според нуждите на пациента.
              </p>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <p className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-100 text-xl">
                💬
              </p>
              <h3 className="font-bold text-slate-950">Внимание към пациента</h3>
              <p className="mt-2 leading-7 text-slate-600">
                Спокоен подход, подробно обяснение и съобразяване с конкретния случай.
              </p>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <p className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-100 text-xl">
                📅
              </p>
              <h3 className="font-bold text-slate-950">Лесно записване</h3>
              <p className="mt-2 leading-7 text-slate-600">
                Онлайн заявка за час директно през сайта и последващо потвърждение.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="bg-slate-900 py-16 text-white md:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-[1fr_1fr] md:items-start">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-sky-300">
              Контакти
            </p>

            <h2 className="text-3xl font-bold leading-tight md:text-4xl">
              Запазете час и намерете кабинета лесно
            </h2>

            <p className="mt-5 max-w-xl leading-8 text-slate-300">
              Изпратете онлайн заявка или отворете навигация директно до кабинета.
              Ще се свържем с вас за потвърждение на удобен ден и час.
            </p>

            <div className="mt-8 grid gap-3 text-sm text-slate-300">
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-sky-400/10 text-sky-300">
                  ✓
                </span>
                <p>Удобна локация в гр. Пловдив</p>
              </div>

              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-sky-400/10 text-sky-300">
                  ✓
                </span>
                <p>Онлайн заявка за час</p>
              </div>

              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-sky-400/10 text-sky-300">
                  ✓
                </span>
                <p>Бърза връзка по телефон</p>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-[2rem] bg-white text-slate-900 shadow-2xl shadow-slate-950/30">
            <div className="grid gap-4 p-6 sm:grid-cols-2">
              <div className="rounded-3xl bg-slate-50 p-5">
                <p className="text-sm font-medium text-slate-500">Кабинет</p>
                <p className="mt-2 font-bold text-slate-950">
                  Д-р Копринка Чорбаджиева
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  гр. Пловдив, ул. Сан Стефано 68
                </p>
              </div>

              <div className="rounded-3xl bg-slate-50 p-5">
                <p className="text-sm font-medium text-slate-500">Връзка</p>
                <p className="mt-2 font-bold text-slate-950">0888 498 226</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  kchorbadzhieva@abv.bg
                </p>
              </div>
            </div>

            <div className="px-6 pb-6">
              <div className="flex flex-col gap-3 sm:flex-row">

                <a
                  href="https://www.google.com/maps/search/?api=1&query=гр.%20Пловдив%2C%20ул.%20Сан%20Стефано%2068"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 justify-center rounded-full border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:border-sky-300 hover:text-sky-700"
                >
                  Отвори навигация
                </a>
              </div>
            </div>

            <div className="px-6 pb-6">
              <div className="overflow-hidden rounded-3xl border border-slate-200">
                <iframe
                  title="Карта до дентален кабинет Д-р Копринка Чорбаджиева"
                  src="https://www.google.com/maps?q=гр.%20Пловдив%2C%20ул.%20Сан%20Стефано%2068&output=embed"
                  className="h-56 w-full border-0 md:h-64"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}