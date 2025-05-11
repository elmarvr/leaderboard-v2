<script setup lang="ts">
import { useField } from "../field/use-field";

const field = useField();
</script>

<template>
  <span v-if="field.meta.required" class="text-destructive">*</span>
</template>
