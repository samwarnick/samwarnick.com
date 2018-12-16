<template>
  <span>
    <slot/>
    <RouterLink
      v-for="item in items"
      :key="item"
      :to="links[item]"
      class="mr-2 no-underline hover:underline text-grey-dark"
    >{{item}}</RouterLink>
  </span>
</template>

<script>
export default {
  props: ["items", "formatLink"],
  data() {
    return {
      links: {}
    };
  },
  created() {
    this.items.map(item => {
      this.links[item] = this.formatLink(item);
    });
  }
};
</script>