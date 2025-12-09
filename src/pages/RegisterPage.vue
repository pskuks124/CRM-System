<script setup lang="ts">
import type { UserRegistration } from "@/types/auth-types";
import authApi from "@/api/auth-api";
import { ref, reactive } from "vue";
import axios from "axios";

interface Form extends UserRegistration {
  repeatPassword: string;
}

const form = reactive<Form>({
  username: "",
  login: "",
  password: "",
  repeatPassword: "",
  email: "",
  phoneNumber: "",
});
const loading = ref(false);
const finishedRegistering = ref(false);

const rules = {
  username: [
    {
      required: true,
      max: 60,
      message: "от 1 до 60 символов русского/латинского алфавита",
    },
  ],
  login: [
    {
      required: true,
      min: 2,
      max: 60,
      message: "от 2 до 60 символов латинского алфавита",
    },
  ],
  password: [
    {
      required: true,
      min: 6,
      max: 60,
      message: "от 6 до 60 символов",
    },
  ],
  repeatPassword: [
    {
      required: true,
      validator: passwordMatchValidate,
      message: "пароли должны совпадать",
    },
  ],
  email: [
    {
      required: true,
      type: "email",
      message: "адрес почты должен быть корректным",
    },
  ],
  phoneNumber: [
    {
      required: false,
      type: "number",
      message: "номер телефона должен быть корректным",
    },
  ],
};

async function registerUser(): Promise<void> {
  console.log("register started");

  loading.value = true;
  try {
    await authApi.sendRegistrationData(form);
    finishedRegistering.value = true;
  } catch (error) {
    if (
      axios.isAxiosError(error) &&
      error.response &&
      error.response.status === 409
    ) {
      alert(
        "Пользователь с данным логином уже зарегистрирован. Попробуйте придумать другой",
      );
    } else alert("Не удалось зарегистрироваться");
  }
  loading.value = false;
  console.log("register finished");
}

async function passwordMatchValidate(): Promise<boolean> {
  return new Promise((resolve, reject) => {
    if (form.password === form.repeatPassword) {
      resolve(true);
    } else {
      reject(new Error());
    }
  });
}
</script>

<template>
  <section v-if="!finishedRegistering" class="register-container">
    <h4 class="heading">Регистрация</h4>
    <a-form
      :model="form"
      name="register-form"
      :rules="rules"
      layout="vertical"
      @finish="registerUser"
    >
      <a-form-item label="Имя" name="username"
        ><a-input v-model:value.trim="form.username" class="input"
      /></a-form-item>
      <a-form-item label="Логин" name="login"
        ><a-input v-model:value.trim="form.login" class="input"
      /></a-form-item>
      <a-form-item label="Пароль" name="password"
        ><a-input v-model:value.trim="form.password" class="input"
      /></a-form-item>
      <a-form-item label="Повторите пароль" name="repeatPassword"
        ><a-input v-model:value.trim="form.repeatPassword" class="input"
      /></a-form-item>
      <a-form-item label="Почта" name="email"
        ><a-input v-model:value.trim="form.email" class="input"
      /></a-form-item>
      <a-form-item label="Телефон" name="phoneNumber"
        ><a-input v-model:value.trim="form.phoneNumber" class="input"
      /></a-form-item>
      <a-form-item>
        <a-button
          :loading="loading"
          class="button"
          type="primary"
          htmlType="submit"
          >Зарегистрироваться</a-button
        >
      </a-form-item>
    </a-form>
    <p class="form-footer">
      Уже зарегистрированы? Вы можете
      <RouterLink to="/login">войти</RouterLink>.
    </p>
  </section>
  <a-result v-else status="success" title="Регистрация прошла успешно!">
    <template #extra>
      Теперь вы можете
      <RouterLink to="/login">авторизироваться</RouterLink>.
    </template>
  </a-result>
</template>

<style scoped>
.register-container {
  display: contents;
}
.heading {
  text-align: center;
}
.button {
  width: 100%;
}
.form-footer {
  font-size: 1rem;
  text-align: center;
}
</style>
