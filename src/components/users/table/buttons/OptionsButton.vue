<script setup lang="ts">
import type { User } from "@/types/admin-types";
import threeDotsSVG from "/three-vertical-dots.svg";
import DeleteOption from "./DeleteOption.vue";

defineProps<{
  record: User;
}>();
const emit = defineEmits<{
  (e: "openDeleteModalRequired", record: User): void;
}>();
</script>
<template>
  <a-dropdown>
    <div class="dropdown-container">
      <img class="three-dots-image" :src="threeDotsSVG" alt="" />
    </div>
    <template #overlay>
      <a-menu>
        <DeleteOption
          @openDeleteModalRequired="emit('openDeleteModalRequired', record)"
          :record="record"
        />
      </a-menu>
    </template>
  </a-dropdown>
</template>
<style scoped>
.dropdown-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.25rem;
  height: 2.25rem;
  cursor: pointer;
}
.three-dots-image {
  width: 1.5rem;
  height: 1.5rem;
}
</style>
