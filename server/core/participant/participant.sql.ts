import {
  sqliteTable,
  text,
  primaryKey,
  uniqueIndex,
  index,
} from "drizzle-orm/sqlite-core";
import { roomId, timestamps } from "../drizzle/sql";

export const participantTable = sqliteTable(
  "participants",
  {
    ...roomId,
    ...timestamps,

    email: text("email").notNull(),
  },
  (table) => [
    primaryKey({ columns: [table.roomId, table.id] }),
    uniqueIndex("email").on(table.roomId, table.email),
    index("email_global").on(table.email),
  ]
);
