<script setup lang="ts">
const router = useRouter();

async function onSubmit(event: Event) {
  event.preventDefault();
  const formData = new FormData(event.target as HTMLFormElement);
  const title = formData.get("title") as string;

  const response = await $fetch("/api/rooms/create", {
    method: "POST",
    body: { title },
  });

  router.push(`/rooms/${response.code}`);
}
</script>

<template>
  <NuxtLink to="auth/sign-in"> Sign in </NuxtLink>

  <form @submit="onSubmit">
    <div>
      <label for="title">Title</label>
      <input type="text" id="title" name="title" required />
    </div>

    <button type="submit">Submit</button>
  </form>
</template>
