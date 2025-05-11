<script setup lang="ts">
const route = useRoute();

const { data: members } = await useFetch(
  `/api/rooms/${route.params.code as ":code"}`,
  {
    transform(data) {
      return data.members.map((member) => ({
        id: member.id,
        name: member.user.name,
        score: member.score,
      }));
    },
  }
);
</script>

<template>
  <div class="container mx-auto pt-8">
    <Leaderboard :data="members ?? []" />
  </div>
</template>
