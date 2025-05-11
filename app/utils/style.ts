import { defineConfig } from "cva";
import { twMerge } from "tailwind-merge";

export const { cva, compose, cx } = defineConfig({
  hooks: {
    onComplete(className) {
      return twMerge(className);
    },
  },
});

export type { ClassValue } from "cva";
// export type WithClass<T> = T;
