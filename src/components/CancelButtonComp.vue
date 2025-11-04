<script setup lang="ts">
import { Todo } from "../types/types";

defineProps<{ item: Todo }>();

function cancelEdit(item: Todo) {
  if (item.initialTitle) {
    item.title = item.initialTitle;
    delete item.initialTitle;
  }
}
</script>
<template>
  <div class="cancel-task-container" @click="cancelEdit(item)">
    <div>X</div>
  </div>
</template>

<style scoped>
.cancel-task-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 20%;
  width: 50px;
  height: 50px;
  background-color: #ff6757;
  font-size: 18px;
  color: #fff;
}
.cancel-task-container:hover {
  cursor: pointer;
}
</style>
