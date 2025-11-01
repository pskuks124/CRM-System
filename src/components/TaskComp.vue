<script setup lang="ts">
import ButtonsSectionComp from "./ButtonsSectionComp.vue";
import EditTaskComp from "./EditTaskComp.vue";
import DeleteTaskContainer from "./DeleteTaskComp.vue";
import { Todo, TodoRequest, putTodos } from "../util/api";
import ApplyButtonComp from "./ApplyButtonComp.vue";
import CancelButtonComp from "./CancelButtonComp.vue";
import { type State } from "../store";

defineProps<{
  state: State;
  item: Todo;
}>();

const statusToggle = (item: Todo, state: State) => {
  const body = JSON.stringify(new TodoRequest(item.title, !item.isDone));
  putTodos(item.id, body, state);
};

function cancelOnBlur(item: Todo) {
  setTimeout(() => {
    cancelEdit(item);
  }, 200);
}

function cancelEdit(item: Todo) {
  if (item.initialTitle) {
    item.title = item.initialTitle;
    delete item.initialTitle;
  }
}
</script>

<template>
  <div class="task-container">
    <div @click="statusToggle(item, state)" class="status-mark">
      <div v-if="item.isDone" class="status-fill">
        <span class="checkmark">✓</span>
      </div>
    </div>
    <div
      v-if="!item.initialTitle"
      class="task-name"
      :class="{ done: item.isDone }"
    >
      {{ item.title }}
    </div>
    <input
      v-else
      v-model.trim="item.title"
      v-focus
      @blur="cancelOnBlur(item)"
      type="text"
      autofocus
      class="edit-input"
    />
    <ButtonsSectionComp v-if="!item.initialTitle">
      <EditTaskComp :item="item" />
      <DeleteTaskContainer :item="item" :state="state" />
    </ButtonsSectionComp>
    <ButtonsSectionComp v-else>
      <ApplyButtonComp :item="item" :state="state" />
      <CancelButtonComp :item="item" />
    </ButtonsSectionComp>
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
.status-fill,
.checkmark {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
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
  width: 100%;
  height: 100%;
  background-color: #5393ff;
}
.checkmark {
  font-size: 14px;
  user-select: none;
}
.task-name,
.edit-input {
  display: flex;
  flex-direction: row;
  margin: 10px 0 10px 40px;
  width: 75%;
  font-family: "Times New Roman", Times, serif;
  font-size: 23px;
  max-width: 300px;
  overflow-x: auto;
  word-wrap: break-word;
  white-space: pre-line;
  text-overflow: ellipsis;
}
.done {
  text-decoration: line-through;
  color: grey;
}
</style>
