export function useFilter(filterFn?: MaybeRef<Filter | undefined>) {
  const fn = unref(filterFn);

  if (!fn) {
    return filter.includes;
  }

  if (typeof fn === "string") {
    return filter[fn];
  }

  return fn;
}

const filter = {
  includes: (itemStr, inputValue) => {
    return itemStr.toLowerCase().includes(inputValue.toLowerCase());
  },
  startsWith: (itemStr, inputValue) => {
    return itemStr.toLowerCase().startsWith(inputValue.toLowerCase());
  },
} satisfies Record<string, FilterFn>;

export type FilterFn = (itemStr: string, inputValue: string) => boolean;
export type Filter = keyof typeof filter | FilterFn;
