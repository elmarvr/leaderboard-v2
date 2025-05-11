<script setup lang="ts">
import { z } from "zod";
import type { SubmissionHandler } from "~/components/ui/form.vue";

definePageMeta({
  middleware: ["authenticated"],
});

const router = useRouter();

const schema = z.object({
  title: z.string().min(1, "Title is required"),
});

const onSubmit: SubmissionHandler<typeof schema> = async ({ title }) => {
  const response = await $fetch("/api/rooms", {
    method: "POST",
    body: { title },
  });

  router.push(`/rooms/${response.code}`);
};
</script>

<template>
  <div class="space-y-12 max-w-lg mx-auto">
    <FormRoomJoin />

    <UiCard>
      <UiForm :schema="schema" @submit="onSubmit">
        <UiField name="title">
          <UiFieldLabel> Title </UiFieldLabel>
          <UiFieldInput />
          <UiFieldError />
        </UiField>

        <UiButton>Create Room</UiButton>
      </UiForm>
    </UiCard>
  </div>
</template>
