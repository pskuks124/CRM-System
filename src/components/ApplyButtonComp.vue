<script setup lang="ts">
import { Todo, putTodos, TodoRequest } from "../util/api";
import { formValidate, tasks } from "../store";
defineProps<{ item: Todo }>();

function applyEdit(item: Todo) {
  const body = JSON.stringify(new TodoRequest(item.title, item.isDone));
  console.log(body);
  if (formValidate(item.title)) {
    putTodos(item.id, body, tasks);
    delete item.initialTitle;
  }
}
</script>
<template>
  <div class="apply-task-container" @click="applyEdit(item)">
    <div>✓</div>
  </div>
</template>

<style scoped>
.apply-task-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 20%;
  width: 50px;
  height: 50px;
  background-color: #5393ff;
  font-size: 18px;
  color: #fff;
}
</style>
