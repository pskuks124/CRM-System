<script setup lang="ts">
import DefaultLayout from "../layouts/DefaultLayout.vue";
</script>

<template>
  <div class="profile-page-container">
    <nav class="navigation">
      <DefaultLayout />
    </nav>
    <div class="divide-container">
      <main class="todo-list-container">Профиль</main>
    </div>
  </div>
</template>

<style scoped>
.profile-page-container {
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
.todo-list-container {
  display: flex;
  flex-direction: column;
  padding: 30px 50px 30px 40px;
  max-width: 650px;
  font-size: 30px;
  width: 800px;
}
</style>
