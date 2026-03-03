<script setup lang="ts">
import { router } from "@/router/router";
import arrow from "/arrow.svg";

const props = defineProps<{
  id: number;
}>();
const viewProfile = () => {
  router.push(`/profile/${props.id}`);
};
</script>
<template>
  <button class="view-button" @click="viewProfile">
    <img class="arrow-image" :src="arrow" alt="" />
  </button>
</template>
<style scoped>
.view-button {
  display: flex;
  border-color: black;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 36px;
  height: 33px;
  opacity: 1;
  border-radius: 4px;
  border-width: 1px;
  gap: 4px;
}
.arrow-image {
  width: 12px;
  height: 17px;
}
</style>
