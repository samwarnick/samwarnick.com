<template>
  <LayoutWrapper>
    <SubsetHeader
      :title="`Category: ${name}`"
      :icon="['fal', 'archive']"
      link="/category/"
      linkTitle="All Categories"
    />
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