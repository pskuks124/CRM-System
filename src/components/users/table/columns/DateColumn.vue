<script setup lang="ts">
defineProps<{
  date: string;
}>();
const dateFormatter = new Intl.DateTimeFormat("de-DE", {
  day: "numeric",
  month: "2-digit",
  year: "numeric",
});
const formatDate = (date: string) => dateFormatter.format(new Date(date));
</script>
<template>
  <span>
    {{ date ? formatDate(date) : "" }}
  </span>
</template>
<style scoped></style>
