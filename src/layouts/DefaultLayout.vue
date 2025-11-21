<script lang="ts" setup>
import { ref } from "vue";
import { MenuOutlined } from "@ant-design/icons-vue";
const open = ref<boolean>(false);

const showDrawer = () => {
  open.value = true;
};
</script>

<template>
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
</template>
