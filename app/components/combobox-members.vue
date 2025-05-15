<script setup lang="ts">
import { UiCombobox, UiComboboxContent } from "#components";
import { createListCollection } from "@ark-ui/vue";

const route = useRoute();
const { data: members } = await useFetch(
  `/api/rooms/${route.params.code as ":code"}`,
  {
    transform: (data) => {
      return data.members;
    },
  }
);

const collection = computed(() => {
  return createListCollection({
    items: members.value ?? [],
    itemToString(item) {
      return item.user.name;
    },
    itemToValue(item) {
      return item.id.toString();
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
          {{ item.user.name }}
          <span class="text-muted-foreground ml-auto">{{ item.score }}</span>
        </UiComboboxItem>
      </UiComboboxContent>
    </ClientOnly>
  </UiCombobox>
</template>
