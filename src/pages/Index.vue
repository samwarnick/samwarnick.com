<template>
  <Hero>
    <AboutCard />

    <div class="bg-gray-100 p-6 shadow-lg mb-24">
      <h2 class="text-4xl font-bold text-center mb-12">
        What I Build With
      </h2>
      <LogoCards />
    </div>

    <div class="max-w-3xl mx-auto px-8">
      <h2 class="text-4xl font-bold my-4 text-center mb-12">
        Some Of My Work
      </h2>
      <ul>
        <ProjectCard
          v-for="project in $page.projects.edges"
          :key="project.node.id"
          :project="project.node"
        />
      </ul>
    </div>

    <div class="max-w-3xl mx-auto mt-24 px-8">
      <h2 class="text-4xl font-bold my-4 text-center mb-12">
        Latest Post
      </h2>
      <ul class="mb-12">
        <PostCard :post="$page.latestPost.edges[0].node" />
      </ul>
      <g-link
        to="/posts"
        class="text-base font-bold group"
        style="--fa-primary-color: #0290c9; --fa-secondary-color: #0290c9">
        <span class="group-hover:underline">See More Posts</span><i class="fad fa-chevron-right ml-2"></i>
      </g-link>
    </div>
  </Hero>
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
    latestPost: allPost(limit: 1) {
      edges {
        node {
          title
          date
          description
          path
          tags {
            id
            title
            path
          }
          categories {
            id
            title
            path
          }
        }
      }
    }
  }
</page-query>

<script>
import Hero from "../layouts/Hero";
import LogoCards from "../components/LogoCards";
import ProjectCard from "../components/ProjectCard";
import PostCard from "../components/PostCard";
import AboutCard from "../components/AboutCard";

export default {
  components: {
    Hero,
    AboutCard,
    LogoCards,
    ProjectCard,
    PostCard
  }
};
</script>

<style></style>
