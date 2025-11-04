<script setup lang="ts">
import { reactive } from "vue";
import TaskFormComp from "../components/TaskFormComp.vue";
import { getTodos } from "../util/api";
import { type State } from "../types/types";
import DisplayComp from "../components/DisplayComp.vue";

const state = reactive<State>({
  formText: "",
  tasks: [],
  info: { all: 0, inWork: 0, completed: 0 },
  sortType: "all",
});
// setInterval(() => {
// for (const property in state) {
// console.log(state[property as keyof State]);
// }
getTodos(state);
// }, 1000);
</script>

<template>
  <div class="app">
    <div class="container">
      <TaskFormComp :state="state" />
      <DisplayComp :state="state" />
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
