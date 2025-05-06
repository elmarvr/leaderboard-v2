<script setup lang="ts">
const route = useRoute();
const code = route.params.code as string;
</script>

<template>
  <div>
    <h1>Room {{ code }}</h1>
    <p>Welcome to the room!</p>
    <NuxtLink to="/">Back to Home</NuxtLink>
  </div>
</template>
