<template>
  <header
    class="p-8 mb-12 flex flex-col items-center justify-between w-full shadow-md bg-gradient-texture"
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

