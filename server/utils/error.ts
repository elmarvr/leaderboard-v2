import type { ErrorCodeType, ErrorType } from "#shared/visible-error";

export function createVisibleError<T extends ErrorType>(input: {
  type: T;
  code: ErrorCodeType<T>;
  message: string;
}) {
  return createError({
    ...createBaseError(input.type),
    message: input.message,
    data: {
      code: input.code,
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
    default:
      return {
        statusCode: 500,
        statusMessage: "Internal Server Error",
      };
  }
}
