<script setup lang="ts">
import type { TodoTab, filter, TodoInfo } from "../types/types";
import TheTab from "./TheTab.vue";

const tabs: TodoTab[] = [
  { name: "Все", key: "all" },
  { name: "в работе", key: "inWork" },
  { name: "сделано", key: "completed" },
];

defineProps<{
  info: TodoInfo;
  filter: filter;
}>();
const emit = defineEmits<{
  (e: "refreshRequired", passedFilter?: filter): Promise<void>;
}>();

const handleUpdate = async (filter?: filter | undefined): Promise<void> => {
  emit("refreshRequired", filter);
};
</script>

<template>
  <div class="task-sort-container">
    <TheTab
      @click="handleUpdate(tab.key)"
      v-for="tab in tabs"
      :key="tab.key"
      :tab="tab"
      :filter="filter"
    >
      {{ tab.name }} ({{ info[tab.key] }})
    </TheTab>
  </div>
</template>

<style scoped>
.task-sort-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 20px 0 0;
  width: 100%;
}
</style>
