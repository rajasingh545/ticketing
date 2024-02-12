import { TRPCError } from "@trpc/server";
import { ZodError } from "zod";

export const zodValidationError = (error: ZodError) => {
  throw new TRPCError({
    code: "BAD_REQUEST",
    message: JSON.stringify(error.flatten().fieldErrors),
  });
};
