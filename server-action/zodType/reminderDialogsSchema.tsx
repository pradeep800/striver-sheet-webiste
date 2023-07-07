import { maxReminderRange, minReminderRange } from "@/static/maxReminderRange";
import { z } from "zod";

const currentDate = new Date();
const options = { timeZone: "Asia/Kolkata" };
currentDate.setHours(0, 0, 0, 0);
const indianDate = currentDate.toLocaleString("en-US", options);
const minDate = new Date(indianDate);
const maxDate = new Date(indianDate);
minDate.setDate(currentDate.getDate() + minReminderRange);
maxDate.setDate(currentDate.getDate() + maxReminderRange);
export const reminderDialogSchema = z.object({
  dueDate: z
    .date({ required_error: "Before Saving please add date" })
    .max(maxDate, { message: "Date should not be greater than today+27" })
    .min(minDate, { message: "Reminder can start after today" }),
  shouldSendMail: z.boolean(),
});
