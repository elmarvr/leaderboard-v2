import { createSelectSchema } from "drizzle-zod";
import { gameTable } from "./game.sql";
import type { z } from "zod";

export namespace Game {
  export const Info = createSelectSchema(gameTable, {
    id: (s) => s.cuid2(),
    roomId: (s) => s.cuid2(),
    winnerId: (s) => s.cuid2(),
    loserId: (s) => s.cuid2(),
  });
  export type Info = z.infer<typeof Info>;

  export async function create(input: Pick<Info, "winnerId" | "loserId">) {
    const actor = assertActor("participant");
    const db = useDrizzle();

    const game = await db
      .insert(gameTable)
      .values({
        roomId: actor.roomId,
        winnerId: input.winnerId,
        loserId: input.loserId,
      })
      .returning({
        id: gameTable.id,
      })
      .get();

    return game;
  }
}
