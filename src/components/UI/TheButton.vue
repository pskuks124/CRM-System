<script setup lang="ts">
defineProps<{ variant: "primary" | "secondary" | "danger"; form?: string }>();
</script>
<template>
  <button
    class="button-task-container"
    :class="`button-${variant}`"
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
.button-primary {
  background-color: var(--primary-color);
}
.button-secondary {
  background-color: var(--secondary-color);
}
.button-danger {
  background-color: var(--danger-color);
}
</style>
