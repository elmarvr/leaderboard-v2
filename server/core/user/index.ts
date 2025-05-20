import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { userTable } from "./user.sql";

export namespace User {
  export const Info = createSelectSchema(userTable, {
    id: (s) => s.cuid2(),
    email: (s) => s.email(),
  });
  export type Info = z.infer<typeof Info>;

  export function create(input: Pick<Info, "email" | "name">) {
    const db = useDrizzle();

    return db
      .insert(userTable)
      .values({
        name: input.name,
        email: input.email,
      })
      .returning({
        id: userTable.id,
        email: userTable.email,
        name: userTable.name,
      })
      .get();
  }

  export function fromEmail(email: string) {
    const db = useDrizzle();

    return db
      .select({
        id: userTable.id,
        email: userTable.email,
        name: userTable.name,
      })
      .from(userTable)
      .where(eq(userTable.email, email))
      .get();
  }
}
