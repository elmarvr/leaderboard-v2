import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { participantTable } from "../participant/participant.sql";
import { roomTable } from "./room.sql";

export namespace Room {
  export const Info = createSelectSchema(roomTable, {
    id: (s) => s.cuid2(),
    title: (s) => s.nonempty(),
    code: (s) => s.length(6),
  });
  export type Info = z.infer<typeof Info>;

  export async function create(input: {
    title: string;
    password?: string | undefined | null;
  }) {
    const db = useDrizzle();
    const actor = assertActor("user");

    const room = await db
      .insert(roomTable)
      .values({
        title: input.title,
        password: input.password,
      })
      .returning({
        id: roomTable.id,
        code: roomTable.code,
      })
      .get();

    await db
      .insert(participantTable)
      .values({
        email: actor.email,
        roomId: room.id,
      })
      .run();

    return room;
  }

  export async function join(input: { code: string }) {
    const db = useDrizzle();
    const actor = assertActor("user");

    const room = await db
      .select({
        id: roomTable.id,
        code: roomTable.code,
      })
      .from(roomTable)
      .where(eq(roomTable.code, input.code))
      .get();

    if (!room) {
      throw createVisibleError({
        type: "not_found",
        code: "resource_not_found",
        message: "Room not found",
      });
    }

    await db
      .insert(participantTable)
      .values({
        email: actor.email,
        roomId: room.id,
      })
      .run();

    return room;
  }

  export async function fromCode(code: string) {
    const db = useDrizzle();

    const room = await db
      .select({
        id: roomTable.id,
        title: roomTable.title,
      })
      .from(roomTable)
      .where(eq(roomTable.code, code))
      .get();

    if (!room) {
      throw createVisibleError({
        type: "not_found",
        code: "resource_not_found",
        message: "Room not found",
      });
    }

    return room;
  }
}
