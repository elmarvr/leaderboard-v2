<script setup lang="ts">
import { createListCollection } from "@ark-ui/vue";

const { data: participants } = await useApi("/room/participants", {
  default() {
    return [];
  },
});

const collection = computed(() => {
  return createListCollection({
    items: participants.value,
    itemToString(p) {
      return p.name;
    },
    itemToValue(p) {
      return p.id;
    },
  });
});
</script>

<template>
  <UiCombobox :collection="collection">
    <slot />
    <ClientOnly>
      <UiComboboxContent>
        <UiComboboxItem
          v-for="item in collection.items"
          :key="item.id"
          :item="item"
        >
          {{ item.name }}
          <span class="text-muted-foreground ml-auto">{{ item.score }}</span>
        </UiComboboxItem>
      </UiComboboxContent>
    </ClientOnly>
  </UiCombobox>
</template>
