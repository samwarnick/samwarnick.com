<template>
  <div class="flex flex-col md:flex-row items-center relative bg-gray-100 p-4 rounded" :class="[currentPage > 1 ? 'justify-between' : 'justify-end']" style="--fa-primary-color: #0290c9; --fa-secondary-color: #0290c9">
    <span class="border-b border-gray-200 pb-2 md:absolute md:border-none md:pb-0 left-0 flex justify-center w-full pointer-events-none text-gray-700" style="order: -1">{{ currentPage }} of {{ totalPages }}</span>
    <div class="w-full mt-4 md:mt-0 buttons">
      <g-link
              :to="previousPage"
              v-if="currentPage > 1"
              class="text-base font-bold flex-grow pagination-button group">
          <i class="fad fa-chevron-left mr-2"></i><span class="group-hover:underline">Previous</span>
      </g-link>
      <g-link
              :to="nextPage"
              v-if="currentPage < totalPages"
              id="nextButton"
              class="text-base font-bold flex-grow group">
          <span class="group-hover:underline">Next</span><i class="fad fa-chevron-right ml-2"></i>
      </g-link>
    </div>
  </div>
</template>

<script>
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
  }
};
</script>

<style scoped>
  .buttons {
    display: grid;
    grid-template-columns: max-content 1fr max-content;
    grid-column-gap: 2em;
  }
  #nextButton {
    grid-column-start: 3;
  }
</style>
