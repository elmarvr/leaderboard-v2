import { drizzle } from "drizzle-orm/d1";

export function useDrizzle() {
  return drizzle(hubDatabase(), {});
}

export * from "drizzle-orm/sql";
