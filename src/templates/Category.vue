<template>
  <Layout>
    <div class="mt-24 mb-24">
      <h2 class="text-3xl mb-12 font-bold"><i class="fad fa-archive mr-2"></i>Category: {{$page.category.title}}</h2>
      <ul>
        <PostCard v-for="post in $page.category.belongsTo.edges" :key="post.id" :post="post.node" class="mb-12 odd:bg-gray-100 p-4 rounded-lg shadow-md"/>
      </ul>
    </div>
    <Pagination v-if="$page.category.belongsTo.pageInfo.totalPages > 1" :base="`/posts/category/${$page.category.title}`" :current-page="$page.category.belongsTo.pageInfo.currentPage" :total-pages="$page.category.belongsTo.pageInfo.totalPages"/>
  </Layout>
</template>

<page-query>
  query Category ($id: String! $page: Int) {
    category (id: $id) {
      title
      belongsTo(sortBy: "date", order: DESC, perPage: 5, page: $page) @paginate {
        pageInfo {
          totalPages
          currentPage
        }
        edges {
          node {
            ...on Post {
              id
              title
              date
              description
              path
              tags {
                id
                title
                path
              }
              categories {
                id
                title
                path
              }
            }
          }
        }
      }
    }
  }
</page-query>

<script>
    import PostCard from "../components/PostCard";
    import Pagination from "../components/Pagination";

    export default {
        name: "Category",
        components: {
            PostCard,
            Pagination
        }
    }
</script>

<style scoped>

</style>