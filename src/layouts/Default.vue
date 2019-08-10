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

export default {
  name: "DefaultLayout",
  components: {
    SiteNavigation,
    Main
  }
};
</script>

<style src="../main.css"></style>
