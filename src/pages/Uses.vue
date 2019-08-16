<template>
  <ContentPage :content="$page.uses.content" />
</template>

<page-query>
query {
    uses(path: "/uses") {
        id
        content
    }
}
</page-query>

<script>
import ContentPage from "../layouts/ContentPage";

export default {
  name: "Uses",
  metaInfo: {
    title: "Gear"
  },
  components: {
    ContentPage
  }
};
</script>

<style scoped></style>
