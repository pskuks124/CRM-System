<script setup lang="ts">
import type { TodoTab, Filter, TodoInfo } from "../types/todo-types";

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
  (e: "refreshRequired", passedFilter?: Filter): void;
}>();

const handleUpdate = (filter?: Filter): void => {
  emit("refreshRequired", filter);
};
</script>

<template>
  <a-tabs class="tabs" :activeKey="filter" @update:activeKey="handleUpdate">
    <a-tab-pane
      class="tab"
      :tab="`${tab.name} (${info[tab.key]})`"
      v-for="tab in tabs"
      :key="tab.key"
    >
    </a-tab-pane>
  </a-tabs>
</template>

<style scoped></style>
