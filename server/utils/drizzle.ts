import { drizzle } from "drizzle-orm/d1";
export * from "drizzle-orm/sql";

import * as schema from "../database/schema";

export const table = schema;

export function useDrizzle() {
  return drizzle(hubDatabase(), { schema });
}

export type Room = typeof schema.rooms.$inferSelect;
export type RoomInsert = typeof schema.rooms.$inferInsert;
