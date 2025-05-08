<script setup lang="ts">
import {
  FieldInput as ArkFieldInput,
  type FieldInputProps,
} from "@ark-ui/vue/field";
import { useField } from "./use-field";

const props = defineProps<Omit<FieldInputProps, "modelValue" | "asChild">>();
const delegated = reactiveOmit(props, ["class"]);

const field = useField();
const name = computed(() => unref(field.name));
</script>

<template>
  <ArkFieldInput
    v-bind="delegated"
    :class="
      cx('h-9 text-sm px-3 border border-neutral-400 rounded-md', props.class)
    "
    :modelValue="field.value.value"
    :onUpdate:modelValue="field.handleChange"
    :onBlur="field.handleBlur"
    :name="name"
    as-child
  >
    <input />
  </ArkFieldInput>
</template>
