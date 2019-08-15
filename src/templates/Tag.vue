<template>
  <Layout :show-breadcrumbs="true">
    <PostList :posts="$page.tag.belongsTo.edges" :page-info="$page.tag.belongsTo.pageInfo" :base="`/posts/category/${$page.tag.title}`">
      <h2 class="text-3xl mb-12 font-bold"><i class="fad fa-hashtag mr-2"></i>Tag: {{$page.tag.title}}</h2>
    </PostList>
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
    import PostList from "../components/PostList";

    export default {
        name: "Tag",
        components: {
            PostList
        }
    }
</script>

<style scoped>

</style>