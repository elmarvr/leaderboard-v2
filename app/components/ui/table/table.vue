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
  <div class="relative w-full overflow-auto">
    <ark.table
      :class="cx('w-full caption-bottom text-sm', props.class)"
      v-bind="delegated"
    >
      <slot />
    </ark.table>
  </div>
</template>
