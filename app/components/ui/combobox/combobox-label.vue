<script setup lang="ts">
import {
  ComboboxLabel as ArkComboboxLabel,
  type ComboboxLabelProps,
} from "@ark-ui/vue/combobox";

const props = defineProps<ComboboxLabelProps>();
</script>

<template>
  <ArkComboboxLabel as-child>
    <UiLabel v-bind="props">
      <slot />
    </UiLabel>
  </ArkComboboxLabel>
</template>
