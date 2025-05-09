import { z } from "zod";
import { FetchError } from "ofetch";

export const ErrorCode = {
  not_found: {
    RESOURCE_NOT_FOUND: "resource_not_found",
  },
  authentication: {
    UNAUTHORIZED: "unauthorized",
  },
  server: {
    INTERNAL_ERROR: "internal_error",
  },
} as const;

export const VisibleErrorSchema = z.object({
  statusCode: z.number(),
  statusMessage: z.string(),
  message: z.string(),
  data: z.object({
    code: z.custom<ErrorCodeType>((val) => {
      const codes = Object.values(ErrorCode).flatMap((e) => Object.values(e));

      return codes.includes(val);
    }),
  }),
});
export type VisibleError = z.infer<typeof VisibleErrorSchema>;

export function isVisibleError(error: unknown): error is VisibleError {
  return VisibleErrorSchema.safeParse(error).success;
}

export type ErrorType = keyof typeof ErrorCode;
export type ErrorCodeType<T extends ErrorType = never> = [T] extends [never]
  ? NestedValues<typeof ErrorCode>
  : (typeof ErrorCode)[T][keyof (typeof ErrorCode)[T]];

type NestedValues<T> = {
  [K in keyof T]: T[K] extends Record<string, any> ? NestedValues<T[K]> : T[K];
}[keyof T];

export function unwrapError(error: unknown): unknown {
  if (!(error instanceof FetchError)) {
    throw error;
  }

  return error.data;
}
