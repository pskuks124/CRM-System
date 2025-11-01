<script setup lang="ts">
import { getTodos, type TodoInfo } from "../util/api";
import { type State } from "../store";

defineProps<{
  state: State;
}>();

function showTodos(type: keyof TodoInfo, state: State) {
  state.sortType = type;
  getTodos(type, state);
}
</script>

<template>
  <div class="task-sort-container">
    <div
      @click="showTodos('all', state)"
      :class="{ selected: state.sortType === 'all' }"
      class="all-button"
      role="button"
    >
      Все ({{ state.info.all }})
    </div>
    <div
      @click="showTodos('inWork', state)"
      :class="{ selected: state.sortType === 'inWork' }"
      class="in-work-button"
      role="button"
    >
      в работе({{ state.info.inWork }})
    </div>
    <div
      @click="showTodos('completed', state)"
      :class="{ selected: state.sortType === 'completed' }"
      class="done-button"
      role="button"
    >
      сделано({{ state.info.completed }})
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
