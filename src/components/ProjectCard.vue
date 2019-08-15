<template>
  <li
    class="mb-8 even:bg-gray-100 rounded-lg overflow-hidden shadow hover:shadow-md transition flex fade-and-slide-up"
    :class="{ show: isVisible }"
    style="--fa-primary-color: #0290c9; --fa-secondary-color: #0290c9"
    v-observe-visibility="{
      callback: visibilityChanged,
      once: true
    }"
  >
    <g-image
      :alt="`Screenshot of ${project.name}`"
      v-if="project.image"
      :src="project.image"
      class="shadow hidden md:block"
    />
    <div class="p-4 flex flex-col justify-between">
      <header>
        <a :href="project.link" class="group" target="_blank">
          <h3 class="text-2xl mb-2 flex items-center">
            <span class="gradient-underline">{{ project.name }}</span
            ><i class="fad fa-external-link-alt fa-xs ml-2"></i>
          </h3>
        </a>
        <p>{{ project.description }}</p>
        <g-link
          :to="project.path"
          class="group flex items-center text-gray-600 mt-4"
        >
          <span class="group-hover:underline">See More</span
          ><i class="far fa-chevron-right fa-xs ml-2"></i>
        </g-link>
      </header>
      <footer class="flex items-center text-gray-600 text-sm mt-4 ml-2">
        <i class="fad fa-code mr-2"></i>
        <span>Built with {{ project.technologies | commaJoin }}</span>
      </footer>
    </div>
  </li>
</template>

<script>
export default {
  name: "ProjectCard",
  props: {
    project: {
      required: true,
      type: Object
    }
  },
  data() {
    return {
      isVisible: false
    };
  },
  filters: {
    commaJoin(values) {
      return values.join(", ");
    }
  },
  methods: {
    visibilityChanged(isVisible) {
      this.isVisible = isVisible;
    }
  }
};
</script>

<style scoped>

</style>
