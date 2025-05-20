<script setup lang="ts">
const route = useRoute();

const { data: participants } = await useApi("/room/participants");
</script>

<template>
  <div class="container mx-auto pt-8">
    <Leaderboard :data="participants ?? []" />
  </div>
</template>
