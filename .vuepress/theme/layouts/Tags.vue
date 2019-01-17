<template>
  <LayoutWrapper>
    <SubsetHeader :title="`Tags`" :icon="['fal', 'hashtag']"/>
    <ul class="list-reset">
      <li v-for="tag in $tags.list" class="mb-4">
        <RouterLink
          title="Next"
          :to="tag.path"
          class="text-lg font-bold no-underline font-serif text-black"
        >
          <GradientBorder class="hover:underline">
            <span>{{tag.name}}</span>
            <FontAwesomeIcon :icon="['fal', 'chevron-right']" class="ml-2"/>
          </GradientBorder>
        </RouterLink>
      </li>
    </ul>
  </LayoutWrapper>
</template>