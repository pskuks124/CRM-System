<script setup lang="ts">
import { computed } from "vue";
import TheProfile from "@/components/TheProfile.vue";
import { useRoute } from "vue-router";
import { useSessionStore } from "@/stores/auth/session-store";

const route = useRoute();

const hasId = computed(() => !!route.params.id);

const userStore = useSessionStore();
</script>

<template>
  <RouterView v-if="hasId" />
  <TheProfile v-else :profile="userStore.profile" />
</template>

<style scoped></style>
