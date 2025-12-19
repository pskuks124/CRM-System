<script setup lang="ts">
import TheTask from "./TheTask.vue";
import type { Todo, Filter } from "../types/todo-types";

defineProps<{
  tasks: Todo[];
}>();

const emit = defineEmits<{
  (e: "refreshRequired", passedFilter?: Filter): Promise<void>;
}>();
</script>

<template>
  <div class="task-arr-container">
    <TheTask
      v-for="todo in tasks"
      :todo="todo"
      :key="todo.id"
      @refreshRequired="emit('refreshRequired')"
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
