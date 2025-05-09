import {
  sqliteTable,
  text,
  integer,
  primaryKey,
  unique,
} from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),

  name: text("name").notNull(),
  email: text("email").unique().notNull(),

  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$onUpdate(() => new Date()),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$default(() => new Date()),
});

export const rooms = sqliteTable("rooms", {
  id: integer("id").primaryKey({ autoIncrement: true }),

  title: text("title").notNull(),
  code: text("code").unique().notNull(),
  password: text("password"),

  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$onUpdate(() => new Date()),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$default(() => new Date()),
});

export const members = sqliteTable(
  "members",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    userId: integer("user_id")
      .notNull()
      .references(() => users.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    roomId: integer("room_id")
      .notNull()
      .references(() => rooms.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),

    updatedAt: integer("updated_at", { mode: "timestamp" })
      .notNull()
      .$onUpdate(() => new Date()),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .$default(() => new Date()),
  },
  (table) => [unique().on(table.userId, table.roomId)]
);
