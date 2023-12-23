import { getMinMaxReminderTime } from "@/lib/dateTimeFun";
import { maxReminderRange, minReminderRange } from "@/static/maxReminderRange";
import { z } from "zod";

const { minDate, maxDate } = getMinMaxReminderTime();
export const reminderDialogSchema = z.object({
  dueDate: z
    .date({ required_error: "Before Saving please add date" })
    .max(maxDate, { message: "Date should not be greater than today+27" })
    .min(minDate, { message: "Reminder should start from tomorrow" }),
  shouldSendMail: z.boolean(),
});
