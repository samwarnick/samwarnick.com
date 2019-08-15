<template>
  <nav>
    <ul class="flex">
      <li v-for="(crumb, index) in crumbs" :key="crumb.to" class="text-gray-500" :class="{'truncate': index === crumbs.length - 1}">
        <g-link class="hover:underline hover:text-gray-600" v-if="index < crumbs.length - 1" :to="crumb.to">{{crumb.text}}</g-link>
        <span class="mx-3" v-if="index < crumbs.length - 1">/</span>
        <span v-if="index === crumbs.length - 1" class="text-gray-600">{{crumb.text}}</span>
      </li>
    </ul>
  </nav>
</template>

<script>
    export default {
        name: "Breadcrumbs",
        computed: {
            crumbs() {
                let pathArray = this.$route.path.split("/")
                pathArray.shift()
                return pathArray.reduce((breadcrumbArray, path, idx) => {
                    breadcrumbArray.push({
                        path: path,
                        to: breadcrumbArray[idx - 1]
                            ? "/" + breadcrumbArray[idx - 1].path + "/" + path
                            : "/" + path,
                        text: path,
                    });
                    return breadcrumbArray;
                }, [])
            }
        }
    }
</script>

<style scoped>
</style>