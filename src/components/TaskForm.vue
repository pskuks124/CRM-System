<script setup lang="ts">
import { ref, reactive } from "vue";
import { createTodo } from "../api/todo-api";
import type { Filter } from "../types/types";

const emit = defineEmits<{
  (e: "refreshRequired", passedFilter?: Filter): Promise<void>;
}>();

const form = reactive({ text: "" });
const loading = ref(false);

async function addTask() {
  loading.value = true;
  try {
    await createTodo(form.text);
    await emit("refreshRequired");
    form.text = "";
  } catch {
    alert("Ошибка при отправке данных");
  }
  loading.value = false;
}
</script>

<template>
  <div class="task-form-container">
    <a-form
      @finish="addTask"
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
      <a-form-item name="text">
        <a-input
          v-model:value.trim="form.text"
          placeholder="Task To Be Done..."
          class="input"
          autocomplete="off"
        />
      </a-form-item>

      <a-form-item>
        <a-button type="primary" :loading="loading" htmlType="submit"
          >Add</a-button
        >
      </a-form-item>
    </a-form>
  </div>
</template>

<style scoped>
.task-form-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 40px;
}
</style>
