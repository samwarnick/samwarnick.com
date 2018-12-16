<template>
  <PostCard :post="post" subtle="true">
    <img
      :src="post.frontmatter.imgSrc"
      :alt="post.title"
      class="h-16 sm:h-24 rounded-lg shadow-md ml-2"
    >
    <FontAwesomeIcon :icon="['fal', 'podcast']" slot="postTypeIcon"/>
  </PostCard>
</template>

<script>
import PostCard from "./PostCard";
export default {
  props: ["post"],
  components: { PostCard }
};
</script>

<style scoped>
</style>