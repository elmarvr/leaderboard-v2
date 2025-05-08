<script setup lang="ts">
const route = useRoute();

const { data: room } = await useFetch(
  `/api/rooms/${route.params.code as ":code"}`
);
</script>

<template>
  <div v-if="room">
    <h1>Room {{ route.params.code }}</h1>
    <p>Welcome to the room!</p>
    <ul>
      <li v-for="(user, index) in room.users" :key="index">
        {{ user.name }} ({{ user.id }})
      </li>
    </ul>
    <NuxtLink to="/">Back to Home</NuxtLink>
  </div>
</template>
