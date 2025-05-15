<script setup lang="ts" generic="T extends CollectionItem">
import {
  ComboboxRootProvider as ArkComboboxRootProvider,
  createListCollection,
  useCombobox,
  type CollectionItem,
  type ComboboxRootEmits,
  type ComboboxRootProps,
  type ListCollection,
} from "@ark-ui/vue/combobox";
import { useField } from "../field/use-field";
import { type Filter } from "~/composables/use-filter";

const props = defineProps<
  ComboboxRootProps<T> & {
    filter?: Filter;
    collection: ListCollection<T>;
  }
>();
const emit = defineEmits<ComboboxRootEmits<T>>();

const inputValue = ref("");
const field = useField<string[]>();
const filter = useFilter(computed(() => props.filter));

const collection = computed(() => {
  if (!props.collection) {
    return createListCollection({ items: [] as T[] });
  }

  const query = props.collection.filter((itemStr) => {
    return filter(itemStr, inputValue.value);
  });

  if (query.size === 0) {
    return props.collection.copy();
  }

  return query.copy();
});

const combobox = useCombobox(
  computed(() => {
    return {
      collection: collection.value,
      value: field.value.value,
      onValueChange(details: { value: string[] }) {
        field.handleChange(details.value);
      },
      onBlur() {
        field.handleBlur();
      },
      inputValue: inputValue.value,
      onInputValueChange(details: { inputValue: string }) {
        inputValue.value = details.inputValue;
      },
    };
  }),
  emit
);
</script>

<template>
  <ArkComboboxRootProvider :value="combobox" :class="cx('', props.class)">
    <slot />
  </ArkComboboxRootProvider>
</template>
