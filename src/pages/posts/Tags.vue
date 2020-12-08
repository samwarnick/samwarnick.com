<template>
  <Layout :show-breadcrumbs="true">
    <h2 class="text-4xl mb-12 flex items-center">
      <FaIcon :icon="['fas', 'hashtag']" size="sm" class="mr-2" />Tags
    </h2>
    <ul>
      <li v-for="tag in $page.tags.edges" :key="tag.node.id" class="text-xl mb-2">
        <g-link class="group gradient-underline" :to="tag.node.path">
          {{ tag.node.title }}
          <span
            class="text-gray-600 group-hover:text-black transition"
          >({{ tag.node.belongsTo.totalCount }})</span>
        </g-link>
      </li>
    </ul>
  </Layout>
</template>

<page-query>
  query {
    tags: allTag {
      edges {
        node {
          id
          title
          path
          belongsTo {
            totalCount
          }
        }
      }
    }
  }
</page-query>

<script>
export default {
  metaInfo: {
    title: "Tags"
  },
  name: "Tags"
};
</script>

<style scoped></style>
