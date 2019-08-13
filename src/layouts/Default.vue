<template>
  <div class="min-h-screen flex flex-col">
    <header class="fixed w-full z-50">
      <SiteNavigation />
    </header>
    <transition name="fade" appear>
      <Main class="flex-grow mt-32">
        <slot />
      </Main>
    </transition>
    <SiteFooter/>
  </div>
</template>

<static-query>
query {
  metaData {
    siteName
  }
}
</static-query>

<script>
import SiteNavigation from "../components/SiteNavigation";
import Main from "./Main";
import SiteFooter from "../components/SiteFooter";

export default {
  name: "DefaultLayout",
  components: {
      SiteFooter,
    SiteNavigation,
    Main
  }
};
</script>

<style src="../main.css"></style>
