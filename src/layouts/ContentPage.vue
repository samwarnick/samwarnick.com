<template>
  <Layout>
    <div class="mt-32">
      <slot />
      <div v-html="content" class="content"></div>
    </div>
  </Layout>
</template>

<script>
    export default {
        name: "ContentPage",
        props: {
            content: {
                required: true
            }
        }
    }
</script>

<style scoped>

</style>