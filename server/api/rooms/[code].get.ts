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
      member: {
        id: table.members.id,
        score: table.members.score,
        createdAt: table.members.createdAt,
        updatedAt: table.members.updatedAt,
      },
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
  const members = result.map((r) => ({
    ...r.member,
    user: r.user,
  }));

  return {
    ...room,
    members,
  };
});
