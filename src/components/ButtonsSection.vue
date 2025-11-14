<script setup lang="ts"></script>

<template>
  <div class="buttons">
    <slot></slot>
  </div>
</template>

<style scoped>
.buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 8.5rem;
}
</style>
