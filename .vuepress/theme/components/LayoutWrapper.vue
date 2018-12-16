<template>
  <div class="min-h-screen flex flex-col items-center">
    <Header/>
    <div class="p-4 flex-grow w-full max-w-lg">
      <slot/>
    </div>
    <AboutMe class="max-w-lg mx-4"/>
    <Footer/>
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