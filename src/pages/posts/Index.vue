<template>
  <Layout>
    <PostList :posts="$page.posts.edges" :page-info="$page.posts.pageInfo" >
      <h2 class="text-3xl mb-12 font-bold">Posts</h2>
    </PostList>
  </Layout>
</template>

<page-query>
query Posts ($page: Int) {
  posts: allPost (sortBy: "date", order: DESC, perPage: 5, page: $page) @paginate {
    totalCount
    pageInfo {
      totalPages
      currentPage
    }
    edges {
      node {
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
</page-query>

<script>
import PostList from "../../components/PostList";

export default {
    components: {
        PostList
    }
};
</script>
