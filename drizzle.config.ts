import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "sqlite",
  schema: "./server/core/**/*.sql.ts",
  out: "./server/core/drizzle/migrations",
});
