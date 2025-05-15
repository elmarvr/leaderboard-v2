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
  validation: {
    INVALID_PARAMETER: "invalid_parameter",
    INVALID_FORMAT: "invalid_format",
    MISSING_REQUIRED_FIELD: "missing_required_field",
  },
} as const;

export const CodeSchema = z.custom<ErrorCodeType>((val) => {
  const codes = Object.values(ErrorCode).flatMap((e) => Object.values(e));
  return codes.includes(val);
});

export const VisibleErrorSchema = z.object({
  statusCode: z.number(),
  statusMessage: z.string(),
  message: z.string(),
  data: z.object({
    code: CodeSchema,
    details: z.record(z.string(), z.unknown()).optional(),
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
    return error;
  }

  return error.data;
}
