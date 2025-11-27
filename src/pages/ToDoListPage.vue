<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import TaskForm from "../components/TaskForm.vue";
import { refreshTodos } from "../api/api";
import TabList from "../components/TabList.vue";
import TaskList from "../components/TaskList.vue";
import type { Todo, TodoInfo, Filter } from "../types/types";

const tasks = ref<Todo[]>([]);
let info = reactive<TodoInfo>({ all: 0, inWork: 0, completed: 0 });
const filter = ref<Filter>("all");

const updateTasks = async (passedFilter?: Filter): Promise<void> => {
  try {
    if (passedFilter) {
      filter.value = passedFilter;
    }
    const response = await refreshTodos(filter.value);
    tasks.value = response.data;
    if (response.info) {
      info = response.info;
    }
  } catch {
    alert("Ошибка при получении данных");
  }
};

onMounted(async () => {
  updateTasks();
  setInterval(() => {
    if (!document.hidden) {
      updateTasks();
    }
  }, 5000);
});
</script>

<template>
  <TaskForm @refreshRequired="updateTasks" />
  <TabList :info="info" :filter="filter" @refreshRequired="updateTasks" />
  <TaskList :tasks="tasks" @refreshRequired="updateTasks" />
</template>

<style scoped></style>
