<script setup lang="ts">
import {
  ComboboxControl as ArkComboboxControl,
  ComboboxInput as ArkComboboxInput,
} from "@ark-ui/vue/combobox";
import type { ClassValue } from "cva";

const props = defineProps<{
  class?: ClassValue;
}>();
</script>

<template>
  <ArkComboboxControl>
    <ArkComboboxInput
      as-child
      :class="
        cx(
          'flex w-full items-center justify-between whitespace-nowrap',
          props.class
        )
      "
    >
      <UiInput />
    </ArkComboboxInput>
  </ArkComboboxControl>
</template>
