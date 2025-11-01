<script setup lang="ts">
import { reactive } from "vue";
import TaskFormComp from "./TaskFormComp.vue";
import TaskListComp from "./TaskListComp.vue";
import { getTodos } from "../util/api";
import { type State } from "../store";

const state = reactive<State>({
  formText: "",
  tasks: [],
  info: { all: 0, inWork: 0, completed: 0 },
  sortType: "all",
});
getTodos("all", state);
</script>

<template>
  <div class="app">
    <div class="container">
      <TaskFormComp :state="state" />
      <TaskListComp :state="state" />
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
