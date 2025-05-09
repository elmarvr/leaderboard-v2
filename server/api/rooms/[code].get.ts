import { RoomSchema } from "~~/server/utils/drizzle";

export default eventHandler(async (event) => {
  const { code } = await getValidatedRouterParams(
    event,
    RoomSchema.pick({ code: true }).parse
  );

  const db = useDrizzle();

  const result = await db
    .select({
      room: table.rooms,
      user: table.users,
    })
    .from(table.rooms)
    .innerJoin(table.members, eq(table.members.roomId, table.rooms.id))
    .innerJoin(table.users, eq(table.users.id, table.members.userId))
    .where(eq(table.rooms.code, code))
    .all();

  if (result.length === 0) {
    throw createVisibleError({
      type: "not_found",
      code: "resource_not_found",
      message: "Room not found",
    });
  }

  const room = result[0].room;
  const users = result.map((r) => r.user);

  return {
    ...room,
    users,
  };
});
