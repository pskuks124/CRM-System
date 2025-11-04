<script setup lang="ts">
import deleteSVGComp from "../assets/deleteSVGComp.vue";
import { deleteTodos } from "../util/api";
import { type State, Todo } from "../types/types";

defineProps<{
  state: State;
  item: Todo;
}>();

function deleteTask(item: Todo, state: State) {
  deleteTodos(item.id, state);
  state.tasks.splice(
    state.tasks.findIndex((task) => task.id === item.id),
    1,
  );
}
</script>

<template>
  <div
    @click="deleteTask(item, state)"
    class="delete-task-container"
    role="button"
  >
    <deleteSVGComp />
  </div>
</template>

<style scoped>
.delete-task-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 20%;
  width: 50px;
  height: 50px;
  background-color: #ff6757;
}
.delete-task-container:hover {
  cursor: pointer;
}
</style>
