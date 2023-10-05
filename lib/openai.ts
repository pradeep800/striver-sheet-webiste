import { env } from "@/env.mjs";
import Openai from "openai";
export const openai = new Openai({ apiKey: env.OPENAI_KEY });
