<script setup lang="ts">
import { ark, type PolymorphicProps } from "@ark-ui/vue";
import type { ClassValue } from "cva";

const props = defineProps<
  {
    class?: ClassValue;
  } & PolymorphicProps
>();

const delegated = reactiveOmit(props, ["class"]);
</script>

<template>
  <ark.tbody
    :class="cx('[&_tr:last-child]:border-0', props.class)"
    v-bind="delegated"
  >
    <slot />
  </ark.tbody>
</template>
