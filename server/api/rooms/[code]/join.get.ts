import { validateParams } from "~~/server/utils/validate";

export default eventHandler(async (event) => {
  const { code } = await validateParams(event, RoomSchema.pick({ code: true }));
  const { user } = await getUserSession(event);

  if (!user) {
    throw createVisibleError({
      type: "authentication",
      code: "unauthorized",
      message: "You must be signed in to join a room",
    });
  }

  const db = useDrizzle();

  const room = await db
    .select({
      id: table.rooms.id,
    })
    .from(table.rooms)
    .where(eq(table.rooms.code, code))
    .get();

  if (!room) {
    throw createVisibleError({
      type: "not_found",
      code: "resource_not_found",
      message: "Room not found",
    });
  }

  await db
    .insert(table.members)
    .values({
      userId: user.id,
      roomId: room.id,
    })
    .onConflictDoNothing();

  return {
    id: room.id,
  };
});
