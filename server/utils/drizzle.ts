import { drizzle } from "drizzle-orm/d1";
export * from "drizzle-orm/sql";

import * as schema from "../database/schema";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

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

export type Member = typeof schema.members.$inferSelect;
export const MemberSchema = createSelectSchema(schema.members, {
  score: (s) => s.min(0),
});

export type MemberInsert = typeof schema.members.$inferInsert;
export const MemberInsertSchema = createInsertSchema(schema.members, {
  score: (s) => s.min(0),
});
