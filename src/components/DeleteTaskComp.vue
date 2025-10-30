<script setup lang="ts">
import deleteSVGComp from "../assets/deleteSVGComp.vue";
import { tasks } from "../store";
import { Todo, deleteTodos } from "../util/api";

defineProps<{ item: Todo }>();

function deleteTask(item: Todo) {
  deleteTodos(item.id, tasks);
  tasks.value.splice(
    tasks.value.findIndex((task) => task.id === item.id),
    1,
  );
}
</script>

<template>
  <div @click="deleteTask(item)" class="delete-task-container" role="button">
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
</style>
