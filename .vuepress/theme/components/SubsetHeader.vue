<template>
  <header class="flex flex-wrap justify-between items-start mb-8 pb-8 border-b">
    <h1 class="mb-2">
      <FontAwesomeIcon :icon="icon" class="mr-2"/>
      <span>{{title}}</span>
    </h1>
    <RouterLink v-if="link" :to="link" class="text-lg font-bold no-underline font-serif text-black">
      <GradientBorder class="hover:underline">{{linkTitle}}</GradientBorder>
    </RouterLink>
  </header>
</template>

<script>
export default {
  props: ["title", "icon", "link", "linkTitle"]
};
</script>

<style scoped>
</style>