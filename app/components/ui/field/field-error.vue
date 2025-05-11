<script setup lang="ts">
import {
  FieldErrorText as ArkFieldError,
  type FieldErrorTextProps,
} from "@ark-ui/vue/field";
import { useField } from "./use-field";

const props = defineProps<FieldErrorTextProps>();
const delegated = reactiveOmit(props, ["class"]);

const field = useField();
</script>

<template>
  <ArkFieldError
    v-bind="delegated"
    :class="cx('text-sm text-destructive', props.class)"
  >
    <slot>
      {{ field.errorMessage }}
    </slot>
  </ArkFieldError>
</template>
