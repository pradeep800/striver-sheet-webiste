"use server";
import { revalidatePath } from "next/cache";
import { zact } from "zact/server";
import { z } from "zod";

export const Revalidate = zact(z.object({ path: z.string() }))(
  async (input) => {
    revalidatePath(input.path);
  }
);
