<script lang="ts">
export type SubmissionHandler<TSchema extends z.ZodTypeAny> = (
  values: TSchema["_output"],
  ctx: SubmissionContext<TSchema["_input"]>
) => void;
</script>

<script setup lang="ts" generic="TSchema extends z.ZodTypeAny">
import {
  useForm,
  type Path,
  type SubmissionContext,
  type ValidationOptions,
} from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import type { z } from "zod";
import type { ClassValue } from "cva";

const props = defineProps<{
  schema: TSchema;
  class?: ClassValue;
}>();

const emit = defineEmits<{
  (
    e: "submit",
    values: TSchema["_output"],
    context: SubmissionContext<TSchema["_input"]>
  ): void;
}>();

const form = useForm({
  validationSchema: computed(() => toTypedSchema(props.schema)),
});

const onSubmit = form.handleSubmit(
  (values, ctx) => emit("submit", values, ctx),
  () => {}
);

defineExpose({
  validateField(
    path: Path<TSchema["_input"]>,
    opts: Partial<ValidationOptions>
  ) {
    return form.validateField(path, opts);
  },
});
</script>

<template>
  <form @submit="onSubmit" :class="cx('space-y-6', props.class)">
    <slot />
  </form>
</template>
