<template>
  <div class="bg-gradient-texture p-1 rounded-lg shadow hover:shadow-md transition inline-block">
    <div class="bg-white rounded px-4 py-1 flex items-center justify-center">
      <slot/>
    </div>
  </div>
</template>

<script>
    export default {
        name: "GradientButton"
    }
</script>

<style scoped>

</style>