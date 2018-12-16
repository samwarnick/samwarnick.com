<template>
  <LayoutWrapper>
    <header class="pb-8 mb-8 border-b">
      <h1>{{$page.title}}</h1>
      <PostMetadata :frontmatter="$page.frontmatter"/>
      <a
        v-if="$page.frontmatter.originalLink"
        :href="$page.frontmatter.originalLink"
        target="_blank"
        rel="noopener"
        class="text-lg font-bold no-underline hover:underline font-serif text-black"
      >
        <GradientBorder>Original Link
          <FontAwesomeIcon :icon="['fal', 'chevron-right']" class="ml-2"/>
        </GradientBorder>
      </a>
    </header>
    <div v-if="$page.frontmatter.description" class="pb-8 mb-8 border-b">
      <h2 class="mb-4">TL;DR</h2>
      <p>{{$page.frontmatter.description}}</p>
    </div>
    <Content/>
  </LayoutWrapper>
</template>
