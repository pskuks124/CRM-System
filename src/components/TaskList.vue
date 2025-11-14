<script setup lang="ts">
import TheTask from "./TheTask.vue";
import type { Todo, TodoInfo } from "../types/types";

defineProps<{
  updateTasks: (passedFilter?: keyof TodoInfo) => Promise<void>;
  tasks: Todo[];
}>();
</script>

<template>
  <div class="task-arr-container">
    <TheTask
      v-for="todo in tasks"
      :todo="todo"
      :key="todo.id"
      :updateTasks="updateTasks"
    />
  </div>
</template>

<style scoped>
.task-arr-container {
  display: flex;
  flex-direction: column;
  width: 100%;
}
</style>
