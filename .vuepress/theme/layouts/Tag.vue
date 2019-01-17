<template>
  <LayoutWrapper>
    <SubsetHeader
      :title="`Tag: ${name}`"
      :icon="['fal', 'hashtag']"
      link="/tag/"
      linkTitle="All Tags"
    />
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
