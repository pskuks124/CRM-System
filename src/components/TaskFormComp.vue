<script setup lang="ts">
import { ref } from "vue";
import { postTodos, TodoRequest } from "../util/api";
import { formValidate, type State } from "../store";

defineProps<{
  state: State;
}>();
const error = ref(true);

function addTask(text: string, state: State) {
  console.log("addtask start");
  error.value = formValidate(text);
  if (error.value) {
    const body = JSON.stringify(new TodoRequest(text.trim(), false));
    console.log(body);
    postTodos(body, state);
    text = "";
  }
}
</script>

<template>
  <div class="task-form-container">
    <form
      @submit.prevent="addTask(state.formText, state)"
      @click.stop
      class="form"
      action=""
    >
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
