<template>
  <Layout :show-breadcrumbs="true">
    <h2 class="text-4xl mb-12 flex items-center">
      <i class="fad fa-archive fa-sm mr-2"></i>Categories
    </h2>
    <ul>
      <li v-for="category in $page.categories.edges" :key="category.node.id" class="text-xl mb-2">
        <g-link class="group gradient-underline" :to="category.node.path">
          {{ category.node.title }}
          <span
            class="text-gray-600 group-hover:text-black transition"
          >({{ category.node.belongsTo.totalCount }})</span>
        </g-link>
      </li>
    </ul>
  </Layout>
</template>

<page-query>
  query {
    categories: allCategory {
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
    title: "Categories"
  },
  name: "Categories"
};
</script>

<style scoped></style>
