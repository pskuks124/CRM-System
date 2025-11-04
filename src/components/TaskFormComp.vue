<script setup lang="ts">
import { ref } from "vue";
import { formValidate } from "../store";
import { postTodos } from "../util/api";
import { type State, TodoRequest } from "../types/types";

defineProps<{
  state: State;
}>();
const error = ref(true);

function addTask(state: State) {
  console.log("addtask start");
  error.value = formValidate(state.formText);
  if (error.value) {
    const body = JSON.stringify(new TodoRequest(state.formText.trim(), false));
    console.log(`body:${body}, initial text: ${state.formText}`);
    postTodos(body, state);
    state.formText = "";
    console.log(`changed text: ${state.formText}`);
  }
}
</script>

<template>
  <div class="task-form-container">
    <form @submit.prevent="addTask(state)" @click.stop class="form" action="">
      <input
        v-model.trim="state.formText"
        class="input"
        type="text"
        placeholder="Task To Be Done..."
      />
      <button class="add-button">Add</button>
    </form>
    <div class="error" :class="{ false: !error }"></div>
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
  width: 73%;
  margin: 5px;
  border: none;
  background-color: #f1f4fb;
  box-shadow: 0 2px 0 lightgray;
  font-size: 18px;
}
.add-button {
  width: 27%;
  margin: 5px 0 5px 5px;
  min-width: 20px;
  border-radius: 10px;
  background-color: #5393ff;
  color: #fff;
  border: none;
  font-size: 18px;
}
.add-button:hover {
  cursor: pointer;
}
.error {
  height: 14px;
  color: red;
  margin-left: 7px;
}
.false:before {
  font-size: 14px;
  content: "XXX";
}
</style>
