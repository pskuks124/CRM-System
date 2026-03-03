<script setup lang="ts">
import phoneSVG from "/phone.svg";
defineProps<{
  phoneNumber: string;
}>();
</script>
<template>
  <a class="phone-number-link" :href="`tel:${phoneNumber}`">
    <img v-if="phoneNumber" :src="phoneSVG" alt="" class="phone-svg" />
    <span class="phone-number-inscription">
      {{ phoneNumber ? `(${phoneNumber})` : "" }}
    </span>
  </a>
</template>
<style scoped>
.phone-number-link {
  text-wrap: nowrap;
}
.phone-number-svg {
  color: var(--Color-Tokens-Content-Dark-Secondary, #727272);
  width: 20px;
  height: 20px;
  display: inline;
}
.phone-number-inscription {
  font-family: Inter;
  font-weight: 400;
  font-style: Regular;
  font-size: 14px;
  line-height: 150%;
  letter-spacing: 0%;
  color: var(--Color-Tokens-Content-Dark-Secondary, #727272);
}
</style>
