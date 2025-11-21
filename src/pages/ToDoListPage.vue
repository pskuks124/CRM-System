<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import TaskForm from "../components/TaskForm.vue";
import { refreshTodos } from "../api/api";
import TabList from "../components/TabList.vue";
import TaskList from "../components/TaskList.vue";
import type { Todo, TodoInfo, Filter } from "../types/types";
import DefaultLayout from "../layouts/DefaultLayout.vue";

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
  <div class="todo-list-page-container">
    <nav class="navigation">
      <DefaultLayout />
    </nav>
    <div class="divide-container">
      <main class="todo-list-container">
        <TaskForm @refreshRequired="updateTasks" />
        <TabList :info="info" :filter="filter" @refreshRequired="updateTasks" />
        <TaskList :tasks="tasks" @refreshRequired="updateTasks" />
      </main>
    </div>
  </div>
</template>

<style scoped>
.todo-list-page-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}
.navigation {
  padding: 30px 0;
}
.divide-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 110rem;
}
.todo-list-container {
  display: flex;
  flex-direction: column;
  padding: 30px 50px 30px 40px;
  max-width: 650px;
  font-size: 30px;
  width: 800px;
}
</style>
