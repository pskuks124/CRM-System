<script setup lang="ts">
import TaskComp from "./TaskComp.vue";
import { type State } from "../types/types";

defineProps<{
  state: State;
}>();
</script>

<template>
  <div class="task-arr-container">
    <div v-for="item in state.tasks">
      <TaskComp :item="item" :state="state" />
    </div>
  </div>
</template>

<style scoped>
.task-arr-container {
  display: flex;
  flex-direction: column;
  width: 100%;
}
</style>
