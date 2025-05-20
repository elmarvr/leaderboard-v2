export function useRoom() {
  const route = useRoute();

  return computed(() => {
    const code = route.params.code as string | undefined;

    if (!code) {
      return null;
    }

    return {
      code,
    };
  });
}
