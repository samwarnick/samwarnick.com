<template>
  <footer class="p-12 mt-12 font-serif text-sm text-gray-800 flex flex-col items-center">
<!--    <nav>-->
<!--      <ul class="list-reset flex flex-col sm:flex-row">-->
<!--        <li class="flex mb-2">-->
<!--          <RouterLink to="/resume/" class="text-grey-darker hover:text-grey-darkest">Résumé</RouterLink>-->
<!--          <span class="mx-2 hidden sm:inline-block">•</span>-->
<!--        </li>-->
<!--        <li class="flex mb-2">-->
<!--          <RouterLink to="/contact/" class="text-grey-darker hover:text-grey-darkest">Contact</RouterLink>-->
<!--          <span class="mx-2 hidden sm:inline-block">•</span>-->
<!--        </li>-->
<!--        <li class="flex mb-2">-->
<!--          <RouterLink to="/gear/" class="text-grey-darker hover:text-grey-darkest">Gear</RouterLink>-->
<!--          <span class="mx-2 hidden sm:inline-block">•</span>-->
<!--        </li>-->
<!--        <li class="flex mb-2">-->
<!--          <RouterLink to="/category/" class="text-grey-darker hover:text-grey-darkest">Categories</RouterLink>-->
<!--          <span class="mx-2 hidden sm:inline-block">•</span>-->
<!--        </li>-->
<!--        <li class="flex mb-2">-->
<!--          <RouterLink to="/tag/" class="text-grey-darker hover:text-grey-darkest">Tags</RouterLink>-->
<!--        </li>-->
<!--      </ul>-->
<!--    </nav>-->
    <p class="mt-2 text-grey-darker text-center">copyright 2016 – {{currentYear}} sam warnick</p>
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