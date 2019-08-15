<template>
  <Layout>
    <div class="flex flex-col items-center">
      <h2 class="font-bold text-4xl tracking-wide mb-2">
        Thanks!
      </h2>
      <h3 class="text-2xl tracking-wide mb-12">
      I'll get back to you as soon as I can
      </h3>
      <g-link to="/" class="font-bold text-lg tracking-wide">
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
  components: {
    GradientButton
  }
};
</script>

<style scoped></style>
