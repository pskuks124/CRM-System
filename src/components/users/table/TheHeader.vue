<script setup lang="ts">
import FilterButton from "./buttons/FilterButton.vue";
import SearchInput from "./SearchInput.vue";
const search = defineModel<string>();
const emit = defineEmits<{
  (e: "loadTableRequired"): void;
  (e: "openFilterModalRequired"): void;
}>();
</script>
<template>
  <a-row justify="space-between">
    <a-col :span="4">
      <h3>Пользователи</h3>
    </a-col>
    <a-col :span="8"></a-col>
    <SearchInput
      :search="search"
      @loadTableRequired="emit('loadTableRequired')"
    />
    <FilterButton @openFilterModalRequired="emit('openFilterModalRequired')" />
  </a-row>
</template>
<style scoped></style>
