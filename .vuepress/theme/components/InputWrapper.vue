<template>
  <div
    class="bg-grey-light p-1 rounded-lg shadow flex mb-4 mt-2"
    :class="{'bg-gradient': hasFocus, 'bg-gradient-alt': hasError}"
  >
    <slot/>
  </div>
</template>

<script>
export default {
  props: ["hasFocus", "hasError"]
};
</script>

<style scoped>
</style>