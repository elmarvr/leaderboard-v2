import { init } from "@paralleldrive/cuid2";
import { RoomInsertSchema } from "~~/server/utils/drizzle";

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

  return room;
});

function createCode() {
  return init({ length: 6 })().toUpperCase();
}
