<script lang="ts" setup>
import { onBeforeMount, ref } from "vue";
import { useSessionStore } from "@/stores/auth/session-store";
import { MenuOutlined } from "@ant-design/icons-vue";
import { tokenManager } from "@/api/token-manager";

const sessionStore = useSessionStore();
const open = ref<boolean>(false);

const showDrawer = () => {
  open.value = true;
};
let refreshValidated = ref<boolean>(false);
onBeforeMount(async () => {
  if (tokenManager.refreshToken) {
    await sessionStore.validateToken().then(async () => {
      refreshValidated.value = true;
      await sessionStore.fetchProfile();
    });
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
        <RouterLink
          v-if="sessionStore.adminAccess || sessionStore.moderatorAccess"
          to="/user-list"
          class="nav-link"
          >Пользователи</RouterLink
        >
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
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 100%;
}
.navigation {
  padding: 30px 0;
}
.main-container {
  display: flex;
  flex-direction: column;
  margin: auto;
  min-width: 40rem;
  font-size: 2rem;
  height: 100%;
}
.nav-link {
  display: block;
  padding: 0.5rem 0;
}
.button {
  margin: 2rem 0;
}
</style>
