<template>
  <div
    class="flex flex-col md:flex-row items-center mb-12 max-w-3xl mx-auto px-8"
    v-observe-visibility="{
      callback: visibilityChanged,
      once: true,
      intersection: {
        rootMargin: '0px 0px -80px 0px'
      }
    }"
  >
    <g-image
      alt="Image of Sam Warnick"
      src="~/assets/images/profile.jpg"
      width="250"
      quality="100"
      class="rounded-lg shadow-md fade-and-slide-left"
      :class="{ show: isVisible }"
    />
    <div class="md:ml-6">
      <h2
        class="text-4xl my-4 text-center md:text-left fade-in"
        :class="{ show: isVisible }"
      >Hi There!</h2>
      <p class="mb-2 fade-in delay-1" :class="{ show: isVisible }">
        I'm Sam Warnick. I'm a software engineer based in South Carolina. I love
        collecting Lego sets, eating sesame chicken, and spending time with my
        family.
      </p>
      <p class="fade-in delay-2" :class="{ show: isVisible }">
        I mainly build and work on web apps, but I am also developing <a href="https://apps.apple.com/us/app/focuses/id1492385864?ls=1">Focuses</a>, an iOS app.
      </p>
      <ul class="list-reset flex flex-wrap items-center justify-center sm:justify-start text-4xl">
        <li class="mx-2 my-4 fade-in delay-1" :class="{ show: isVisible }">
          <a
            href="https://twitter.com/samwarnick"
            target="_blank"
            rel="noopener"
            title="Twitter"
            class="text-blue-600 hover:text-green-500"
          >
            <FaIcon :icon="['fab', 'twitter']" />
          </a>
        </li>
        <li class="mx-2 my-4 fade-in delay-2" :class="{ show: isVisible }">
          <a
            href="https://codepen.io/samwarnick/"
            target="_blank"
            rel="noopener"
            title="CodePen"
            class="text-blue-600 hover:text-orange-500"
          >
            <FaIcon :icon="['fab', 'codepen']" />
          </a>
        </li>
        <li class="mx-2 my-4 fade-in delay-3" :class="{ show: isVisible }">
          <a
            href="https://github.com/samwarnick"
            target="_blank"
            rel="noopener"
            title="GitHub"
            class="text-blue-600 hover:text-purple-500"
          >
            <FaIcon :icon="['fab', 'github']" />
          </a>
        </li>
        <li
          v-if="showResumeLink"
          class="mx-2 my-4 text-lg fade-in delay-4"
          :class="{ show: isVisible }"
        >
          <g-link
            to="/resume"
            class="text-base font-bold group"
            style="--fa-primary-color: #0290c9; --fa-secondary-color: #0290c9"
          >
            <span class="group-hover:underline">Résumé</span>
            <FaIcon :icon="['fad', 'chevron-right']" class="ml-2" />
          </g-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "AboutCard",
  props: {
    showResumeLink: {
      default: true
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

<style scoped>
.delay-1 {
  transition-delay: 0.2s;
}
.delay-2 {
  transition-delay: 0.3s;
}
.delay-3 {
  transition-delay: 0.4s;
}
.delay-4 {
  transition-delay: 0.6s;
}
</style>
