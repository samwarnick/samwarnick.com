<template>
  <Layout>
    <h2 class="text-4xl font-bold mb-12">
      Some Of My Work
    </h2>
    <ul>
      <ProjectCard
        v-for="project in $page.projects.edges"
        :key="project.node.id"
        :project="project.node"
      />
    </ul>
  </Layout>
</template>

<page-query>
  query {
    projects: allProject(sortBy: "name", order: ASC) {
      edges {
        node {
          id
          name
          description
          technologies
          link
          path
          image (height: 200 width: 300 quality: 100 fit: outside)
        }
      }
    }
  }
</page-query>
<script>
import ProjectCard from "../components/ProjectCard";

export default {
  name: "Projects",
  components: {
    ProjectCard
  }
};
</script>

<style scoped></style>
