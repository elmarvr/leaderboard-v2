import {
  addServerImports,
  addServerImportsDir,
  createResolver,
  defineNuxtModule,
} from "nuxt/kit";
import { globSync } from "tinyglobby";

const namespaces = ["game", "participant", "room", "user"];

export default defineNuxtModule({
  meta: {
    name: "@core/initialize",
  },

  setup(opts, nuxt) {
    const resolver = createResolver(import.meta.url);

    nuxt.hook("hub:database:migrations:dirs", (dirs) => {
      dirs.push(resolver.resolve("../server/core/drizzle/migrations"));
    });

    addServerImports(
      namespaces.map((namespace) => ({
        from: resolver.resolve(`../server/core/${namespace}`),
        name: capitalize(namespace),
      }))
    );

    const dirs = globSync([
      "server/core/**/*.ts",
      ...namespaces.map((namespace) => `!server/core/${namespace}`),
    ]);

    addServerImportsDir(dirs.map((dir) => resolver.resolve("../", dir)));
  },
});

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
