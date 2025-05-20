import { createId, init } from "@paralleldrive/cuid2";
import { integer, text } from "drizzle-orm/sqlite-core";

export function cuid(name: string) {
  return text(name, { length: 24 }).$default(() => createId());
}

export const id = {
  get id() {
    return cuid("id").primaryKey();
  },
};

export const roomId = {
  get id() {
    return cuid("id").notNull();
  },
  get roomId() {
    return cuid("room_id").notNull();
  },
};

export const timestamps = {
  get createdAt() {
    return integer("created_at", { mode: "timestamp" })
      .notNull()
      .$default(() => new Date());
  },
  get updatedAt() {
    return integer("updated_at", { mode: "timestamp" })
      .notNull()
      .$onUpdate(() => new Date());
  },
};

export function code(name: string) {
  return text(name, { length: 6 })
    .unique()
    .$default(() => {
      return init({ length: 6 })().toUpperCase();
    });
}
