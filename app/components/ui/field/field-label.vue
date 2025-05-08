<script setup lang="ts">
import {
  FieldLabel as ArkFieldLabel,
  type FieldLabelProps,
} from "@ark-ui/vue/field";
import { useField } from "./use-field";

const props = defineProps<FieldLabelProps>();
const delegated = reactiveOmit(props, ["class"]);

const field = useField();
</script>

<template>
  <ArkFieldLabel
    v-bind="delegated"
    :class="cx('text-sm font-medium', props.class)"
  >
    <slot />
    <span class="text-red-500">{{ field.meta.required ? "*" : "" }}</span>
  </ArkFieldLabel>
</template>
