<script lang="ts" setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/api/auth-store";
import { MenuOutlined } from "@ant-design/icons-vue";
const { logout } = useAuthStore();
const open = ref<boolean>(false);

const showDrawer = () => {
  open.value = true;
};
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
      </a-drawer>
      <a-button @click="logout" class="button" type="primary">Выйти</a-button>
    </nav>

    <main class="main-container">
      <slot />
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
  padding: 30px 50px 30px 40px;
  margin: auto;
  max-width: 80rem;
  font-size: 30px;
  width: 60rem;
}
</style>
