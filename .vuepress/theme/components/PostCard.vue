<template>
  <div
    class="mb-8 rounded-lg overflow-hidden bg-white card flex p-1"
    :class="{shadow: !subtle, 'bg-gradient': !subtle, 'bg-gradient-alt': post.frontmatter.extraSpecial}"
  >
    <div class="flex-grow bg-white rounded-md" :class="{'shadow-inner': !subtle}">
      <header class="flex items-stretch p-2">
        <div class="flex flex-col flex-grow">
          <h2>
            <slot name="postTypeIcon"/>
            <PostCardLink
              :path="post.frontmatter.link || post.path"
              :external="!!post.frontmatter.link"
              class="no-underline text-blue-darker self-start px-1"
            >{{post.title}}</PostCardLink>
          </h2>
          <PostMetadata :frontmatter="post.frontmatter"/>
        </div>
        <div class="sm:hidden h-16">
          <slot/>
        </div>
      </header>
      <p class="py-4 px-2">{{post.frontmatter.description || post.excerpt}}</p>
    </div>
    <div class="hidden sm:block h-32">
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  props: ["post", "subtle"]
};
</script>

<style scoped>
.card {
  transition: box-shadow 0.2s ease;
}
</style>