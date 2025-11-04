<script setup lang="ts">
import { getTodos } from "../util/api";
import type { TodoInfo, State, Tab } from "../types/types";
import { computed } from "vue";

const prop = defineProps<{
  state: State;
  tab: Tab;
}>();

const isSelected = computed(() => {
  return prop.state.sortType === prop.tab.name;
});
const className = prop.tab.name;

function showTodos(type: keyof TodoInfo, state: State) {
  state.sortType = type;
  getTodos(state);
}
</script>
<template>
  <div
    @click="showTodos(tab.name, state)"
    :class="{ selected: isSelected, className }"
    role="button"
  >
    {{ tab.displayed }} ({{ state.info[tab.name] }})
  </div>
</template>
<style scoped>
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
