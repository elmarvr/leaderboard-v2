import { useField as __useField } from "vee-validate";

const [provideField, injectField] = createInjectionState(
  (name: MaybeRef<string>) => {
    const field = __useField(name);

    return field;
  }
);

function useField() {
  const ctx = injectField();
  if (!ctx) {
    throw new Error(
      `useField() is called outside of a component that provides the field context.`
    );
  }
  return ctx;
}

export { provideField, useField };
