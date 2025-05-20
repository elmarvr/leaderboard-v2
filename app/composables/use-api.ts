import type { AsyncData, FetchResult, UseFetchOptions } from "#app";
import type { AvailableRouterMethod } from "nitropack";
import type {
  DefaultAsyncDataErrorValue,
  DefaultAsyncDataValue,
} from "nuxt/app/defaults";
import type { ApiFetchRequest } from "~/plugins/api";
import type { FetchError } from "ofetch";

export function useApi<
  TReq extends ApiFetchRequest,
  TMethod extends AvailableRouterMethod<`/api${TReq}`>,
  // @ts-ignore This works, but typescript is not happy
  TRes = FetchResult<`/api${TReq}`, TMethod>,
  TData = TRes,
  TKeys extends KeysOf<TData> = KeysOf<TData>,
  TDefault = DefaultAsyncDataValue
>(
  request: MaybeRefOrGetter<TReq>,
  opts?: UseFetchOptions<TRes, TData, TKeys, TDefault, `/api${TReq}`, TMethod>
): AsyncData<
  PickFrom<TData, TKeys> | TDefault,
  FetchError | DefaultAsyncDataErrorValue
> {
  const result = useFetch(request, {
    ...opts,
    $fetch: useNuxtApp().$api as any,
  } as UseFetchOptions<any>);

  return result;
}

type PickFrom<T, K extends Array<string>> = T extends Array<any>
  ? T
  : T extends Record<string, any>
  ? keyof T extends K[number]
    ? T
    : K[number] extends never
    ? T
    : Pick<T, K[number]>
  : T;
type KeysOf<T> = Array<
  T extends T ? (keyof T extends string ? keyof T : never) : never
>;
