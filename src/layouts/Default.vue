<template>
  <div class="min-h-screen flex flex-col items-stretch">
    <header class="fixed w-full z-50">
      <SiteNavigation />
    </header>
    <Breadcrumbs v-if="showBreadcrumbs" class="mt-24 w-full max-w-3xl mx-auto px-8"/>
    <transition name="fade" appear>
      <Main class="flex-grow" :class="[showBreadcrumbs ? 'mt-8' : 'mt-32']">
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
import Breadcrumbs from "../components/Breadcrumbs";

export default {
  name: "DefaultLayout",
    props: {
        showBreadcrumbs: {
            default: false,
            type: Boolean
        }
    },
  components: {
      Breadcrumbs,
      SiteFooter,
    SiteNavigation,
    Main
  }
};
</script>

<style src="../main.css"></style>
