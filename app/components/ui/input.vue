<script setup lang="ts">
import { useForwardPropsEmits } from "@ark-ui/vue";
import type { ClassValue } from "cva";
import type { InputHTMLAttributes } from "vue";

const props = defineProps<{
  class?: ClassValue;
  type?: InputHTMLAttributes["type"];
  name?: InputHTMLAttributes["name"];
}>();

const delegated = reactiveOmit(props, ["class"]);
</script>

<template>
  <input
    v-bind="delegated"
    :class="
      cx(
        'h-9 text-sm px-3 border border-input rounded-md outline-none focus-visible:ring-offset-2 focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50',
        props.class
      )
    "
  />
</template>
