<script setup lang="ts">
import type { TodoTab, filter } from "../types/types";
import { computed } from "vue";

const prop = defineProps<{
  tab: TodoTab;
  filter: filter;
}>();

const isSelected = computed(() => {
  return prop.filter === prop.tab.key;
});
</script>
<template>
  <div :class="{ selected: isSelected }" role="button">
    <slot></slot>
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
