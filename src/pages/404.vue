<template>
  <Layout>
    <div class="flex flex-col items-center mt-24">
      <span class="text-6xl">404</span>
      <h2 class="text-2xl mb-12">
        Shoot. I can't find that page. 😞
      </h2>
      <g-link to="/" class="font-bold text-lg">
        <GradientButton class="hover:underline">
          Back Home
        </GradientButton>
      </g-link>
    </div>
  </Layout>
</template>

<script>
import GradientButton from "../components/GradientButton";

export default {
  name: "404",
  metaInfo: {
    title: "404 - Not Found"
  },
  components: {
    GradientButton
  }
};
</script>

<style scoped></style>
