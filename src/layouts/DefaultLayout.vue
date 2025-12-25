<script lang="ts" setup>
import { onBeforeMount, ref } from "vue";
import { useAuthStore } from "@/stores/auth/auth-store";
import { MenuOutlined } from "@ant-design/icons-vue";
import { tokenManager } from "@/api/token-manager";

const { logout, refresh } = useAuthStore();
const open = ref<boolean>(false);

const showDrawer = () => {
  open.value = true;
};
let refreshValidated = ref<boolean>(false);
onBeforeMount(async () => {
  if (tokenManager.refreshToken) {
    await refresh().then(() => (refreshValidated.value = true));
  }
});
</script>

<template>
  <div class="default-layout-container">
    <nav class="navigation">
      <a-button @click="showDrawer"><MenuOutlined /></a-button>
      <a-drawer
        v-model:open="open"
        class="custom-class"
        root-class-name="root-class-name"
        title="Меню"
        placement="left"
      >
        <RouterLink to="/profile" class="nav-link">Профиль</RouterLink>
        <RouterLink to="/" class="nav-link">Список Задач</RouterLink>
        <a-button @click="logout" class="button" type="primary">Выйти</a-button>
      </a-drawer>
    </nav>

    <main class="main-container">
      <RouterView v-if="refreshValidated" />
    </main>
  </div>
</template>
<style scoped>
.default-layout-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}
.navigation {
  padding: 2rem 0;
}
.main-container {
  display: flex;
  flex-direction: column;
  margin: auto;
  max-width: 40rem;
  font-size: 2rem;
  width: 50rem;
}
.nav-link {
  display: block;
  padding: 0.5rem 0;
}
.button {
  margin: 1rem 0;
}
</style>
