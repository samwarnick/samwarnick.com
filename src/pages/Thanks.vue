<template>
  <Layout>
    <div class="flex flex-col items-center">
      <h2 class="font-bold text-4xl mb-2">
        Thanks!
      </h2>
      <h3 class="text-2xl mb-12">
        I'll get back to you as soon as I can
      </h3>
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
  name: "Thanks",
  metaInfo: {
    title: "Thanks!"
  },
  components: {
    GradientButton
  }
};
</script>

<style scoped></style>
