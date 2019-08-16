<template>
  <ContentPage :content="$page.resume.content">
    <AboutCard :show-resume-link="false" />
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
  metaInfo: {
    title: "Résumé"
  },
  components: {
    AboutCard,
    ContentPage
  }
};
</script>

<style scoped></style>
