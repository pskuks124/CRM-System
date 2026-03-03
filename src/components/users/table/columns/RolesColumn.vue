<script setup lang="ts">
import type { User } from "@/types/admin-types";
import { useSessionStore } from "@/stores/auth/session-store";
const sessionStore = useSessionStore();

defineProps<{
  record: User;
}>();
const emit = defineEmits<{
  (e: "openRolesModalRequired", record: User): void;
}>();
</script>
<template>
  <a-button
    type="text"
    :block="true"
    @click="emit('openRolesModalRequired', record)"
    :disabled="!sessionStore.adminAccess"
    style="height: fit-content"
  >
    <a-flex wrap="wrap">
      <a-tag
        v-for="role in record.roles"
        :key="role"
        :color="
          role === 'ADMIN'
            ? 'geekblue'
            : role === 'MODERATOR'
              ? 'volcano'
              : role === 'USER'
                ? 'purple'
                : 'red'
        "
        style="min-height: 1.5rem"
      >
        {{ role }}
      </a-tag>
    </a-flex>
  </a-button>
</template>
<style scoped></style>
