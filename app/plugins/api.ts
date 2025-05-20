import type { NitroFetchRequest, NitroFetchOptions } from "nitropack";

export default defineNuxtPlugin({
  name: "@api/provide",

  setup() {
    const api = createApi();

    return {
      provide: {
        api,
      },
    };
  },
});

declare module "#app" {
  interface NuxtApp {
    $api: ReturnType<typeof createApi>;
  }
}

declare module "vue" {
  interface ComponentCustomProperties {
    $api: ReturnType<typeof createApi>;
  }
}

export function createApi() {
  const _fetch = $fetch.create({
    onRequest({ options }) {
      const code = useRoute().params.code;
      const headers = mergeHeaders(useRequestHeaders(), options.headers);

      if (typeof code === "string") {
        headers.append("x-room-code", code);
      }

      options.headers = headers;
    },
  });

  const api = <
    TReq extends ApiFetchRequest,
    TOpts extends NitroFetchOptions<`/api${TReq}`>
  >(
    request: TReq,
    opts: TOpts
  ) => {
    return _fetch(`/api${request}`, opts);
  };

  return api;
}

export type ApiFetchRequest = WithPrefix<
  Extract<NitroFetchRequest, string>,
  "/api"
>;

type WithPrefix<T extends string, U extends string> = {
  [K in T]: K extends `${U}${infer S}` ? S : never;
}[T];

function mergeHeaders(...headers: HeadersInit[]) {
  const _headers = new Headers();

  for (const header of headers) {
    if (header instanceof Headers) {
      for (const [key, value] of header.entries()) {
        _headers.append(key, value);
      }
      continue;
    }
    if (Array.isArray(header)) {
      for (const [key, value] of header) {
        _headers.append(key, value);
      }
      continue;
    }
    if (typeof header === "object") {
      for (const key in header) {
        _headers.append(key, header[key]!);
      }
    }
  }
  return _headers;
}
