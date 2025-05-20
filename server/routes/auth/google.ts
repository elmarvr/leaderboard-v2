import { User } from "~~/server/core/user";

export default defineOAuthGoogleEventHandler({
  async onSuccess(event, { user }) {
    let dbUser = await User.fromEmail(user.email);

    if (!dbUser) {
      dbUser = await User.create({
        email: user.email,
        name: user.name,
      });
    }

    await setUserSession(event, {
      user: dbUser,
    });

    return sendRedirect(event, "/");
  },
});
