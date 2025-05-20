import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { gameTable } from "../game/game.sql";
import { userTable } from "../user/user.sql";
import { participantTable } from "./participant.sql";

export namespace Participant {
  export const Info = createSelectSchema(participantTable, {
    id: (s) => s.cuid2(),
    roomId: (s) => s.cuid2(),
    email: (s) => s.email(),
  });
  export type Info = z.infer<typeof Info>;

  export async function list() {
    const db = useDrizzle();
    const room = useRoom();

    const participants = await db
      .select({
        id: participantTable.id,
        email: participantTable.email,
        name: userTable.name,
      })
      .from(participantTable)
      .where(eq(participantTable.roomId, room.id))
      .innerJoin(userTable, eq(userTable.email, participantTable.email))
      .all();

    const ids = participants.map((p) => p.id);

    const games = await db
      .select({
        winnerId: gameTable.winnerId,
        loserId: gameTable.loserId,
      })
      .from(gameTable)
      .where(
        or(inArray(gameTable.winnerId, ids), inArray(gameTable.loserId, ids))
      );

    const scores = new Map<string, number>();

    games.forEach((game) => {
      scores.set(game.winnerId, (scores.get(game.winnerId) ?? 0) + 1);
      scores.set(game.loserId, (scores.get(game.loserId) ?? 0) - 1);
    });

    return participants.map((p) => ({
      ...p,
      score: scores.get(p.id) ?? 0,
    }));
  }

  export function fromEmail(email: string) {
    const db = useDrizzle();
    const room = useRoom();

    return db
      .select()
      .from(participantTable)
      .where(
        and(
          eq(participantTable.email, email),
          eq(participantTable.roomId, room.id)
        )
      )
      .get();
  }
}
