<template>
  <Layout>
    <PostList :posts="$page.posts.edges" :page-info="$page.posts.pageInfo" >
      <h2 class="text-4xl font-bold mb-12">Posts</h2>
    </PostList>
    <div class="flex mt-32">
      <div class="mr-8">
        <h2 class="text-xl mb-4 font-bold text-gray-500 flex items-center"><i class="fad fa-archive fa-sm mr-2"></i>Categories</h2>
        <ul>
          <li v-for="category in $page.categories.edges" :key="category.node.id" class="mb-2">
            <g-link class="group gradient-underline" :to="category.node.path">{{category.node.title}} <span class="text-gray-600 group-hover:text-black transition">({{category.node.belongsTo.totalCount}})</span></g-link>
          </li>
        </ul>
      </div>
      <div>
        <h2 class="text-xl mb-4 font-bold text-gray-500 flex items-center"><i class="fad fa-hashtag fa-sm mr-2"></i>Tags</h2>
        <ul>
          <li v-for="tag in $page.tags.edges" :key="tag.node.id" class="mb-2">
            <g-link class="group gradient-underline" :to="tag.node.path">{{tag.node.title}} <span class="text-gray-600 group-hover:text-black transition">({{tag.node.belongsTo.totalCount}})</span></g-link>
          </li>
        </ul>
      </div>
    </div>
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
  categories: allCategory {
    edges {
      node {
        id
        title
        path
        belongsTo {
          totalCount
        }
      }
    }
  }
  tags: allTag {
    edges {
      node {
        id
        title
        path
        belongsTo {
          totalCount
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
