import { init } from "@paralleldrive/cuid2";
import { validateBody } from "~~/server/utils/validate";

export default eventHandler(async (event) => {
  const body = await validateBody(
    event,
    RoomInsertSchema.pick({
      title: true,
      password: true,
    })
  );

  const db = useDrizzle();

  const room = await db
    .insert(table.rooms)
    .values({
      title: body.title,
      password: body.password,
      code: createCode(),
    })
    .returning()
    .get();

  const session = await getUserSession(event);

  if (!session.user) {
    throw createVisibleError({
      type: "authentication",
      code: "unauthorized",
      message: "You must be signed in to create a room",
    });
  }

  await db.insert(table.members).values({
    userId: session.user.id,
    roomId: room.id,
  });

  return room;
});

function createCode() {
  return init({ length: 6 })().toUpperCase();
}
