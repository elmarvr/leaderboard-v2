import type { H3Event } from "h3";
import type { Schema, ZodIssue } from "zod";
import { ErrorCodeType } from "#shared/visible-error";

export async function validateBody<TSchema extends Schema>(
  event: H3Event,
  schema: TSchema
): Promise<TSchema["_output"]> {
  const body = await readBody(event);
  return validate(schema, body);
}
export async function validateQuery<TSchema extends Schema>(
  event: H3Event,
  schema: TSchema
): Promise<TSchema["_output"]> {
  const query = getQuery(event);
  return validate(schema, query);
}
export async function validateParams<TSchema extends Schema>(
  event: H3Event,
  schema: TSchema
): Promise<TSchema["_output"]> {
  const params = getRouterParams(event);
  return validate(schema, params);
}

async function validate<TSchema extends Schema>(
  schema: TSchema,
  data: unknown
): Promise<TSchema["_output"]> {
  const result = await schema.safeParseAsync(data);
  if (result.success) {
    return result.data;
  }

  const issues = result.error.issues || result.error.errors;

  if (issues.length === 0) {
    throw createValidationError({
      code: "invalid_parameter",
      message: "Invalid request data",
      issues,
    });
  }

  const issue = issues[0];

  if (issue.code === "invalid_type" && issue.received === "undefined") {
    const path = issue.path
      ? Array.isArray(issue.path)
        ? issue.path.join(".")
        : issue.path
      : null;

    throw createValidationError({
      code: "missing_required_field",
      message: `The \`${path}\` field is required.`,
      issues,
    });
  }

  if (
    ["invalid_string", "invalid_date", "invalid_regex"].includes(issue.code)
  ) {
    throw createValidationError({
      code: "invalid_format",
      issues,
    });
  }

  throw createValidationError({
    code: "invalid_parameter",
    issues,
  });
}

function createValidationError(opts: {
  code: ErrorCodeType<"validation">;
  message?: string;
  issues: ZodIssue[];
}) {
  return createVisibleError({
    type: "validation",
    code: opts.code,
    message: opts.message ?? opts.issues[0].message,
    details: {
      issues: opts.issues.map((issue) => ({
        path: issue.path
          ? Array.isArray(issue.path)
            ? issue.path.join(".")
            : issue.path
          : null,
        code: issue.code,
        message: issue.message,
        // @ts-expect-error
        expected: issue.expected,
        // @ts-expect-error
        received: issue.received,
      })),
    },
  });
}
