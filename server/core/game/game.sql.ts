import { sqliteTable, primaryKey } from "drizzle-orm/sqlite-core";

import { roomId, timestamps, cuid } from "../drizzle/sql";

export const gameTable = sqliteTable(
  "games",
  {
    ...roomId,
    ...timestamps,

    winnerId: cuid("winner_id").notNull(),
    loserId: cuid("loser_id").notNull(),
  },
  (table) => [primaryKey({ columns: [table.roomId, table.id] })]
);
