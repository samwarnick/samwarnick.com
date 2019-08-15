<template>
  <Layout :show-breadcrumbs="true">
    <PostList :posts="$page.category.belongsTo.edges" :page-info="$page.category.belongsTo.pageInfo" :base="`/posts/category/${$page.category.title}`">
      <h2 class="text-3xl mb-12 font-bold"><i class="fad fa-archive mr-2"></i>Category: {{$page.category.title}}</h2>
    </PostList>
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
    import PostList from "../components/PostList";

    export default {
        name: "Category",
        components: {
            PostList
        }
    }
</script>

<style scoped>

</style>