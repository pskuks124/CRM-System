<script setup lang="ts">
import TaskComp from "./TaskComp.vue";
import { tasks } from "../store";
</script>

<template>
  <div class="task-arr-container">
    <div v-for="item in tasks">
      <TaskComp :item="item" />
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
