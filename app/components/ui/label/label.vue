<script setup lang="ts">
import { ark, type PolymorphicProps } from "@ark-ui/vue/factory";
import type { ClassValue } from "cva";

const props = defineProps<
  PolymorphicProps & {
    class?: ClassValue;
  }
>();
const delegated = reactiveOmit(props, ["class"]);
</script>

<template>
  <ark.label
    v-bind="delegated"
    :class="cx('block text-sm font-semibold mb-1.5', props.class)"
  >
    <slot />
    <UiLabelIndicator v-if="!asChild" />
  </ark.label>
</template>
