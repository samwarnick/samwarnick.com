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
      class="shadow hidden sm:block"
    />
    <div class="p-4 flex flex-col justify-between">
      <header>
        <g-link :to="project.path">
          <h3 class="text-2xl mb-2 flex items-center font-normal">
            <span class="gradient-underline">{{ project.name }}</span>
          </h3>
        </g-link>
        <p>{{ project.description }}</p>
        <a
          :href="project.link"
          class="group flex items-center text-gray-700 mt-4"
          target="_blank"
          rel="noopener"
        >
          <span class="group-hover:underline group-hover:text-purple-700">See it in action</span>
          <FaIcon :icon="['fad', 'external-link-alt']" size="xs" class="ml-2" />
        </a>
      </header>
      <footer class="flex items-center text-gray-700 text-sm mt-4 ml-2">
        <FaIcon :icon="['fad', 'code']" class="mr-2" />
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
  methods: {
    visibilityChanged(isVisible) {
      this.isVisible = isVisible;
    }
  }
};
</script>

<style scoped></style>
