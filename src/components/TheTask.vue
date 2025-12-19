<script setup lang="ts">
import { ref, reactive, watch } from "vue";
import { updateTodo, deleteTodo } from "../api/todo-api";
import type { Todo, Filter } from "../types/todo-types";
import { FormOutlined } from "@ant-design/icons-vue";
import { DeleteOutlined } from "@ant-design/icons-vue";
import { CheckOutlined } from "@ant-design/icons-vue";
import { CloseOutlined } from "@ant-design/icons-vue";
import { showError } from "../util/util";

const props = defineProps<{
  todo: Todo;
}>();

watch(
  () => props.todo.title,
  (newTitle: string) => {
    form.text = newTitle;
  },
);
const emit = defineEmits<{
  (e: "refreshRequired", passedFilter?: Filter): void;
}>();

const inEditing = ref(false);
const form = reactive({ text: props.todo.title });
const loading = ref(false);

const cancelEdit = () => {
  toggleEdit();
  form.text = props.todo.title;
};
const toggleEdit = () => {
  inEditing.value = !inEditing.value;
};
const updateStatus = async () => {
  try {
    const todo = { ...props.todo, isDone: !props.todo.isDone };
    loading.value = true;
    await updateTodo(todo);
    emit("refreshRequired");
  } catch {
    showError("Ошибка при изменении данных");
  }
  loading.value = false;
};
const applyEdit = async () => {
  try {
    const todo = { ...props.todo, title: form.text };
    await updateTodo(todo);
    emit("refreshRequired");
    toggleEdit();
  } catch {
    showError("Ошибка при изменении данных");
  }
};

const deleteTask = async (): Promise<void> => {
  try {
    await deleteTodo(props.todo.id);
    emit("refreshRequired");
  } catch {
    showError("Ошибка при удалении данных");
  }
};
</script>

<template>
  <a-form
    @finish="applyEdit"
    class="input-item"
    :id="`editForm${todo.id}`"
    layout="inline"
    :model="form"
    :rules="{
      text: [
        {
          required: true,
          min: 2,
          message: 'Текст задачи должен состоять хотя-бы из 2 символов',
          trigger: 'change',
        },
        {
          max: 64,
          message: 'Текст задачи не должен превышать 64 символа',
          trigger: 'change',
        },
      ],
    }"
  >
    <div class="task-container">
      <a-checkbox
        :checked="todo.isDone"
        @update:checked="updateStatus"
      ></a-checkbox>

      <a-form-item name="text">
        <span
          v-if="!inEditing"
          class="task-name"
          :class="{ done: todo.isDone }"
          >{{ form.text }}</span
        >
        <a-input
          v-else
          v-model:value.trim="form.text"
          size="large"
          class="task-input"
          :disabled="loading"
        />
      </a-form-item>
      <div v-if="!inEditing">
        <a-button type="primary" size="large" @click="toggleEdit">
          <template #icon>
            <FormOutlined />
          </template>
        </a-button>
        <a-button type="primary" danger size="large" @click="deleteTask">
          <template #icon>
            <DeleteOutlined />
          </template>
        </a-button>
      </div>
      <div v-else>
        <a-button
          type="primary"
          size="large"
          htmlType="submit"
          :form="`editForm${todo.id}`"
        >
          <template #icon>
            <CheckOutlined />
          </template>
        </a-button>
        <a-button @click="cancelEdit()" size="large">
          <template #icon>
            <CloseOutlined />
          </template>
        </a-button>
      </div>
    </div>
  </a-form>
</template>

<style scoped>
.task-container {
  display: flex;
  flex-direction: row;
  background-color: #fff;
  margin: 0.625rem 0;
  padding: 1.25rem 0.5rem;
  border-radius: 0.625rem;
  width: 30rem;
}
.task-name {
  display: inline-block;
  margin: 0 0.875rem;
  font-size: 1rem;
  width: 20rem;
}
.task-input {
  width: 20rem;
  margin-right: 1.75rem;
}
.done {
  text-decoration: line-through;
}
</style>
