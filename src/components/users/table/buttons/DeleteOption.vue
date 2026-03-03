<script setup lang="ts">
import type { User } from "@/types/admin-types";

defineProps<{
  record: User;
}>();
const emit = defineEmits<{
  (e: "openDeleteModalRequired", record: User): void;
}>();
</script>
<template>
  <a-menu-item key="1">
    <a-button type="text" @click="emit('openDeleteModalRequired', record)">
      <span>Удалить пользователя</span>
    </a-button>
  </a-menu-item>
</template>
<style scoped></style>
