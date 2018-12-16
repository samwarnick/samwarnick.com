<template>
  <a v-if="external" :href="path" target="_blank" rel="noopener" class="gradient-underline">
    <slot/>
  </a>
  <RouterLink v-else :to="path" class="gradient-underline">
    <slot/>
  </RouterLink>
</template>

<script>
export default {
  props: ["external", "path"]
};
</script>

<style scoped>
</style>