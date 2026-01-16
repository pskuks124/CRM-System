<script setup lang="ts">
import type { User } from "@/types/admin-types";

defineProps<{
  record: User;
}>();
const emit = defineEmits<{
  (e: "openBlockModalRequired", record: User): void;
}>();
</script>
<template>
  <button class="button" @click="emit('openBlockModalRequired', record)">
    {{ !record.isBlocked ? "Блок" : "Разблок" }}
  </button>
</template>
<style scoped>
.button {
  width: 71px;
  height: 33px;
  border-radius: 4px;
  border-width: 1px;
  gap: 4px;
  opacity: 1;
  border-color: black;
}
.button:hover {
  cursor: pointer;
}
</style>
