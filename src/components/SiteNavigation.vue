<template>
  <nav
    id="nav"
    class="flex items-center justify-between h-16 px-8 w-full"
    :class="{ 'shadow-md': hasShadow, 'bg-gradient-texture': hasBackground }"
  >
    <slot>
      <h1 class="flex-shrink-0">
        <g-link
          to="/"
          class="text-gray-900 px-2 bg-white text-xl sm:text-2xl lowercase font-thin hover:border-gray-900 transition border-2 border-transparent focus:outline-none focus:border-white shadow"
        >Sam Warnick</g-link>
      </h1>
    </slot>

    <ul class="nav-links" :class="{ show: navigationIsOpen }">
      <li class="nav-link">
        <g-link to="/projects">
          <i class="fad fa-browser fa-fw fa-lg mr-2 text-teal-500"></i>
          <span class="label">Projects</span>
        </g-link>
      </li>
      <li class="nav-link">
        <g-link to="/posts">
          <i class="fad fa-newspaper fa-fw fa-lg mr-2 text-red-500"></i>
          <span class="label">Blog</span>
        </g-link>
      </li>
      <li class="nav-link">
        <g-link to="/uses">
          <i class="fad fa-backpack fa-fw fa-lg fa-swap-opacity mr-2 text-blue-500"></i>
          <span class="label">Gear</span>
        </g-link>
      </li>
      <li class="nav-link">
        <g-link to="/contact">
          <i class="fad fa-paper-plane fa-fw fa-lg fa-swap-opacity mr-2 text-green-500"></i>
          <span class="label">Contact</span>
        </g-link>
      </li>
      <li class="nav-link">
        <g-link to="/move">
          <i class="fad fa-truck fa-fw fa-lg fa-swap-opacity mr-2 text-gray-800"></i>
          <span class="label">Move</span>
        </g-link>
      </li>
      <li class="nav-link">
        <a href="https://lilyandsam.show" target="_blank" rel="noopener">
          <i class="fad fa-podcast fa-fw fa-lg mr-2 text-purple-500"></i>Podcast ->
        </a>
      </li>
    </ul>

    <button
      :title="navigationIsOpen ? 'Close navigation' : 'Open navigation'"
      id="sideNavToggle"
      class="h-12 w-12 flex items-center justify-center text-white lg:hidden rounded-full focus:outline-none overflow-hidden"
      :class="{'bg-white': navigationIsOpen, 'text-blue-600': navigationIsOpen, 'shadow-lg': navigationIsOpen}"
      @click="toggleNavigation()"
    >
      <transition name="fade">
        <i
          v-if="navigationIsOpen"
          class="fad fa-times fa-fw fa-lg flex items-center justify-center"
        ></i>
        <i v-else class="far fa-bars fa-fw fa-lg flex items-center justify-center"></i>
      </transition>
    </button>

    <transition name="fade">
      <div
        v-if="navigationIsOpen"
        id="backdrop"
        class="fixed inset-0 pointer-events-none lg:hidden"
      ></div>
    </transition>
  </nav>
</template>

<script>
export default {
  name: "SiteNavigation",
  props: {
    hasShadow: {
      default: true,
      type: Boolean
    },
    hasBackground: {
      default: true,
      type: Boolean
    },
    fixed: {
      default: false,
      type: Boolean
    }
  },
  metaInfo() {
    return {
      bodyAttrs: {
        class: this.navigationIsOpen ? "no-scroll" : ""
      }
    };
  },
  data() {
    return {
      navigationIsOpen: false
    };
  },
  methods: {
    toggleNavigation() {
      this.navigationIsOpen = !this.navigationIsOpen;
    }
  }
};
</script>

<style scoped>
#backdrop {
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 500;
}
#sideNavToggle {
  z-index: 1500;
  transition: all 0.3s ease;
}
</style>
