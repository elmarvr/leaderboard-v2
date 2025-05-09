import { drizzle } from "drizzle-orm/d1";
export * from "drizzle-orm/sql";

import * as schema from "../database/schema";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const table = schema;

export function useDrizzle() {
  return drizzle(hubDatabase(), { schema });
}

export type User = typeof schema.users.$inferSelect;

export type UserInsert = typeof schema.users.$inferInsert;
export const UserInsertSchema = createInsertSchema(schema.users, {
  email: (s) => s.email(),
});

export type Room = typeof schema.rooms.$inferSelect;
export const RoomSchema = createSelectSchema(schema.rooms, {
  code: (s) => s.length(6),
});

export type RoomInsert = typeof schema.rooms.$inferInsert;
export const RoomInsertSchema = createInsertSchema(schema.rooms, {
  code: (s) => s.length(6),
});

export function isD1Error(error: unknown): error is D1Error {
  const result = D1ErrorSchema.safeParse(error);
  return result.success;
}

type D1Error = z.infer<typeof D1ErrorSchema>;
const D1ErrorSchema = z
  .object({
    cause: z.object({
      message: z.string().optional(),
      code: z.string().optional(),
    }),
  })
  .passthrough();
