<script setup lang="ts">
import { getTodos, type TodoInfo } from "../util/api";
import { tasks, info, sortType } from "../store";

function showTodos(type: keyof TodoInfo) {
  sortType.value = type;
  getTodos(type, tasks, info);
}
</script>

<template>
  <div class="task-sort-container">
    <div
      @click="showTodos('all')"
      :class="{ selected: sortType === 'all' }"
      class="all-button"
      role="button"
    >
      Все ({{ info.all }})
    </div>
    <div
      @click="showTodos('inWork')"
      :class="{ selected: sortType === 'inWork' }"
      class="in-work-button"
      role="button"
    >
      в работе({{ info.inWork }})
    </div>
    <div
      @click="showTodos('completed')"
      :class="{ selected: sortType === 'completed' }"
      class="done-button"
      role="button"
    >
      сделано({{ info.completed }})
    </div>
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

.all-button:hover,
.in-work-button:hover,
.done-button:hover {
  cursor: pointer;
}
.all-button,
.in-work-button,
.done-button {
  border-bottom: 4px solid transparent;
  color: grey;
}
.all-button:hover,
.in-work-button:hover,
.done-button:hover,
.selected {
  border-bottom: 4px solid #23a8e0;
  color: #23a8e0;
  font-weight: bold;
}
</style>
