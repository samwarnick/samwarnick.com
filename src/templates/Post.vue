<template>
  <Layout :show-breadcrumbs="true">
    <header>
      <h2 class="text-4xl md:text-5xl font-extrabold leading-none mb-4">
        {{ $page.post.title }}
      </h2>
      <div class="text-gray-500 flex flex-col md:flex-row">
        <span class="mr-4">
          <i class="fad fa-calendar mr-2 text-gray-600"></i
          ><time :datetime="$page.post.date">{{
            $page.post.date | formatDate
          }}</time>
        </span>
        <span class="mr-2" v-if="$page.post.categories.length > 0">
          <i class="fad fa-archive mr-2 text-gray-600"></i
          ><g-link
            v-for="category in $page.post.categories"
            :to="category.path"
            :key="category.id"
            class="mr-2 hover:underline"
            >{{ category.title }}</g-link
          >
        </span>
        <span v-if="$page.post.tags.length > 0">
          <i class="fad fa-hashtag mr-2 text-gray-600"></i
          ><g-link
            v-for="tag in $page.post.tags"
            :to="tag.path"
            :key="tag.id"
            class="mr-2 hover:underline"
            >{{ tag.title }}</g-link
          >
        </span>
      </div>
      <div
        v-if="$page.post.description"
        class="border-b border-b-gray-100 my-12"
      >
        <h3 class="text-xl font-normal">TL;DR</h3>
        <p class="pt-2 pb-12">{{ $page.post.description }}</p>
      </div>
      <div v-html="$page.post.content" class="content"></div>
    </header>
  </Layout>
</template>

<page-query>
query Post ($path: String!) {
  post: post (path: $path) {
    id
    title
    date
    description
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
    content
  }
}
</page-query>

<script>
export default {
  metaInfo() {
    return {
      title: this.$page.post.title,
      meta: [
        {
          name: "description",
          content: this.$page.post.description
        }
      ]
    };
  }
};
</script>

<style scoped></style>
