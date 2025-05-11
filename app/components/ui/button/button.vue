<script setup lang="ts">
import type { ClassValue, VariantProps } from "cva";
import type { ButtonHTMLAttributes } from "vue";
import { ark, type PolymorphicProps } from "@ark-ui/vue/factory";

const buttonVariants = cva({
  base: "px-4 h-9 rounded-md text-sm font-medium transition-colors",
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground hover:bg-primary/80",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type ButtonVariants = VariantProps<typeof buttonVariants>;

interface ButtonProps extends PolymorphicProps {
  variant?: ButtonVariants["variant"];
  class?: ClassValue;
  type?: ButtonHTMLAttributes["type"];
}

const props = defineProps<ButtonProps>();

const delegated = reactiveOmit(props, ["variant", "class"]);
</script>

<template>
  <ark.button
    v-bind="delegated"
    :class="buttonVariants({ variant, class: props.class })"
    data-slot="button"
  >
    <slot />
  </ark.button>
</template>
