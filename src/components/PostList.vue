<template>
  <div>
    <slot/>
    <ul class="mb-24">
      <PostCard v-for="post in posts" :key="post.id" :post="post.node" class="mb-12 pb-12 border-b border-b-gray-100 last:border-b-0"/>
    </ul>
    <Pagination v-if="pageInfo.totalPages > 1" :current-page="pageInfo.currentPage" :total-pages="pageInfo.totalPages" :base="base"/>
  </div>
</template>

<script>
    import Pagination from "./Pagination";
    import PostCard from "./PostCard";

    export default {
        name: "PostList",
        props: {
            posts: {
                required: true,
                type: Array
            },
            pageInfo: {
                required: true,
                type: Object
            },
            base: {
                type: String
            }
        },
        components: {
            Pagination,
            PostCard
        }
    }
</script>

<style scoped>

</style>