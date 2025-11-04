<script setup lang="ts">
import editSVGComp from "../assets/editSVGComp.vue";
import { Todo } from "../types/types";

defineProps<{ item: Todo }>();

function editStart(item: Todo) {
  item.initialTitle = item.title;
}
</script>

<template>
  <div class="edit-task-container" role="button">
    <div @click="editStart(item)" class="click-container">
      <editSVGComp />
    </div>
  </div>
</template>

<style scoped>
.edit-task-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 20%;
  width: 50px;
  height: 50px;
  background-color: #5393ff;
}

.click-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 18px;
  color: #fff;
}
.click-container:hover {
  cursor: pointer;
}
</style>
