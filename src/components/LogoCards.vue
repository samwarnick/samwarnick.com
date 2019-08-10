<template>
  <ul
    class="flex flex-wrap justify-center font-serif tracking-wide max-w-3xl mx-auto"
  >
    <LogoCard v-for="technology in technologies" :key="technology.name" :name="technology.name" :image="technology.image"/>
  </ul>
</template>

<script>
import LogoCard from "./LogoCard";
import technologies from "../../_content/technologies";

export default {
  name: "LogoCards",
    data() {
      return {
          technologies
      }
    },
    components: {
      LogoCard
    }
};
</script>

<style scoped></style>
