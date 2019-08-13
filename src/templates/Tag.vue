<template>
  <Layout>
    <div class="mt-24 mb-24">
      <h2 class="text-3xl mb-12"><i class="fad fa-hashtag mr-2"></i>Tag: {{$page.tag.title}}</h2>
      <ul>
        <PostCard v-for="post in $page.tag.belongsTo.edges" :key="post.id" :post="post.node" class="mb-12 odd:bg-gray-100 p-4 rounded-lg shadow-md"/>
      </ul>
    </div>
    <Pagination v-if="$page.tag.belongsTo.pageInfo.totalPages > 1" :base="`/posts/tag/${$page.tag.title}`" :current-page="$page.tag.belongsTo.pageInfo.currentPage" :total-pages="$page.tag.belongsTo.pageInfo.totalPages"/>
  </Layout>
</template>

<page-query>
  query Tag ($id: String! $page: Int) {
    tag (id: $id) {
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
        name: "Tag",
        components: {
            PostCard,
            Pagination
        }
    }
</script>

<style scoped>

</style>