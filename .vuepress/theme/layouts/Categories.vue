<template>
  <LayoutWrapper>
    <header class="mb-8 pb-8 border-b">
      <h1>
        <FontAwesomeIcon :icon="['fal', 'archive']" class="mr-2"/>
        <span>Categories</span>
      </h1>
    </header>
    <ul class="list-reset flex flex-col">
      <li v-for="category in $categories.list" class="mb-4">
        <RouterLink
          title="Next"
          :to="category.path"
          class="text-lg font-bold no-underline font-serif text-black"
        >
          <GradientBorder class="hover:underline">
            <span>{{category.name}}</span>
            <FontAwesomeIcon :icon="['fal', 'chevron-right']" class="ml-2"/>
          </GradientBorder>
        </RouterLink>
      </li>
    </ul>
  </LayoutWrapper>
</template>