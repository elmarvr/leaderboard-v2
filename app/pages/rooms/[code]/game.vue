<script setup lang="ts">
import { z } from "zod";
import type { SubmissionHandler } from "~/components/ui/form.vue";

const { $api } = useNuxtApp();

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

  await $api("/room/game", {
    method: "post",
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
        <ComboboxParticipants>
          <UiComboboxLabel>Winner</UiComboboxLabel>
          <UiComboboxControl />
        </ComboboxParticipants>
        <UiFieldError />
      </UiField>

      <UiField name="loser">
        <ComboboxParticipants>
          <UiComboboxLabel>Loser</UiComboboxLabel>
          <UiComboboxControl />
        </ComboboxParticipants>
        <UiFieldError />
      </UiField>

      <UiButton> Add Score </UiButton>
    </UiForm>
  </UiCard>
</template>
