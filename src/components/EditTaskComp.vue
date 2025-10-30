<script setup lang="ts">
import { Todo } from "../util/api";
import editSVGComp from "../assets/editSVGComp.vue";

defineProps<{ item: Todo }>();

function editStart(item: Todo) {
  console.log("edittask start");
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
</style>
