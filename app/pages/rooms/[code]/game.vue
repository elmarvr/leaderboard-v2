<script setup lang="ts">
import { z } from "zod";
import type { SubmissionHandler } from "~/components/ui/form.vue";

const route = useRoute();

const schema = z.object({
  winner: z.string().array(),
  loser: z.string().array(),
});

const onSubmit: SubmissionHandler<typeof schema> = async (values, ctx) => {
  if (values.winner[0] === values.loser[0]) {
    ctx.setErrors({
      loser: "Winner and loser cannot be the same",
    });
    return;
  }

  await $fetch(`/api/rooms/${route.params.code}/game`, {
    method: "POST",
    body: {
      winnerId: parseInt(values.winner[0]!),
      loserId: parseInt(values.loser[0]!),
    },
  });
};
</script>

<template>
  <UiCard>
    <UiForm :schema="schema" @submit="onSubmit">
      <UiField name="winner">
        <ComboboxMembers>
          <UiComboboxLabel>Winner</UiComboboxLabel>
          <UiComboboxControl />
        </ComboboxMembers>
        <UiFieldError />
      </UiField>

      <UiField name="loser">
        <ComboboxMembers>
          <UiComboboxLabel>Loser</UiComboboxLabel>
          <UiComboboxControl />
        </ComboboxMembers>
        <UiFieldError />
      </UiField>

      <UiButton> Add Score </UiButton>
    </UiForm>
  </UiCard>
</template>
