<template>
  <Layout>
    <header>
      <h2>{{$page.post.title}}</h2>
      <div v-html="$page.post.content" />
    </header>
  </Layout>
</template>

<page-query>
query Post ($path: String!) {
  post: blogPost (path: $path) {
    title
    date (format: "D MMMM Y")
    content
    tags
  }
}
</page-query>

<script>
export default {};
</script>

<style lang="scss" scoped>
</style>