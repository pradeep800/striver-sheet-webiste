import { InferModel } from "drizzle-orm";
import { feedbacks, users } from "./schema";

export type DbUser = InferModel<typeof users>;
export type DbFeedbacks = InferModal<typeof feedbacks>;
