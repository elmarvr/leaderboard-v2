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
    :name="name"
    :class="props.class"
    :modelValue="field.value.value"
    @update:model-value="field.handleChange"
    @blur="field.handleBlur"
    as-child
  >
    <UiInput />
  </ArkFieldInput>
</template>
