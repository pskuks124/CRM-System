<script setup lang="ts">
import TaskSortComp from "./TaskSortComp.vue";
import TaskArrComp from "./TaskArrComp.vue";
</script>

<template>
  <div class="task-list-container">
    <TaskSortComp />
    <TaskArrComp />
  </div>
</template>

<style scoped>
.task-list-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 20px 0 10px;
  font-size: 30px;
}
</style>
