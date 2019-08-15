<template>
  <Layout :show-breadcrumbs="true">
    <PostList :posts="$page.tag.belongsTo.edges" :page-info="$page.tag.belongsTo.pageInfo" :base="`/posts/category/${$page.tag.title}`">
      <h2 class="text-4xl mb-12 flex items-center"><i class="fad fa-hashtag fa-sm mr-2"></i>Tag:<span class="font-normal ml-4">{{$page.tag.title}}</span></h2>
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