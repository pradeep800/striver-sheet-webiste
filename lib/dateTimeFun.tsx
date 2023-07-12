import { maxReminderRange, minReminderRange } from "@/static/maxReminderRange";

export function getMinMaxReminderTime() {
  const currentDate = new Date();
  const options = { timeZone: "Asia/Kolkata" };
  const indianDateAndTime = currentDate.toLocaleString("en-US", options);
  const indianDate = indianDateAndTime.substring(0, 9) as string;
  const minDate = new Date(indianDate);
  const maxDate = new Date(indianDate);
  minDate.setDate(currentDate.getDate() + minReminderRange);
  maxDate.setDate(currentDate.getDate() + maxReminderRange);
  return { minDate, maxDate };
}

export function getIndianTime(isostring: string) {
  const currentDate = new Date(isostring);

  const options = { timeZone: "Asia/Kolkata" };
  const indianDate = currentDate.toLocaleDateString("en-US", options);
  const monthDayYear = indianDate.match(/(\d+)\/(\d+)\/(\d+)/);
  if (monthDayYear) {
    const month = parseInt(monthDayYear[1] as string);
    const day = parseInt(monthDayYear[2] as string);
    const year = parseInt(monthDayYear[3] as string);
    return { month, day, year };
  }
  return { month: -1, day: -1, year: -1 }; //not going to happen
}