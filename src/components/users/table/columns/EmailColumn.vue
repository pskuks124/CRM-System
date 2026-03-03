<script setup lang="ts">
import envelopeSVG from "/envelope.svg";
defineProps<{
  email: string;
}>();
</script>
<template>
  <a class="email-link" :href="`mailto:${email}`">
    <img :src="envelopeSVG" alt="" class="email-svg" />
    <span class="email-link-inscription">
      {{ email }}
    </span>
  </a>
</template>
<style scoped>
.email-link {
  text-wrap: nowrap;
}
.email-svg {
  color: var(--Color-Tokens-Content-Dark-Secondary, #727272);
  width: 20px;
  height: 20px;
  display: inline;
}
.email-link-inscription {
  font-family: Inter;
  font-weight: 500;
  font-style: Medium;
  font-size: 14px;
  line-height: 150%;
  letter-spacing: 0%;
  text-decoration: underline;
  text-decoration-style: solid;
  text-decoration-thickness: 0%;
  color: var(--Color-Tokens-Content-Dark-Primary, #000000);
}
</style>
