<script setup lang="ts">
import type { Profile } from "@/types/auth-types";
import { onBeforeMount, ref } from "vue";
import TheProfile from "@/components/TheProfile.vue";
import adminApi from "@/api/admin-api";
import { useRoute } from "vue-router";

const route = useRoute();

let profile = ref<Profile>({
  id: 0,
  username: "",
  email: "",
  date: "",
  isBlocked: false,
  roles: [],
  phoneNumber: "",
});
const refreshProfile = async () => {
  const { id } = route.params;
  profile.value = await adminApi.getProfile(Number(id));
};

onBeforeMount(async () => {
  refreshProfile();
});
</script>

<template>
  <TheProfile
    :profile="profile"
    :showButtons="true"
    @refreshRequired="refreshProfile"
  />
</template>

<style scoped></style>
