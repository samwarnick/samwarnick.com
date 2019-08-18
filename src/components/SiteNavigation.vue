<template>
  <nav
    id="nav"
    class="flex items-center justify-between h-16 px-8 w-full"
    :class="{ 'shadow-md': hasShadow, 'bg-gradient-texture': hasBackground }"
  >
    <g-link to="/" class="flex-shrink-0">
      <slot>
        <h1 class="text-black text-xl sm:text-2xl lowercase font-thin">
          Sam Warnick
        </h1>
      </slot>
    </g-link>

    <ul
      class="nav-links"
      :class="{ show: navigationIsOpen }"
      style="--fa-primary-color: #13293D; --fa-secondary-color: #006494; --fa-secondary-opacity: 0.80"
    >
      <li class="nav-link">
        <g-link to="/projects">
          <i class="fad fa-browser fa-fw fa-lg mr-2"></i>Projects
        </g-link>
      </li>
      <li class="nav-link">
        <g-link to="/posts">
          <i class="fad fa-newspaper fa-fw fa-lg mr-2"></i>Blog
        </g-link>
      </li>
      <li class="nav-link">
        <g-link to="/uses" style="--fa-primary-color: #006494; --fa-secondary-color: #13293D">
          <i class="fad fa-backpack fa-fw fa-lg fa-swap-opacity mr-2"></i>Gear
        </g-link>
      </li>
      <li class="nav-link">
        <g-link to="/contact" style="--fa-primary-color: #006494; --fa-secondary-color: #13293D" >
          <i class="fad fa-paper-plane fa-fw fa-lg fa-swap fa-swap-opacity mr-2"></i>Contact
        </g-link>
      </li>
      <li class="nav-link">
        <a href="https://lilyandsam.show" target="_blank" rel="noopener">
          <i class="fad fa-podcast fa-fw fa-lg mr-2"></i>Podcast
        </a>
      </li>
    </ul>

    <button
      :title="navigationIsOpen ? 'Close navigation' : 'Open navigation'"
      id="sideNavToggle"
      class="h-12 w-12 flex items-center justify-center text-black lg:hidden rounded-full focus:outline-none overflow-hidden"
      :class="{'bg-white': navigationIsOpen, 'text-blue-600': navigationIsOpen, 'shadow-lg': navigationIsOpen}"
      @click="toggleNavigation()"
    >
      <transition name="fade">
        <i v-if="navigationIsOpen" class="fad fa-times fa-fw fa-lg flex items-center justify-center"></i>
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
  transition: all .3s ease;
}
</style>
