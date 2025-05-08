import type { User as DatabaseUser } from "./server/utils/drizzle";

declare module "#auth-utils" {
  interface User {
    id: DatabaseUser["id"];
    email: DatabaseUser["email"];
    name: DatabaseUser["name"];
  }

  interface UserSession {
    // user: User;
  }

  interface SecureSessionData {
    // Add your own fields
  }
}

export {};
