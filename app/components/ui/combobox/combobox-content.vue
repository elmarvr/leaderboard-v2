<script setup lang="ts">
import {
  ComboboxContent as ArkComboboxContent,
  ComboboxPositioner as ArkComboboxPositioner,
  useComboboxContext,
  type ComboboxContentProps,
} from "@ark-ui/vue/combobox";

const props = defineProps<ComboboxContentProps>();
const delegated = reactiveOmit(props, ["class"]);
</script>

<template>
  <Teleport to="body">
    <ArkComboboxPositioner>
      <ArkComboboxContent
        v-bind="delegated"
        :class="
          cx(
            'relative z-50 p-1 overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md',
            props.class
          )
        "
      >
        <slot />
      </ArkComboboxContent>
    </ArkComboboxPositioner>
  </Teleport>
</template>

<!-- max-h-[--radix-select-content-available-height] -->
