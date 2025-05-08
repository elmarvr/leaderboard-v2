export default defineOAuthGoogleEventHandler({
  async onSuccess(event, { user }) {
    const db = useDrizzle();

    const existingUser = await db
      .insert(table.users)
      .values({
        name: user.name,
        email: user.email,
      })
      .onConflictDoUpdate({
        target: table.users.email,
        set: {
          name: user.name,
        },
      })
      .returning()
      .get();

    await setUserSession(event, {
      user: existingUser,
    });

    return sendRedirect(event, "/");
  },
});
