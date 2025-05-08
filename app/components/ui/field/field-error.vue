<script setup lang="ts">
import {
  FieldErrorText as ArkFieldError,
  type FieldErrorTextProps,
} from "@ark-ui/vue/field";
import { useField } from "./use-field";

const props = defineProps<FieldErrorTextProps>();
const delegated = reactiveOmit(props, ["class"]);

const field = useField();
const isInvalid = computed(() => field.errors.value.length > 0);
</script>

<template>
  <ArkFieldError
    v-if="isInvalid"
    v-bind="delegated"
    :class="cx('text-sm text-red-500', props.class)"
  >
    <slot>
      {{ field.errorMessage }}
    </slot>
  </ArkFieldError>
</template>
