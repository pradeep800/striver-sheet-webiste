import { maxReminderRange, minReminderRange } from "@/static/maxReminderRange";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);
export function getMinMaxReminderTime(): { minDate: Date; maxDate: Date } {
  const date = dayjs(new Date())
    .tz("Asia/Kolkata")
    .set("second", 0)
    .set("minute", 0)
    .set("hour", 0)
    .set("millisecond", 0);

  const minDate = date.add(minReminderRange, "day").toISOString();

  const maxDate = date.add(maxReminderRange, "day").toISOString();
  return { minDate: new Date(minDate), maxDate: new Date(maxDate) };
}

export function getIndianTime(isoString = new Date().toISOString()) {
  const day = dayjs(isoString).tz("Asia/Kolkata");
  return {
    day: day.date(),
    month: day.month() + 1,
    year: day.year(),
  };
}
export function getDate(isoString = new Date().toISOString()) {
  const { day, month, year } = getIndianTime(isoString);
  return `${day}/${month}/${year}`;
}
