<script setup lang="ts">
import TaskFormComp from "./TaskFormComp.vue";
import TaskListComp from "./TaskListComp.vue";
</script>

<template>
  <div class="app">
    <div class="container">
      <TaskFormComp />
      <TaskListComp />
    </div>
  </div>
</template>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f1f4fb;
  color: #000;
  height: 100vh;
  width: 100vw;
}
.container {
  display: flex;
  flex-direction: column;
  padding: 30px;
  max-width: 650px;
  width: 100%;
}
</style>
