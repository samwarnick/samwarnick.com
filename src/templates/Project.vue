<template>
  <Layout :show-breadcrumbs="true">
    <article>
      <header>
        <h2 class="text-4xl md:text-5xl font-extrabold leading-none mb-4">
          {{ $page.project.name }}
        </h2>
        <div class="flex flex-col sm:flex-row items-start sm:items-center pb-8 mb-8 border-b">
          <div class="flex items-center text-gray-600 mr-4">
            <i class="fad fa-code mr-2"></i>
            <span>Built with {{ $page.project.technologies | commaJoin }}</span>
          </div>
          <span class="bg-blue-200 text-blue-800 px-2 rounded-lg mt-2 sm:mt-0">{{$page.project.type}}</span>
        </div>
        <div class="flex flex-col items-center md:flex-row ">
          <g-image
                  :alt="`Screenshot of ${$page.project.name}`"
                  v-if="$page.project.image"
                  :src="$page.project.image"
                  class="shadow rounded"
          />
          <p class="m-4 text-lg">{{$page.project.description}}</p>
        </div>
        <div class="pb-8 my-8 border-b text-gray-700" style="--fa-primary-color: #0290c9; --fa-secondary-color: #0290c9">
          <a :href="$page.project.link" target="_blank" rel="noopener" class="gradient-underline text-xl">See it in action<i class="fad fa-external-link-alt fa-xs ml-2"></i></a>
        </div>
      </header>
      <div v-html="$page.project.content" class="content"></div>
    </article>
  </Layout>
</template>

<page-query>
  query Project ($path: String!) {
    project (path: $path) {
      id
      name
      type
      description
      technologies
      image (height: 200 width: 300 quality: 100 fit: outside)
      content
      link
    }
  }
</page-query>

<script>
    export default {};
</script>

<style lang="scss" scoped>
</style>