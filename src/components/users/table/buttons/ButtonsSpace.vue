<script setup lang="ts">
import type { User } from "@/types/admin-types";
import BlockButton from "./BlockButton.vue";
import ViewProfileButton from "./ViewProfileButton.vue";
import OptionsButton from "./OptionsButton.vue";
defineProps<{
  record: User;
}>();
const emit = defineEmits<{
  (e: "openBlockModalRequired"): void;
  (e: "openDeleteModalRequired"): void;
}>();
</script>
<template>
  <a-space>
    <BlockButton
      @openBlockModalRequired="emit('openBlockModalRequired')"
      :record="record"
    />
    <ViewProfileButton :id="record.id" />
    <OptionsButton
      @openDeleteModalRequired="emit('openDeleteModalRequired')"
      :record="record"
    />
  </a-space>
</template>
<style scoped></style>
