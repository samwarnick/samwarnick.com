<template>
  <Layout>
    <header>
      <h2>{{$page.post.title}}</h2>
      <div v-html="$page.post.content"></div>
    </header>
  </Layout>
</template>

<page-query>
query Post ($path: String!) {
  post: blogPost (path: $path) {
    title
    date (format: "D MMMM Y")
    content
  }
}
</page-query>

<script>
export default {};
</script>

<style scoped>
</style>