<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import TaskForm from "../components/TaskForm.vue";
import { getTodos } from "../api/api";
import TabList from "../components/TabList.vue";
import TaskList from "../components/TaskList.vue";
import type { Todo, TodoInfo, filter } from "../types/types";

const tasks = ref<Todo[]>([]);
let info = reactive<TodoInfo>({ all: 0, inWork: 0, completed: 0 });
const filter = ref<filter>("all");

const updateTasks = async (passedFilter?: filter): Promise<void> => {
  try {
    if (passedFilter) {
      filter.value = passedFilter;
    }
    const response = await getTodos(filter.value);
    tasks.value = response.data;
    if (response.info) {
      info = response.info;
    }
  } catch {
    alert("Ошибка при получении данных");
  }
};

onMounted(async () => updateTasks(filter.value));
</script>

<template>
  <div class="app">
    <div class="container">
      <TaskForm @refreshRequired="updateTasks" />
      <TabList :info="info" :filter="filter" @refreshRequired="updateTasks" />
      <TaskList :tasks="tasks" @refreshRequired="updateTasks" />
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
  padding: 30px 50px 30px 40px;
  max-width: 650px;
  width: 100%;
  font-size: 30px;
}
</style>
