<script setup lang="ts">
import type { Tab, TodoInfo } from "../types/types";
import TheTab from "./TheTab.vue";

const tabs: Tab[] = [
  { name: "Все", key: "all" },
  { name: "в работе", key: "inWork" },
  { name: "сделано", key: "completed" },
];

defineProps<{
  info: TodoInfo;
  filter: keyof TodoInfo;
}>();
const emit = defineEmits<{
  (e: "updateTasks", passedFilter?: keyof TodoInfo): Promise<void>;
}>();

const handleUpdate = async (
  tabName?: keyof TodoInfo | undefined,
): Promise<void> => {
  emit("updateTasks", tabName);
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
