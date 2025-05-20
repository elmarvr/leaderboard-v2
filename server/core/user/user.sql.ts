import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { id, timestamps } from "../drizzle/sql";

export const userTable = sqliteTable("users", {
  ...id,
  ...timestamps,

  name: text("name").notNull(),
  email: text("email").unique().notNull(),
});
