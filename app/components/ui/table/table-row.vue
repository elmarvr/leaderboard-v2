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
  <ark.tr
    :class="
      cx(
        'border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted',
        props.class
      )
    "
    v-bind="delegated"
  >
    <slot />
  </ark.tr>
</template>
