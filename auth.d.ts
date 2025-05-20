import type { User as DatabaseUser } from "./server/core/user";

declare module "#auth-utils" {
  interface User {
    id: DatabaseUser.Info["id"];
    email: DatabaseUser.Info["email"];
    name: DatabaseUser.Info["name"];
  }

  interface UserSession {
    user?: User;
  }

  interface SecureSessionData {
    // Add your own fields
  }
}

export {};
