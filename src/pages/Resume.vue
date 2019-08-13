<template>
  <ContentPage :content="$page.resume.content">
    <AboutCard/>
  </ContentPage>
</template>

<page-query>
  query {
    resume(path: "/resume") {
      id
      content
    }
  }
</page-query>

<script>
import ContentPage from "../layouts/ContentPage";
import AboutCard from "../components/AboutCard";

export default {
  name: "Resume",
  components: {
    AboutCard,
    ContentPage
  }
};
</script>

<style scoped></style>
