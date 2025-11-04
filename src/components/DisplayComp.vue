<script setup lang="ts">
import { type State } from "../types/types";
import SortComp from "./SortComp.vue";
import TaskListComp from "./TaskListComp.vue";

defineProps<{
  state: State;
}>();
</script>

<template>
  <div class="task-list-container">
    <SortComp :state="state" />
    <TaskListComp :state="state" />
  </div>
</template>

<style scoped>
.task-list-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 20px 0 10px;
  font-size: 30px;
}
</style>
