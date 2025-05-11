import { useField as __useField, type FieldContext } from "vee-validate";

const [provideField, injectField] = createInjectionState(
  (name: MaybeRef<string>) => {
    const field = __useField(name);

    return field;
  }
);

function useField<T>() {
  const ctx = injectField();

  if (!ctx) {
    return __useField<T>("standalone", [], {
      controlled: false,
    });
  }

  return ctx as FieldContext<T>;
}

export { provideField, useField };
