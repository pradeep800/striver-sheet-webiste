import { z } from "zod";

export const ChangeProfileType = z.object({
  userName: z
    .string()
    .regex(/^[a-z0-9\-]+$/, "Only character you can use is 0-9 a-z and -")
    .min(3, { message: "Username must be at least 3 character" })
    .max(40, { message: "Username should not be more then 40 characters" }),
  description: z
    .string()
    .max(200, {
      message: "Description should not be more then 200 characters",
    }),
});
