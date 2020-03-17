<template>
  <Layout :show-breadcrumbs="true">
    <PostList
      :posts="$page.tag.belongsTo.edges"
      :page-info="$page.tag.belongsTo.pageInfo"
      :base="`/posts/tags/${$page.tag.title}`"
    >
      <h2 class="text-4xl mb-12 flex items-center flex-wrap">
        <FaIcon :icon="['fad', 'archive']" size="sm" class="mr-2" />
        <span class="mr-4">Tag:</span>
        <span class="font-normal">{{ $page.tag.title }}</span>
      </h2>
    </PostList>
  </Layout>
</template>

<page-query>
  query Tag ($id: ID! $page: Int) {
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
  metaInfo() {
    return {
      title: `Tags - ${this.$page.tag.title}`
    };
  },
  components: {
    PostList
  }
};
</script>

<style scoped></style>
