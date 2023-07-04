import { InferModel } from "drizzle-orm";
import { users } from "./schema";

export type DbUser = InferModel<typeof users>;
