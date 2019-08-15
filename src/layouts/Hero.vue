<template>
  <div>
    <header class="fixed top-0 z-50 w-full">
      <SiteNavigation
        :has-shadow="!heroVisible"
        :has-background="!heroVisible"
        ref="nav"
      >
        <h1
          class="text-white text-xl sm:text-2xl lowercase font-thin"
          :style="headerTitleStyles"
        >
          Sam Warnick
        </h1>
      </SiteNavigation>
    </header>

    <div
      class="h-screen-85 bg-gradient-texture flex flex-col items-center justify-center shadow"
      ref="hero"
    >
      <h2
        id="heroTitle"
        class="text-white text-3xl sm:text-4xl md:text-6xl lowercase font-thin"
        ref="heroTitle"
        :style="heroTitleStyles"
      >
        Sam Warnick
      </h2>
    </div>
    <div class="flex justify-center p-8 h-32">
      <i
        class="fad fa-chevron-down fa-3x"
        style="--fa-primary-color: #0290c9; --fa-secondary-color: #0290c9"
      ></i>
    </div>
    <transition name="fade" appear>
      <main>
        <slot />
      </main>
    </transition>
    <SiteFooter />
  </div>
</template>

<script>
import SiteNavigation from "../components/SiteNavigation";
import Main from "./Main";
import SiteFooter from "../components/SiteFooter";

export default {
  name: "HeroLayout",
  data() {
    return {
      heroVisible: true,
      heroTitleStyles: {
        opacity: 0,
        "--y-offset": "0px",
        "--translate-x": "0px",
        "--translate-y": "0px"
      },
      headerTitleStyles: {
        opacity: 0
      }
    };
  },
  mounted() {
    this.titleObserver_ = new IntersectionObserver(
      this.titleVisibilityChanged,
      {
        threshold: [0, 0.2, 0.4, 0.6, 0.8, 1],
        rootMargin: "-200px 0px 0px 0px"
      }
    );

    this.titleObserver_.observe(this.$refs.heroTitle);

    this.heroObserver_ = new IntersectionObserver(this.heroVisibilityChanged, {
      rootMargin: `-${this.$refs.nav.$el.clientHeight + 2}px 0px 0px 0px`
    });

    this.heroObserver_.observe(this.$refs.hero);

    this.scrollListener_ = document.addEventListener("scroll", e => {
      this.heroTitleStyles = {
        ...this.heroTitleStyles,
        "--y-offset": `${e.target.documentElement.scrollTop / 2}px`,
        "--translate-x": `${e.target.documentElement.scrollTop / 20}px`,
        "--translate-y": `${e.target.documentElement.scrollTop / 40}px`
      };
    });
  },
  destroyed() {
    this.titleObserver_.disconnect();
    this.heroObserver_.disconnect();
    document.removeEventListener("scroll", this.scrollListener_);
  },
  methods: {
    titleVisibilityChanged(entry) {
      this.heroTitleStyles.opacity = entry[0].intersectionRatio;
      this.headerTitleStyles.opacity = 1 - this.heroTitleStyles.opacity;
    },
    heroVisibilityChanged(entry) {
      this.heroVisible = entry[0].isIntersecting;
    }
  },
  components: {
    SiteNavigation,
    Main,
    SiteFooter
  }
};
</script>

<style scoped>
h1,
h2 {
  transition: opacity 0.3s linear;
}
#heroTitle {
  --y-offset: 0px;
  --translate-x: 0px;
  --translate-y: 0px;
  transform: translateY(var(--y-offset));
}
#heroTitle::before {
  content: "Sam Warnick";
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  color: transparent;
  text-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
  transform: translate(var(--translate-x), var(--translate-y));
}
</style>
