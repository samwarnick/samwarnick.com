<template>
  <ul class="list-reset">
    <li v-for="post in posts">
      <PodcastCard :post="post" v-if="post.frontmatter.type === 'podcast'"/>
      <LinkCard :post="post" v-else-if="post.frontmatter.type === 'link'"/>
      <PostCard :post="post" v-else/>
    </li>
  </ul>
</template>

<script>
export default {
  props: ["posts"]
};
</script>

<style scoped>
</style>