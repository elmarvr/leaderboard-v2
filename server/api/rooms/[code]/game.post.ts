import { GameSchema } from "~~/server/utils/drizzle";
import { validateBody, validateParams } from "~~/server/utils/validate";

export default eventHandler(async (event) => {
  const body = await validateBody(
    event,
    GameSchema.pick({ winnerId: true, loserId: true })
  );
  const params = await validateParams(event, RoomSchema.pick({ code: true }));

  const db = useDrizzle();

  const room = await db
    .select({
      id: table.rooms.id,
    })
    .from(table.rooms)
    .where(eq(table.rooms.code, params.code))
    .get();

  if (!room) {
    throw createVisibleError({
      type: "not_found",
      code: "resource_not_found",
      message: "Room not found",
    });
  }

  const game = await db
    .insert(table.games)
    .values({
      roomId: room.id,
      winnerId: body.winnerId,
      loserId: body.loserId,
    })
    .returning()
    .get();

  return game;
});
