<script setup lang="ts">
import { Todo, putTodos, TodoRequest } from "../util/api";
import { formValidate } from "../store";
import { type State } from "../store";
defineProps<{
  state: State;
  item: Todo;
}>();
function applyEdit(item: Todo, state: State) {
  const body = JSON.stringify(new TodoRequest(item.title, item.isDone));
  console.log(body);
  if (formValidate(item.title)) {
    putTodos(item.id, body, state);
    delete item.initialTitle;
  }
}
</script>
<template>
  <div class="apply-task-container" @click="applyEdit(item, state)">
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
