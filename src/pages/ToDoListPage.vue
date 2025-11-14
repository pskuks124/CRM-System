<script setup lang="ts">
import { type Ref, type Reactive, ref, reactive, onMounted } from "vue";
import TaskForm from "../components/TaskForm.vue";
import { getTodos } from "../api/api";
import TabList from "../components/TabList.vue";
import TaskList from "../components/TaskList.vue";
import type { Todo, TodoInfo } from "../types/types";

const tasks: Ref<Todo[]> = ref([]);
const info: Reactive<TodoInfo> = reactive({ all: 0, inWork: 0, completed: 0 });
const filter: Ref<keyof TodoInfo> = ref("all");

const updateTasks = async (passedFilter?: keyof TodoInfo): Promise<void> => {
  try {
    if (passedFilter) {
      filter.value = passedFilter;
    }
    const response = await getTodos(filter.value);
    tasks.value.splice(0, tasks.value.length, ...response.data);

    if (response.info) {
      info.all = response.info.all;
      info.inWork = response.info.inWork;
      info.completed = response.info.completed;
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
      <TaskForm :updateTasks="updateTasks" />
      <TabList :info="info" :filter="filter" @updateTasks="updateTasks" />
      <TaskList :tasks="tasks" :updateTasks="updateTasks" />
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
