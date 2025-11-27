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
        <RouterLink to="/profile"><p>Профиль</p></RouterLink>
        <RouterLink to="/"><p>Список Задач</p></RouterLink>
      </a-drawer>
    </nav>
    <div class="divide-container">
      <main class="main-container">
        <slot />
      </main>
    </div>
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
.divide-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 110rem;
}
.main-container {
  display: flex;
  flex-direction: column;
  padding: 30px 50px 30px 40px;
  max-width: 650px;
  font-size: 30px;
  width: 800px;
}
</style>
