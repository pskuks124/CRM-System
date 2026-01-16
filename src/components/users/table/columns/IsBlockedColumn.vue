<script setup lang="ts">
defineProps<{
  isBlocked: boolean;
}>();
</script>
<template>
  <span>
    {{ isBlocked ? "+" : "-" }}
  </span>
</template>
<style scoped></style>
