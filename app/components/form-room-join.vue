<script setup lang="ts">
import { z } from "zod";
import type { SubmissionHandler } from "~/components/ui/form.vue";
import { isVisibleError } from "#shared/visible-error";

const { $api } = useNuxtApp();
const router = useRouter();

const schema = z.object({
  code: z.string().length(6, "Code must be 6 characters long"),
});

const onSubmit: SubmissionHandler<typeof schema> = async ({ code }, ctx) => {
  await $api(`/room/${code as ":code"}/join`, {
    onResponseError({ response }) {
      const error = response._data;

      if (isVisibleError(error) && error.data.code === "resource_not_found") {
        ctx.setErrors({
          code: "Room not found",
        });
      }
    },
  });

  router.push(`/rooms/${code}`);
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
