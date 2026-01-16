<script setup lang="ts">
import filterSVG from "/filter.svg";
const emit = defineEmits<{
  (e: "openFilterModalRequired"): void;
}>();
</script>
<template>
  <a-col :span="3" :offset="1">
    <button class="filter-button" @click="emit('openFilterModalRequired')">
      <img class="filter-svg" :src="filterSVG" alt="" />Filter
    </button>
  </a-col>
</template>
<style scoped>
.filter-button {
  width: 98px;
  height: 37px;
  opacity: 1;
  border-radius: 4px;
  border-width: 1px;
  padding-top: 8px;
  padding-right: 12px;
  padding-bottom: 8px;
  padding-left: 12px;
  gap: 8px;
  font-family: Inter;
  font-weight: 500;
  font-style: Medium;
  font-size: 14px;
  line-height: 150%;
  letter-spacing: 0%;
}
.filter-button:hover {
  cursor: pointer;
}
.filter-svg {
  margin-right: 0.25rem;
}
</style>
