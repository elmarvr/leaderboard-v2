<script setup lang="ts">
import {
  FieldRoot as ArkFieldRoot,
  type FieldRootProps,
} from "@ark-ui/vue/field";
import { provideField } from "./use-field";
import { useFormContext } from "vee-validate";

const props = defineProps<FieldRootProps & { name: string }>();
const delegated = reactiveOmit(props, ["class"]);

const name = toRef(props, "name");
const field = provideField(name);

const form = useFormContext();

const isInvalid = computed(() => {
  return field.errors.value.length > 0 && form.submitCount.value > 0;
});
</script>

<template>
  <ArkFieldRoot
    v-bind="delegated"
    :invalid="isInvalid"
    :class="cx('flex flex-col gap-1.5', props.class)"
  >
    <slot />
  </ArkFieldRoot>
</template>
