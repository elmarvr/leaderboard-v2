<script setup lang="ts">
import {
  ComboboxControl as ArkComboboxControl,
  ComboboxInput as ArkComboboxInput,
} from "@ark-ui/vue/combobox";
</script>

<template>
  <ArkComboboxControl>
    <ArkComboboxInput as-child>
      <input
        :class="
          cx(
            'flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50',
            ''
          )
        "
      />
    </ArkComboboxInput>
  </ArkComboboxControl>
</template>
