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
  <ark.div
    v-bind="delegated"
    :class="
      cx('rounded-xl border bg-background text-foreground p-6', props.class)
    "
  >
    <slot />
  </ark.div>
</template>
