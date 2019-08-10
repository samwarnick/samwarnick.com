<template>
  <Hero>
    <AboutCard />

    <div class="bg-gray-100 p-6 shadow-lg mb-24">
      <h2 class="font-serif text-2xl text-center mb-12 tracking-wide">
        What I Build With
      </h2>
      <LogoCards />
    </div>

    <div class="max-w-3xl mx-auto px-8">
      <h2 class="font-serif text-2xl my-4 text-center mb-12 tracking-wide">
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
      <h2 class="font-serif text-2xl my-4 text-center mb-12 tracking-wide">
        Latest Post
      </h2>
      <ul>
        <PostCard :post="$page.latestPost.edges[0].node" />
      </ul>
      <GradientButton class="mt-12">
        <g-link
          to="/posts"
          class="font-serif font-bold tracking-wide hover:underline"
          style="--fa-primary-color: #0290c9; --fa-secondary-color: #0290c9"
          >See More Posts<i class="fad fa-chevron-right ml-2"></i
        ></g-link>
      </GradientButton>
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
    latestPost: allBlogPost(limit: 1) {
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
import GradientButton from "../components/GradientButton";
import AboutCard from "../components/AboutCard";

export default {
  components: {
    Hero,
    AboutCard,
    LogoCards,
    ProjectCard,
    PostCard,
    GradientButton
  }
};
</script>

<style></style>
