<template>
  <div>
    <header>
      <SiteNavigation />
    </header>
    <slot />
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

export default {
  name: "DefaultLayout",
  components: {
    SiteNavigation
  }
};
</script>

<style src="../main.css"></style>
