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

export default function SchedulePanel({
  selectedDate,
  confirmedAppointments,
  manualAppointments,
}) {
  function getConfirmedAppointment(hour) {
    return confirmedAppointments.find(
      (appointment) => appointment.preferred_hour === hour
    );
  }

  function getManualAppointment(hour) {
    return manualAppointments.find(
      (appointment) => appointment.appointment_hour === hour
    );
  }

  return (
    <section className="mb-8 rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-200">
      <div className="mb-5">
        <p className="text-sm font-semibold uppercase tracking-wide text-sky-600">
          Дневен график
        </p>

        <h2 className="mt-2 text-2xl font-bold text-slate-950">
          График за {selectedDate}
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Потвърдените заявки от сайта и часовете, добавени по телефон, се
          показват тук.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {hours.map((hour) => {
          const confirmedAppointment = getConfirmedAppointment(hour);
          const manualAppointment = getManualAppointment(hour);

          if (confirmedAppointment) {
            return (
              <div
                key={hour}
                className="rounded-2xl border border-sky-200 bg-sky-50 p-4"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-bold text-sky-800">
                      {hour} — Потвърден от сайта
                    </p>
                    <p className="mt-1 text-sm text-slate-700">
                      {confirmedAppointment.name}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {confirmedAppointment.service}
                    </p>
                  </div>

                  <p className="text-sm font-semibold text-sky-700">
                    {confirmedAppointment.phone}
                  </p>
                </div>
              </div>
            );
          }

          if (manualAppointment) {
            return (
              <div
                key={hour}
                className="rounded-2xl border border-orange-200 bg-orange-50 p-4"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-bold text-orange-800">
                      {hour} — Записан по телефон
                    </p>
                    <p className="mt-1 text-sm text-slate-700">
                      {manualAppointment.name}
                    </p>
                    {manualAppointment.note && (
                      <p className="mt-1 text-xs text-slate-500">
                        {manualAppointment.note}
                      </p>
                    )}
                  </div>

                  {manualAppointment.phone && (
                    <p className="text-sm font-semibold text-orange-700">
                      {manualAppointment.phone}
                    </p>
                  )}
                </div>
              </div>
            );
          }

          return (
            <div
              key={hour}
              className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3"
            >
              <p className="font-bold text-emerald-800">
                {hour} — Свободен час
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}