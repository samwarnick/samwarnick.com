<template>
  <LayoutWrapper>
    <header class="flex justify-between items-center mb-8 pb-8 border-b">
      <h1>
        <FontAwesomeIcon :icon="['fal', 'archive']" class="mr-2"/>
        <span>Category: {{name}}</span>
      </h1>
      <RouterLink to="/category/" class="text-lg font-bold no-underline font-serif text-black">
        <GradientBorder class="hover:underline">All Categories</GradientBorder>
      </RouterLink>
    </header>
    <PostList :posts="$category.posts"/>
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
    const start = this.$category.path.lastIndexOf("/") + 1;
    const end = this.$category.path.indexOf(".");
    this.name = this.$category.path.substring(start, end);
  }
};
</script>