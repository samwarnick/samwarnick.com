<template>
  <li>
    <header class="mb-4">
      <h3 class="text-2xl font-serif font-bold">
        <g-link :to="post.path" class="gradient-underline">{{ post.title }}</g-link>
      </h3>
      <div class="text-gray-500">
      <span class="mr-4">
        <i class="fad fa-calendar mr-2 text-gray-600"></i
        ><time :datetime="post.date">{{ post.date | formatDate }}</time>
      </span>
        <span class="mr-2">
        <i class="fad fa-archive mr-2 text-gray-600"></i
        ><g-link
                v-for="category in post.categories"
                :to="category.path"
                :key="category.id"
                class="mr-2 hover:underline"
        >{{ category.title }}</g-link
        >
      </span>
        <span>
        <i class="fad fa-hashtag mr-2 text-gray-600"></i
        ><g-link
                v-for="tag in post.tags"
                :to="tag.path"
                :key="tag.id"
                class="mr-2 hover:underline"
        >{{ tag.title }}</g-link
        >
      </span>
      </div>
    </header>
    <p>
      {{post.description}}
    </p>
  </li>
</template>

<script>
export default {
  name: "PostCard",
  props: {
    post: {
      required: true,
      type: Object
    }
  }
};
</script>

<style scoped></style>
