<template>
  <div>
    <header class="fixed top-0 z-50 w-full">
      <SiteNavigation
        :has-shadow="!heroVisible"
        :has-background="!heroVisible"
        ref="nav"
      >
        <h1
          class="text-white text-xl sm:text-2xl lowercase font-serif"
          :style="{ opacity: 1 - heroTitleStyles.opacity }"
        >
          Sam Warnick
        </h1>
      </SiteNavigation>
    </header>

    <div
      class="h-screen-85 bg-gradient-texture flex flex-col items-center justify-center tracking-wide shadow"
      ref="hero"
    >
      <h2
        id="heroTitle"
        class="text-white text-3xl md:text-6xl lowercase text-shadow font-serif"
        ref="heroTitle"
        :style="heroTitleStyles"
      >
        Sam Warnick
      </h2>
    </div>
    <div class="flex justify-center p-8">
      <i
        class="fad fa-chevron-down fa-3x"
        style="--fa-primary-color: #0290c9; --fa-secondary-color: #0290c9"
      ></i>
    </div>
    <slot />
  </div>
</template>

<script>
import SiteNavigation from "../components/SiteNavigation";

export default {
  name: "Hero",
  data() {
    return {
      heroVisible: true,
      heroTitleStyles: {
        "opacity": 0,
        "--y-offset": '0px',
        "--translate-x": '0px',
        "--translate-y": '0px'
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
        "--y-offset":`${e.target.documentElement.scrollTop / 2}px`,
        "--translate-x": `${e.target.documentElement.scrollTop / 20}px`,
        "--translate-y": `${e.target.documentElement.scrollTop / 40}px`
      }
    });
  },
  destroyed() {
    this.titleObserver_.disconnect();
    this.heroObserver_.disconnect();
    document.removeEventListener('scroll', this.scrollListener_);
  },
  methods: {
    titleVisibilityChanged(entry) {
      this.heroTitleStyles.opacity = entry[0].intersectionRatio;
    },
    heroVisibilityChanged(entry) {
      this.heroVisible = entry[0].isIntersecting;
    }
  },
  components: {
    SiteNavigation
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
    text-shadow: 0 0 8px rgba(0,0,0,0.2);
  transform: translate(var(--translate-x), var(--translate-y))
}
</style>