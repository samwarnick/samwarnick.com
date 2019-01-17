<template>
  <div class="min-h-screen flex flex-col items-center">
    <Header/>
    <div class="p-4 flex-grow w-full max-w-lg">
      <slot/>
    </div>
    <div id="siteFooter" class="w-full flex flex-col items-center mt-12">
      <AboutMe class="max-w-lg mx-4"/>
      <Footer/>
    </div>
  </div>
</template>

<script>
import Header from "./Header";
import Footer from "./Footer";

export default {
  name: "LayoutWrapper",
  components: { Header, Footer }
};
</script>

<style>
#siteFooter {
  border-top-left-radius: 50% 10%;
  border-top-right-radius: 50% 10%;
  box-shadow: inset 0 4px 8px 0 rgba(0, 0, 0, 0.12),
    inset 0 2px 4px 0 rgba(0, 0, 0, 0.08);
}
</style>