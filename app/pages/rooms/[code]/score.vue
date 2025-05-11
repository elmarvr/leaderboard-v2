<script setup lang="ts">
import { createListCollection } from "@ark-ui/vue";
import { z } from "zod";
import type { SubmissionHandler } from "~/components/ui/form.vue";

const items = ref(["React", "Solid", "Vue"]);

const collection = computed(() =>
  createListCollection({
    items: items.value,
  })
);

const schema = z.object({
  framework: z.array(z.string()),
});

const onSubmit: SubmissionHandler<typeof schema> = (values) => {
  console.log("Form submitted with values:", values);
};
</script>

<template>
  <UiCard>
    <UiForm @submit="onSubmit" :schema="schema">
      <UiField name="framework">
        <UiCombobox :collection="collection">
          <UiComboboxLabel>Framework</UiComboboxLabel>
          <UiComboboxControl />

          <UiComboboxContent>
            <UiComboboxItem
              :item="item"
              v-for="item in collection.items"
              :key="item"
            >
              {{ item }}
            </UiComboboxItem>
          </UiComboboxContent>
        </UiCombobox>
        <UiFieldError />
      </UiField>

      <UiButton> Submit </UiButton>
    </UiForm>
  </UiCard>
</template>
