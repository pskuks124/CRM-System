<script lang="ts" setup>
import { ref } from "vue";
import { MenuOutlined } from "@ant-design/icons-vue";
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
        <RouterLink to="/profile" class="nav-link">Профиль</RouterLink>
        <RouterLink to="/" class="nav-link">Список Задач</RouterLink>
      </a-drawer>
    </nav>
    <main class="main-container">
      <slot />
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
  padding: 30px 0;
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
}
</style>
