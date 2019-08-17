<template>
  <footer class="p-12 mt-12 text-sm text-gray-600 flex flex-col sm:items-center">
    <nav class="mb-4">
      <ul class="list-reset flex flex-col sm:flex-row">
        <li class="flex mb-2">
          <a href="/feed.xml" class="text-gray-600 hover:text-gray-800 transition">RSS</a>
          <span class="mx-2 hidden sm:inline-block">•</span>
        </li>
        <li class="flex mb-2">
          <a href="/sitemap.xml" class="text-gray-600 hover:text-gray-800 transition">Sitemap</a>
        </li>
      </ul>
    </nav>
    <p class="mt-2 text-grey-darker sm:text-center">copyright 2016 – {{currentYear}} sam warnick</p>
  </footer>
</template>

<script>
    export default {
        name: "SiteFooter",
        data() {
            return {
                currentYear: new Date().getFullYear()
            };
        }
    }
</script>

<style scoped>

</style>