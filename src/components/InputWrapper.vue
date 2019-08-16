<template>
  <div
    class="bg-gray-400 p-1 rounded-lg shadow-md flex mb-4 mt-2"
    :class="{ 'bg-gradient': hasFocus, 'bg-gradient-alt': hasError && !hasFocus }"
  >
    <slot />
  </div>
</template>

<script>
export default {
  props: ["hasFocus", "hasError"]
};
</script>

<style scoped></style>
