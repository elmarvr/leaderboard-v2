<script setup lang="ts">
const route = useRoute();

const { data: room } = await useFetch(
  `/api/rooms/${route.params.code as ":code"}`
);
</script>

<template>
  <Leaderboard :data="room?.users ?? []" />
</template>
