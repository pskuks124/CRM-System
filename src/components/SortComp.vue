<script setup lang="ts">
import type { State, Tab } from "../types/types";
import TabComp from "./TabComp.vue";

const tabs: Tab[] = [
  { displayed: "Все", name: "all" },
  { displayed: "в работе", name: "inWork" },
  { displayed: "сделано", name: "completed" },
];

defineProps<{
  state: State;
}>();
</script>

<template>
  <div class="task-sort-container">
    <TabComp v-for="tab in tabs" :state="state" :tab="tab" />
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
