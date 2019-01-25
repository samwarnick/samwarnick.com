<template>
  <header
    id="siteHeader"
    class="p-8 pb-12 mb-12 flex flex-col items-center justify-between w-full bg-gradient-texture"
  >
    <RouterLink to="/">
      <Logo class="h-8 fill-current text-white"/>
    </RouterLink>
    <nav class="flex justify-between mt-4">
      <RouterLink to="/" class="nav-link">Home</RouterLink>
      <!-- <RouterLink
        to="/contact/"
        class="text-lg text-white font-serif font-bold no-underline rounded-lg border-2 border-white px-4 py-2 opacity-75 transition hover:opacity-100 mx-4"
      >Contact</RouterLink>
      <RouterLink
        to="/gear/"
        class="text-lg text-white font-serif font-bold no-underline rounded-lg border-2 border-white px-4 py-2 opacity-75 transition hover:opacity-100 mx-4"
      >Gear</RouterLink>-->
    </nav>
  </header>
</template>

<script>
import Logo from "./Logo";

export default {
  components: {
    Logo
  }
};
</script>

<style scoped>
#siteHeader {
  border-bottom-left-radius: 50% 8vmin;
  border-bottom-right-radius: 50% 8vmin;
  box-shadow: inset 0 -4px 8px 0 rgba(0, 0, 0, 0.12),
    inset 0 -2px 4px 0 rgba(0, 0, 0, 0.08);
}
</style>


