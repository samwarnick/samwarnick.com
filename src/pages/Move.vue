<template>
  <Layout>
    <h2 class="text-4xl font-bold mb-12 leading-none">
      Have I moved yet?
      <span class="font-light ml-4">{{haveIMovedYet ? 'Yes' : 'No'}}</span>
    </h2>

    <p class="mb-8">I will move in about {{daysToMove}}, ± a few hours.</p>

    <h3 class="text-2xl font-bold leading-none mb-8">How's the Move Going?</h3>
    <transition-group name="fade" tag="ul" class="text-gray-900" appear>
      <li
        v-for="(step, index) in steps"
        :key="step.title"
        :style="`--i: ${index}`"
        class="text-xl flex items-center mb-6 font-light"
      >
        <FaLayers v-if="step.complete" class="fa-2x fa-fw mr-4">
          <FaIcon :icon="step.icon" class="text-gray-400" transform="shrink-4" />
          <FaIcon :icon="['fal', 'check-circle']" class="text-green-500" />
        </FaLayers>
        <FaIcon
          v-if="!step.complete"
          :icon="step.icon"
          class="fad fa-fw fa-2x mr-4"
          :class="[step.current ? 'text-blue-600': 'text-gray-500']"
        />
        {{step.title}}
        <span v-if="step.current" class="text-blue-500 text-base">
          <FaIcon :icon="['fal', 'arrow-left']" class="ml-4 mr-2" />We are here
        </span>
      </li>
    </transition-group>
  </Layout>
</template>

<script>
import { distanceInWordsToNow } from "date-fns";

export default {
  data() {
    return {
      haveIMovedYet: false,
      daysToMove: distanceInWordsToNow(new Date(2019, 10, 9)),
      steps: [
        {
          title: "Deciding Whether to Move",
          icon: ["fad", "comments"],
          complete: true
        },
        {
          title: "Planning",
          icon: ["fad", "clipboard-list-check"],
          current: true
        },
        {
          title: "De-cluttering",
          icon: ["fad", "trash"],
          current: true
        },
        {
          title: "Packing",
          icon: ["fad", "box-open"]
        },
        {
          title: "Loading Truck",
          icon: ["fad", "truck-couch"]
        },
        {
          title: "Travelling to South Carolina",
          icon: ["fad", "plane"]
        },
        {
          title: "Unpacking",
          icon: ["fad", "truck-loading"]
        },
        {
          title: "Building House",
          icon: ["fad", "hammer"]
        },
        {
          title: "Moving Into New House",
          icon: ["fad", "home"]
        }
      ]
    };
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s calc(var(--i) * 50ms) ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
</style>