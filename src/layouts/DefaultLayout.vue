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
        <RouterLink to="/profile"><p>Профиль</p></RouterLink>
        <RouterLink to="/"><p>Список Задач</p></RouterLink>
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
  flex-direction: column;
  width: 100%;
}
.navigation {
  display: flex;
  justify-content: space-between;
  padding: 30px 0;
  width: 100%;
}

.main-container {
  display: flex;
  flex-direction: column;
  margin: auto;
  max-width: 30rem;
  font-size: 2rem;
  width: 30rem;
}
.nav-link {
  display: block;
}
</style>
