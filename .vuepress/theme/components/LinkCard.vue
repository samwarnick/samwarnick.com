<template>
  <PostCard :post="post">
    <FontAwesomeIcon :icon="['fal', 'link']" slot="postTypeIcon"/>
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