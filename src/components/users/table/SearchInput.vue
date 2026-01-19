<script setup lang="ts">
import magnifyingGlassSVG from "/magnifying-glass.svg";
const search = defineModel<string>();
const emit = defineEmits<{
  (e: "loadTableRequired"): void;
}>();
const handleEmit = () => {
  console.log(search.value);

  emit("loadTableRequired");
};
</script>
<template>
  <a-col :span="8">
    <a-form>
      <a-form-item>
        <a-input
          v-model:value.trim="search"
          @pressEnter="handleEmit"
          placeholder="Поиск по имени или email"
          class="input"
          autocomplete="off"
        >
          <template #prefix> <img :src="magnifyingGlassSVG" alt="" /> </template
        ></a-input>
      </a-form-item>
    </a-form>
  </a-col>
</template>
<style scoped></style>
