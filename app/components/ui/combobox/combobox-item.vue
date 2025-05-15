<script setup lang="ts">
import {
  ComboboxItem as ArkComboboxItem,
  ComboboxItemText as ArkComboboxItemText,
  useComboboxContext,
  type ComboboxItemProps,
} from "@ark-ui/vue/combobox";

const props = defineProps<ComboboxItemProps>();
const delegated = reactiveOmit(props, ["class"]);

const combobox = useComboboxContext();

const isRendered = computed(() => {
  return combobox.value.collection.hasItem(props.item);
});
</script>

<template>
  <ArkComboboxItem
    v-if="isRendered"
    v-bind="delegated"
    :class="
      cx(
        'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        props.class
      )
    "
  >
    <slot />
  </ArkComboboxItem>
</template>
