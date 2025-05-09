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
  <ark.th
    :class="
      cx(
        'h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
        props.class
      )
    "
    v-bind="delegated"
  >
    <slot />
  </ark.th>
</template>
