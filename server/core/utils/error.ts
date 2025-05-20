import type { ErrorCodeType, ErrorType } from "#shared/visible-error";

export function createVisibleError<T extends ErrorType>(input: {
  type: T;
  code: ErrorCodeType<T>;
  message: string;
  details?: Record<string, unknown>;
}) {
  return createError({
    ...createBaseError(input.type),
    message: input.message,
    data: {
      code: input.code,
      details: input.details,
    },
  });
}

function createBaseError<T extends ErrorType>(type: T) {
  switch (type) {
    case "not_found":
      return {
        statusCode: 404,
        statusMessage: "Not Found",
      };
    case "authentication":
      return {
        statusCode: 401,
        statusMessage: "Unauthorized",
      };
    case "validation":
      return {
        statusCode: 400,
        statusMessage: "Bad Request",
      };
    default:
      return {
        statusCode: 500,
        statusMessage: "Internal Server Error",
      };
  }
}
