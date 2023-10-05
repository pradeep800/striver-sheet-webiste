import { z } from "zod";

export const aiMessageValidator = z.object({
  message: z.string().max(1500),
  questionsNumber: z.number(),
});
