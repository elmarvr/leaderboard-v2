<script setup lang="ts">
import { z } from "zod";
import type { SubmissionHandler } from "~/components/ui/form.vue";
import { isVisibleError, unwrapError } from "#shared/visible-error";

const router = useRouter();

const schema = z.object({
  code: z.string().length(6, "Code must be 6 characters long"),
});

const onSubmit: SubmissionHandler<typeof schema> = async ({ code }, ctx) => {
  try {
    await $fetch(`/api/rooms/${code}/join`);
    router.push(`/rooms/${code}`);
  } catch (_error) {
    const error = unwrapError(_error);

    if (isVisibleError(error) && error.data.code === "resource_not_found") {
      ctx.setErrors({
        code: error.message,
      });

      return;
    }

    throw error;
  }
};
</script>

<template>
  <UiCard>
    <UiForm :schema="schema" @submit="onSubmit">
      <UiField name="code">
        <UiFieldLabel> Code </UiFieldLabel>
        <UiFieldInput />
        <UiFieldError />
      </UiField>

      <UiButton>Join Room</UiButton>
    </UiForm>
  </UiCard>
</template>
