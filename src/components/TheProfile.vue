<script setup lang="ts">
import adminApi from "@/api/admin-api";
import { useSessionStore } from "@/stores/auth/session-store";
import type { UserRequest, User } from "@/types/admin-types";
import type { Profile } from "@/types/auth-types";
import { reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";

const { logout } = useSessionStore();

const props = defineProps<{
  profile: User | Profile;
  showButtons?: boolean;
}>();

const emit = defineEmits<{
  (e: "refreshRequired"): void;
}>();

const profileForm = reactive<UserRequest>({
  username: "",
  email: "",
  phoneNumber: "",
});

const router = useRouter();

const inEditing = ref(false);
const loading = ref(false);

const rules = {
  username: [
    {
      required: true,
      max: 60,
      message: "от 1 до 60 символов русского/латинского алфавита",
      trigger: ["change", "blur"],
    },
  ],
  email: [
    {
      required: true,
      type: "email",
      message: "адрес почты должен быть корректным",
      trigger: ["change", "blur"],
    },
  ],
  phoneNumber: [
    {
      required: false,
      pattern: new RegExp(/^\+\d{11}|^\d{11}$/),
      message: "номер телефона должен быть корректным",
      trigger: ["change", "blur"],
    },
  ],
};

const setInEditing = (value: boolean) => (inEditing.value = value);
const setLoading = (value: boolean) => (loading.value = value);
const applyEdit = async () => {
  setLoading(true);
  const requestBody: UserRequest = {};
  for (const key in profileForm) {
    const field = key as keyof UserRequest;
    if (profileForm[field] !== props.profile[field])
      requestBody[field] = profileForm[field];
  }
  await adminApi.editProfile(props.profile.id, requestBody).finally(() => {
    setLoading(false);
    setInEditing(false);
    emit("refreshRequired");
  });
};
const resetForm = () => {
  if (props.profile) {
    const { username, email, phoneNumber } = props.profile;
    Object.assign(profileForm, { username, email, phoneNumber });
  }
};

watch(() => props.profile, resetForm, { immediate: true });
</script>
<template>
  <h5 class="heading">Профиль</h5>
  <section class="profile-container">
    <a-form
      :model="profileForm"
      name="profile-edit-form"
      :rules="rules"
      :hideRequiredMark="true"
      :labelCol="{ span: 8 }"
      :wrapperCol="{ span: 8 }"
      labelAlign="left"
      @finish="applyEdit"
    >
      <a-form-item label="Имя пользователя" name="username">
        <a-input
          v-if="inEditing"
          v-model:value="profileForm.username"
          class="input"
        />
        <span v-else class="profile-value">{{ profile.username }}</span>
      </a-form-item>
      <a-form-item label="Почтовый адрес" name="email">
        <a-input
          v-if="inEditing"
          v-model:value="profileForm.email"
          class="input"
        />
        <span v-else class="profile-value">{{ profile.email }}</span>
      </a-form-item>
      <a-form-item label="Номер телефона" name="phoneNumber">
        <a-input
          v-if="inEditing"
          v-model:value="profileForm.phoneNumber"
          class="input"
        />
        <span v-else class="profile-value">{{ profile.phoneNumber }}</span>
      </a-form-item>
      <a-row v-if="showButtons">
        <a-col :span="8">
          <a-form-item>
            <a-button
              v-if="!inEditing"
              class="button"
              type="primary"
              @click="setInEditing(true)"
              >Редактировать</a-button
            >
            <a-button
              v-else
              class="button"
              type="primary"
              htmlType="submit"
              :loading="loading"
              >Сохранить</a-button
            >
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item>
            <a-button
              class="button"
              type="primary"
              @click="router.push('/user-list')"
              >Вернуться к таблице</a-button
            >
          </a-form-item>
        </a-col>
      </a-row>
      <a-button v-else @click="logout" class="button" type="primary"
        >Выйти</a-button
      >
    </a-form>
  </section>
</template>

<style scoped>
.heading {
  margin: 3rem 0;
}
.profile-container {
  width: 100%;
  height: 100%;
  margin: 12rem 0;
}
</style>
