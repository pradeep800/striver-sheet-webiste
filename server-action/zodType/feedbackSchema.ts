import { z } from "zod";

export const feedBackSchema = z.object(
  {
    type: z.enum(["BUG", "FEEDBACK", "REQUEST"]),
    content: z
      .string()
      .min(10, { message: "feedback should atleast contain 10 character" })
      .max(1000, { message: "Feedback should be under 1000 characters" }),
  },
  { required_error: "Please fill the form before submitting" }
);
