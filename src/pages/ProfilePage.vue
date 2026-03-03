<script setup lang="ts">
import authApi from "@/api/auth-api";
import type { Profile } from "@/types/auth-types";
import { computed, onBeforeMount, ref } from "vue";

let profile = ref<Profile>();

const displayedProfile = computed(() => ({
  phoneNumber:
    profile.value && profile.value.phoneNumber
      ? profile.value.phoneNumber
      : "не указан",
}));

onBeforeMount(async () => {
  profile.value = await authApi.getProfile();
});
</script>

<template>
  <h2 class="heading">Профиль</h2>
  <section class="profile-container">
    <span class="label">Имя пользователя: </span>
    <span class="profile-value">{{ profile?.username }}</span>

    <span class="label">Почтовый адрес: </span>
    <span class="profile-value">{{ profile?.email }}</span>

    <span class="label">Номер телефона: </span>
    <span class="profile-value">{{ displayedProfile.phoneNumber }}</span>
  </section>
</template>

<style scoped>
.profile-container {
  display: grid;
  grid-template-columns: 20rem 30rem;
  grid-gap: 1rem;
}
.heading {
  margin: 3rem 0 10rem;
}
.label {
  font-weight: bold;
}
.button {
  margin: 5rem 0 0;
}
</style>
