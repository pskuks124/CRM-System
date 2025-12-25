<script setup lang="ts">
import type { AuthData } from "@/types/auth-types";
import { ref, reactive } from "vue";
import { useAuthStore } from "@/stores/auth/auth-store";

const form = reactive<AuthData>({
  login: "",
  password: "",
});

const loading = ref(false);

const rules = {
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
};

async function authorizeUser(): Promise<void> {
  loading.value = true;
  const { login } = useAuthStore();
  await login(form);
  loading.value = false;
}
</script>

<template>
  <h4 class="heading">Авторизация</h4>
  <a-form
    :model="form"
    name="register-form"
    :rules="rules"
    layout="vertical"
    @finish="authorizeUser"
  >
    <a-form-item label="Логин" name="login"
      ><a-input v-model:value.trim="form.login" class="input"
    /></a-form-item>
    <a-form-item label="Пароль" name="password"
      ><a-input-password v-model:value.trim="form.password" class="input"
    /></a-form-item>
    <a-form-item>
      <a-button
        :loading="loading"
        class="button"
        type="primary"
        htmlType="submit"
        >Войти</a-button
      >
    </a-form-item>
  </a-form>
  <p class="form-footer">
    Нет аккаунта? Вы можете
    <RouterLink to="/register">зарегистрироваться</RouterLink>.
  </p>
</template>

<style scoped>
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
