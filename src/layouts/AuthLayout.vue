<script lang="ts" setup></script>

<template>
  <div class="layout-container">
    <div class="auth-image-container"></div>

    <div class="content-container">
      <main class="main-container">
        <RouterView />
      </main>
    </div>
  </div>
</template>
<style scoped>
.layout-container {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
}
.auth-image-container {
  background-image: url("/auth-image.png");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  background-color: #ffe6c9;
  width: 100%;
  height: 100%;
  max-width: 1239px;
}
.content-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  justify-content: center;
  width: 100%;
}
.main-container {
  display: flex;
  flex-direction: column;
  padding: 2rem;
  max-width: 41rem;
  font-size: 2rem;
  width: 100%;
}
</style>
