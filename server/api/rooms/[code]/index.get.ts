import { validateParams } from "~~/server/utils/validate";

export default eventHandler(async (event) => {
  const { code } = await validateParams(event, RoomSchema.pick({ code: true }));

  const db = useDrizzle();

  // Get room, members, and users
  const result = await db
    .select({
      room: table.rooms,
      member: {
        id: table.members.id,
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

  const memberIds = result.map((r) => r.member.id);

  const games = await db
    .select({
      winnerId: table.games.winnerId,
      loserId: table.games.loserId,
    })
    .from(table.games)
    .where(
      or(
        inArray(table.games.winnerId, memberIds),
        inArray(table.games.loserId, memberIds)
      )
    )
    .all();

  const scores: Record<string, number> = {};
  memberIds.forEach((id) => (scores[id] = 0));
  games.forEach((game) => {
    if (scores[game.winnerId] !== undefined) scores[game.winnerId] += 1;
    if (scores[game.loserId] !== undefined) scores[game.loserId] -= 1;
  });

  const members = result.map((r) => ({
    ...r.member,
    user: r.user,
    score: scores[r.member.id],
  }));

  return {
    ...room,
    members,
  };
});
