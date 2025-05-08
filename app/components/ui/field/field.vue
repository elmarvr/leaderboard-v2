<script setup lang="ts">
import {
  FieldRoot as ArkFieldRoot,
  type FieldRootProps,
} from "@ark-ui/vue/field";
import { provideField } from "./use-field";

const props = defineProps<FieldRootProps & { name: string }>();

const name = toRef(props, "name");
const field = provideField(name);

const delegated = computed(() => {
  const { class: _, ...rest } = props;

  return {
    ...rest,
    invalid: field.errors.value.length > 0,
  };
});
</script>

<template>
  <ArkFieldRoot
    v-bind="delegated"
    :class="cx('flex flex-col gap-1', props.class)"
  >
    <slot />
  </ArkFieldRoot>
</template>
