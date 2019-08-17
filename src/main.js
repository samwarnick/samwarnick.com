// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from "~/layouts/Default.vue";
import VueObserveVisibility from "vue-observe-visibility";
import format from "date-fns/format";
import "./assets/prism-tomorrow.css";

export default function(Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.component("Layout", DefaultLayout);
  Vue.use(VueObserveVisibility);
  Vue.filter("formatDate", date => {
    return format(date.substr(0, 10), "D MMM YYYY");
  });
  Vue.filter("commaJoin", values => {
    return values.join(", ");
  });

  head.script.push({
    src: "https://kit.fontawesome.com/c748538aff.js"
  });

  head.link.push({
    href: "https://fonts.googleapis.com/css?family=Fira+Code&display=swap",
    rel: "preload",
    as: "font"
  });

  head.link.push({
    href: "https://rsms.me/inter/inter.css",
    rel: "preload",
    as: "font"
  });
}
