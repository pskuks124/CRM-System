<script setup lang="ts">
import type { TodoTab, Filter, TodoInfo } from "../types/types";

const tabs: TodoTab[] = [
  { name: "Все", key: "all" },
  { name: "в работе", key: "inWork" },
  { name: "сделано", key: "completed" },
];
defineProps<{
  info: TodoInfo;
  filter: Filter;
}>();
const emit = defineEmits<{
  (e: "refreshRequired", passedFilter?: Filter): Promise<void>;
}>();

const handleUpdate = async (filter?: Filter | undefined): Promise<void> => {
  emit("refreshRequired", filter);
};
</script>

<template>
  <div class="task-sort-container">
    <a-tabs :activeKey="filter" @update:activeKey="handleUpdate">
      <a-tab-pane
        :tab="`${tab.name} (${info[tab.key]})`"
        v-for="tab in tabs"
        :key="tab.key"
      >
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<style scoped>
.task-sort-container {
  display: flex;
  flex-direction: row;
  width: 100%;
}
</style>
