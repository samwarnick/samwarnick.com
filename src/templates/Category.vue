<template>
  <Layout :show-breadcrumbs="true">
    <PostList
      :posts="$page.category.belongsTo.edges"
      :page-info="$page.category.belongsTo.pageInfo"
      :base="`/posts/categories/${$page.category.title}`"
    >
      <h2 class="text-4xl mb-12">
        <i class="fad fa-archive fa-sm mr-2"></i>Category:<span
          class="font-normal ml-4"
          >{{ $page.category.title }}</span
        >
      </h2>
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
  metaInfo() {
    return {
      title: `Categories - ${this.$page.category.title}`
    };
  },
  components: {
    PostList
  }
};
</script>

<style scoped></style>
