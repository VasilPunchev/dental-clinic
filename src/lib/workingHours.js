export const workingHoursByDay = {
  1: ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"],
  2: ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"],
  3: ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"],
  4: ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"],
  5: ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"],
  6: [],
  0: [],
};

export function getWorkingHoursForDate(date) {
  const day = new Date(`${date}T12:00:00`).getDay();

  return workingHoursByDay[day] || [];
}
export function isPastDate(date) {
  const today = new Date().toISOString().split("T")[0];

  return date < today;
}