<script setup lang="ts">
defineProps<{ bckg: string; form?: string }>();
</script>
<template>
  <button
    class="button-task-container"
    :style="{ background: bckg }"
    :form="form"
  >
    <slot></slot>
  </button>
</template>

<style scoped>
.button-task-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 20%;
  border: none;
  width: 50px;
  height: 50px;
  font-size: 1.125rem;
  color: #fff;
}
.button-task-container:hover {
  cursor: pointer;
}
</style>
