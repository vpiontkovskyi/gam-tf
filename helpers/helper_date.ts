export function getDayPlusNDays(n: number): number {
  const currentDate = new Date();
  const futureDate = new Date();
  futureDate.setDate(currentDate.getDate() + n);
  return futureDate.getDate();
}

export function isDayInCurrentMonth(n: number): boolean {
  const currentDate = new Date();
  const futureDate = new Date();
  futureDate.setDate(currentDate.getDate() + n);
  let currentMonth = currentDate.getMonth();
  let futureMonth = futureDate.getMonth();
  return currentMonth !== futureMonth;
}

export function getMonthNumber(n: number): number {
  const currentDate = new Date();
  const futureDate = new Date();
  futureDate.setDate(currentDate.getDate() + n);
  return futureDate.getMonth() + 1;
}
