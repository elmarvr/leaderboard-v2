import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { id, timestamps, code } from "../drizzle/sql";

export const roomTable = sqliteTable("rooms", {
  ...id,
  ...timestamps,

  title: text("title").notNull(),
  code: code("code").notNull(),
  password: text("password"),
});
