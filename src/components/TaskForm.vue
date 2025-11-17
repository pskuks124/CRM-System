<script setup lang="ts">
import { ref } from "vue";
import { formValidate } from "../util/store";
import { postTodos } from "../api/api";
import type { filter } from "../types/types";

const emit = defineEmits<{
  (e: "refreshRequired", passedFilter?: filter): Promise<void>;
}>();

const errorMessage = ref("");
const formText = ref("");

async function addTask() {
  errorMessage.value = formValidate(formText.value);
  if (!errorMessage.value) {
    try {
      await postTodos(formText.value);
      await emit("refreshRequired");
      formText.value = "";
    } catch {
      alert("Ошибка при отправке данных");
    }
  }
}
</script>

<template>
  <div class="task-form-container">
    <form @submit.prevent="addTask()" @click.stop class="form">
      <input
        v-model.trim="formText"
        class="input"
        type="text"
        placeholder="Task To Be Done..."
      />
      <button class="add-button">Add</button>
    </form>
    <p class="error">{{ errorMessage }}</p>
  </div>
</template>

<style scoped>
.task-form-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 40px;
}
.form {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 60px;
}
.input {
  display: flex;
  flex-direction: column;
  width: 28rem;
  margin: 5px;
  border: none;
  background-color: #f1f4fb;
  box-shadow: 0 2px 0 lightgray;
  font-size: 1.125rem;
}
.add-button {
  width: 9rem;
  margin: 5px 0 5px 5px;
  min-width: 20px;
  border-radius: 10px;
  background-color: #5393ff;
  color: #fff;
  border: none;
  font-size: 1.125rem;
}
.add-button:hover {
  cursor: pointer;
}
.error {
  font-size: 0.875rem;
  height: 14px;
  color: red;
  margin-left: 7px;
}
</style>
