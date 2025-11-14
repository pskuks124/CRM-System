<script setup lang="ts">
import { ref } from "vue";
import ButtonsSection from "./ButtonsSection.vue";
import { formValidate } from "../util/store";
import { putTodos, deleteTodos } from "../api/api";
import type { Todo, TodoInfo } from "../types/types";
import TheButton from "./TheButton.vue";
import EditSVGComp from "../assets/editSVGComp.vue";
import DeleteSVGComp from "../assets/deleteSVGComp.vue";

const props = defineProps<{
  updateTasks: (passedFilter?: keyof TodoInfo) => Promise<void>;
  todo: Todo;
}>();

const inEditing = ref(false);
const todoTitle = ref(props.todo.title);
const isDone = ref(props.todo.isDone);
const errorMessage = ref("");

const cancelEdit = () => {
  toggleEdit();
  todoTitle.value = props.todo.title;
};
const toggleEdit = () => {
  inEditing.value = !inEditing.value;
};
const updateStatus = async () => {
  try {
    const todo = props.todo;
    todo.isDone = !todo.isDone;
    await putTodos(todo);
    await props.updateTasks();
  } catch (error) {
    alert("Ошибка при обновлении данных");
  }
};
const applyEdit = async (todo: Todo) => {
  errorMessage.value = formValidate(todoTitle.value);
  if (!errorMessage.value) {
    try {
      todo.title = todoTitle.value;
      await putTodos(todo);
      await props.updateTasks();
      toggleEdit();
    } catch (error) {
      alert("Ошибка при обновлении данных");
    }
  }
};

const deleteTask = async (id: number): Promise<void> => {
  try {
    await deleteTodos(id);
    await props.updateTasks();
  } catch (error) {
    alert("Ошибка при удалении данных");
  }
};
</script>

<template>
  <div class="task-container">
    <label class="status-mark">
      <input :checked="isDone" class="checkmark-input" type="checkbox" />
      <span @click="updateStatus" class="status-fill">✓</span>
    </label>
    <form @submit.prevent="applyEdit(todo)" :id="`editForm${todo.id}`">
      <input
        :disabled="!inEditing"
        ref="input"
        v-model.trim="todoTitle"
        type="text"
        class="edit-input"
        :class="{ done: isDone }"
      />
    </form>

    <ButtonsSection v-if="!inEditing">
      <TheButton @click="toggleEdit()" :bckg="'#5393ff'">
        <EditSVGComp />
      </TheButton>
      <TheButton @click="deleteTask(todo.id)" :bckg="'#ff6757'">
        <DeleteSVGComp />
      </TheButton>
    </ButtonsSection>
    <ButtonsSection v-else>
      <TheButton :bckg="'#5393ff'" :form="`editForm${todo.id}`">✓</TheButton>
      <TheButton @click="cancelEdit()" :bckg="'grey'">X</TheButton>
    </ButtonsSection>
  </div>
</template>

<style scoped>
.task-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #fff;
  margin: 10px 0;
  padding: 20px 10px;
  border-radius: 10px;
}
.status-mark,
.status-fill {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
}
.status-mark {
  margin: 10px 0 10px 5px;
  height: 25px;
  width: 26px;
  color: #fff;
  border: 1px solid gray;
}
.status-mark:hover {
  cursor: pointer;
}
.status-fill {
  font-size: 0.875rem;
  height: 25px;
  width: 26px;
  user-select: none;
}
.checkmark-input {
  width: 0px;
  height: 0px;
}
input:checked + .status-fill {
  background-color: #5393ff;
}
.task-name,
.edit-input {
  display: flex;
  flex-direction: row;
  margin: 10px 0 10px 40px;
  width: 25rem;
  font-family: "Times New Roman", Times, serif;
  font-size: 1.4rem;
  max-width: 300px;
  overflow-x: auto;
  word-wrap: break-word;
  white-space: pre-line;
  text-overflow: ellipsis;
}
.edit-input {
  border: none;
}
.done {
  text-decoration: line-through;
  color: grey;
}
</style>
