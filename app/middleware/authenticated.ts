export default defineNuxtRouteMiddleware(() => {
  const { loggedIn, user } = useUserSession();

  if (!loggedIn.value) {
    return navigateTo("/auth/sign-in");
  }
});
