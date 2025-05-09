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
  <ark.thead :class="cx('[&_tr]:border-b', props.class)" v-bind="delegated">
    <slot />
  </ark.thead>
</template>
