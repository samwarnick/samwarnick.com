<template>
  <Layout>
    <div class="mt-24 mb-24">
      <ul>
        <PostCard v-for="post in $page.posts.edges" :key="post.id" :post="post.node" class="mb-12 odd:bg-gray-100 p-4 rounded-lg shadow-md"/>
      </ul>
    </div>
    <Pagination :current-page="$page.posts.pageInfo.currentPage" :total-pages="$page.posts.pageInfo.totalPages"/>
  </Layout>
</template>

<page-query>
query Posts ($page: Int) {
  posts: allBlogPost (sortBy: "date", order: DESC, perPage: 5, page: $page) @paginate {
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
import PostCard from "../components/PostCard";
import Pagination from "../components/Pagination";

export default {
    components: {
        Pagination,
        PostCard
    }
};
</script>
