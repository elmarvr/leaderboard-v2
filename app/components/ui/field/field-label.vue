<script setup lang="ts">
import {
  FieldLabel as ArkFieldLabel,
  type FieldLabelProps,
} from "@ark-ui/vue/field";

const props = defineProps<FieldLabelProps>();
</script>

<template>
  <ArkFieldLabel as-child>
    <UiLabel v-bind="props">
      <slot />
    </UiLabel>
  </ArkFieldLabel>
</template>
