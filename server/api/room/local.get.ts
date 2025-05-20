import { roomTable } from "~~/server/core/room/room.sql";

export default eventHandler(async (event) => {
  const actor = assertActor("participant");

  const db = useDrizzle();

  const room = await db
    .select()
    .from(roomTable)
    .where(eq(roomTable.id, actor.roomId))
    .get();

  return room;
});
