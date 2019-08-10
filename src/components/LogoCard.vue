<template>
  <li
    class="flex flex-col items-center m-4 bg-white shadow rounded p-2 self-start fade-in"
    :class="{ show: isVisible }"
    v-observe-visibility="{
      callback: visibilityChanged,
      once: true,
      intersection: {
        rootMargin: '0px 0px -80px 0px'
      }
    }"
  >
    <img :alt="`${name} Logo`" :src="image" width="120" height="120"/>
    {{ name }}
  </li>
</template>

<script>
export default {
  name: "LogoCard",
  props: {
    name: {
      required: true,
      type: String
    },
    image: {
      required: true,
      type: String
    }
  },
  data() {
    return {
      isVisible: false
    };
  },
  methods: {
    visibilityChanged(isVisible) {
      this.isVisible = isVisible;
    }
  }
};
</script>

<style scoped></style>
