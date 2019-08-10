<template>
  <div>
    <header>
      <SiteNavigation />
    </header>
    <transition name="fade" appear>
      <Main>
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
