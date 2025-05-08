<script setup lang="ts">
import {
  FieldErrorText as ArkFieldError,
  type FieldErrorTextProps,
} from "@ark-ui/vue/field";
import { useField } from "./use-field";
import { useFormContext } from "vee-validate";

const props = defineProps<FieldErrorTextProps>();
const delegated = reactiveOmit(props, ["class"]);

const field = useField();
</script>

<template>
  <ArkFieldError
    v-bind="delegated"
    :class="cx('text-sm text-red-500', props.class)"
  >
    <slot>
      {{ field.errorMessage }}
    </slot>
  </ArkFieldError>
</template>
