<template>
  <div class="flex items-center relative" :class="[currentPage > 1 ? 'justify-between' : 'justify-end']" style="--fa-primary-color: #0290c9; --fa-secondary-color: #0290c9">
    <g-link
      :to="previousPage"
      v-if="currentPage > 1"
      class="text-base font-bold tracking-wide">
      <GradientButton class="hover:underline"><i class="fad fa-chevron-left mr-2"></i>Previous</GradientButton>
    </g-link>
    <span class="absolute flex justify-center w-full pointer-events-none">{{ currentPage }} of {{ totalPages }}</span>
    <g-link
      :to="nextPage"
      v-if="currentPage < totalPages"
      class="text-base font-bold tracking-wide">
      <GradientButton class="hover:underline">Next<i class="fad fa-chevron-right ml-2"></i></GradientButton>
    </g-link>
  </div>
</template>

<script>
import GradientButton from "./GradientButton";

export default {
  name: "Pagination",
  props: {
    currentPage: {
      required: true,
      type: Number
    },
    totalPages: {
      required: true,
      type: Number
    },
      base: {
        type: String,
          default: '/posts'
      }
  },
  computed: {
    nextPage() {
        return `${this.base}/${this.currentPage + 1}`
    },
    previousPage() {
        const suffix = this.currentPage > 2 ? `/${this.currentPage - 1}` : '';
        return `${this.base}${suffix}`
    }
  },
    components: {
      GradientButton
    }
};
</script>

<style scoped></style>
