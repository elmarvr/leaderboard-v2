import { init } from "@paralleldrive/cuid2";
import { createVisibleError } from "~~/server/utils/error";

export default eventHandler(async (event) => {
  const body = await readValidatedBody(
    event,
    RoomInsertSchema.pick({
      title: true,
      password: true,
    }).parse
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
