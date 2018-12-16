<template>
  <div class="mt-2 text-grey-dark flex flex-wrap">
    <time :datetime="frontmatter.date" class="mr-4 mb-2">{{frontmatter.date | formatDate}}</time>
    <TagList
      v-if="frontmatter.categories"
      :items="frontmatter.categories"
      :format-link="formatCategoryLink"
      class="mb-2"
    >
      <FontAwesomeIcon :icon="['fal', 'archive']"/>
    </TagList>
    <TagList
      v-if="frontmatter.tags"
      :items="frontmatter.tags"
      :format-link="formatTagLink"
      class="mb-2"
    >
      <FontAwesomeIcon :icon="['fal', 'hashtag']"/>
    </TagList>
  </div>
</template>

<script>
export default {
  props: ["frontmatter"],
  methods: {
    formatCategoryLink(category) {
      return `/category/${category}.html`;
    },
    formatTagLink(tag) {
      return `/tag/${tag}.html`;
    }
  }
};
</script>

<style scoped>
</style>