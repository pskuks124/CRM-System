<script lang="ts" setup></script>

<template>
  <div class="login-layout-container">
    <main class="main-container">
      <RouterView />
    </main>
  </div>
</template>
<style scoped>
.login-layout-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.main-container {
  display: flex;
  flex-direction: column;
  padding: 2rem;
  max-width: 41rem;
  font-size: 2rem;
  width: 50rem;
}
</style>
