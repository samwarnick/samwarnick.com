<template>
  <LayoutWrapper>
    <PostList :posts="$pagination.posts"/>
    <div v-if="$pagination" class="flex flex-col items-center sm:flex-row px-8">
      <div class="flex-grow flex mb-4">
        <RouterLink
          v-if="$pagination.hasPrev"
          title="Next"
          :to="$pagination.prevLink"
          class="text-lg font-bold no-underline font-serif text-black"
        >
          <GradientBorder class="hover:underline">
            <FontAwesomeIcon :icon="['fal', 'chevron-left']" class="mr-2"/>
            <span>Newer Posts</span>
          </GradientBorder>
        </RouterLink>
      </div>
      <div class="flex-grow flex items-center justify-end mb-4">
        <RouterLink
          v-if="$pagination.hasNext"
          title="Next"
          :to="$pagination.nextLink"
          class="text-lg font-bold no-underline font-serif text-black"
        >
          <GradientBorder class="hover:underline">
            <span>Older Posts</span>
            <FontAwesomeIcon :icon="['fal', 'chevron-right']" class="ml-2"/>
          </GradientBorder>
        </RouterLink>
        <p v-else class="font-serif">You made it to the end! 👍</p>
      </div>
    </div>
  </LayoutWrapper>
</template>

<script>
export default {
  filters: {
    formatDate(date) {
      return format(date, "D MMM YYYY");
    }
  }
};
</script>