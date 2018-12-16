<template>
  <LayoutWrapper>
    <header class="flex justify-between items-center mb-8 pb-8 border-b">
      <h1>
        <FontAwesomeIcon :icon="['fal', 'hashtag']" class="mr-2"/>
        <span>Tag: {{name}}</span>
      </h1>
      <RouterLink to="/tag/" class="text-lg font-bold no-underline font-serif text-black">
        <GradientBorder class="hover:underline">All Tags</GradientBorder>
      </RouterLink>
    </header>
    <PostList :posts="$tag.posts"/>
  </LayoutWrapper>
</template>

<script>
export default {
  data() {
    return {
      name: ""
    };
  },
  created() {
    const start = this.$tag.path.lastIndexOf("/") + 1;
    const end = this.$tag.path.indexOf(".");
    this.name = this.$tag.path.substring(start, end);
  }
};
</script>
