import { maxReminderRange, minReminderRange } from "@/static/maxReminderRange";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);
export function getMinMaxReminderTime(): { minDate: Date; maxDate: Date } {
  const currentDate = new Date();
  const options = { timeZone: "Asia/Kolkata" };
  const indianDateAndTime = currentDate.toLocaleString("en-US", options);
  const indianDate = indianDateAndTime.substring(0, 9) as string;

  const date = dayjs.tz(indianDate, "Asia/Kolkata");
  const minDate = date.add(minReminderRange, "day").toISOString();

  const maxDate = date.add(maxReminderRange, "day").toISOString();
  console.log(maxDate, minDate);
  return { minDate: new Date(minDate), maxDate: new Date(maxDate) };
}

export function getIndianTime(isostring: string) {
  const currentDate = new Date(isostring);

  const options = { timeZone: "Asia/Kolkata" };
  const indianDate = currentDate.toLocaleDateString("en-US", options);
  return getMDYFromIndianTime(indianDate);
}
function getMDYFromIndianTime(date: string): {
  month: number;
  day: number;
  year: number;
} {
  // string type 7/12/2023'
  const monthDayYear = date.match(/(\d+)\/(\d+)\/(\d+)/);
  if (monthDayYear) {
    const month = parseInt(monthDayYear[1] as string);
    const day = parseInt(monthDayYear[2] as string);
    const year = parseInt(monthDayYear[3] as string);

    return { month, day, year };
  }
  return { month: -1, day: -1, year: -1 }; //not going to happen
}
