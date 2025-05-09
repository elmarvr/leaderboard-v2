<script setup lang="ts">
import type { ClassValue, VariantProps } from "cva";

const buttonVariants = cva({
  base: "px-3 h-10 rounded-md text-sm font-medium transition-colors",
  variants: {
    variant: {
      default: "bg-green-500 text-white hover:bg-green-500/80",
    },
  },
});

type ButtonVariants = VariantProps<typeof buttonVariants>;

const props = defineProps<{
  variant?: ButtonVariants["variant"];
  class?: ClassValue;
}>();
</script>

<template>
  <button
    :class="buttonVariants({ variant, class: props.class })"
    data-slot="button"
  >
    <slot />
  </button>
</template>
