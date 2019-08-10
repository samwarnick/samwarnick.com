<template>
  <Layout>
    <div class="flex flex-col items-center mt-24">
      <h2 class="font-serif text-2xl tracking-wide mb-12">
        I'll get back to you as soon as I can!
      </h2>
      <g-link to="/" class="font-serif font-bold text-lg tracking-wide">
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
