<script setup lang="ts"></script>

<template>
  <div class="app-container">
    <component :is="$route.meta.layout || 'div'">
      <RouterView />
    </component>
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f1f4fb;
  color: #000;
  height: 100vh;
  width: 100vw;
}
</style>
