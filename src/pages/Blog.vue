<template>
  <Layout>
    <div>
      <div v-for="post in $page.posts.edges" :key="post.id">
        <a :href="post.node.path">{{post.node.title}}</a>
      </div>
    </div>
    <span>{{$page.posts.pageInfo.currentPage}}/{{$page.posts.pageInfo.totalPages}}</span>
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
        date (format: "D MMMM Y")
        description
        path
      }
    }
  }
}
</page-query>

<script>
export default {};
</script>
