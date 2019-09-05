// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from "~/layouts/Default.vue";
import VueObserveVisibility from "vue-observe-visibility";
import format from "date-fns/format";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faClipboardListCheck,
  faTrash,
  faBoxOpen,
  faTruckCouch,
  faTruckLoading,
  faPlane,
  faHammer,
  faHome,
  faComments
} from "@fortawesome/pro-duotone-svg-icons";
import {
  faCheckCircle,
  faArrowLeft,
  faArrowUp
} from "@fortawesome/pro-light-svg-icons";
import {
  FontAwesomeIcon,
  FontAwesomeLayers
} from "@fortawesome/vue-fontawesome";
import "./assets/prism-tomorrow.css";

library.add(
  faClipboardListCheck,
  faTrash,
  faBoxOpen,
  faTruckCouch,
  faTruckLoading,
  faPlane,
  faHammer,
  faHome,
  faCheckCircle,
  faArrowLeft,
  faComments,
  faArrowUp
);

export default function(Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.component("Layout", DefaultLayout);
  Vue.use(VueObserveVisibility);
  Vue.component("FaIcon", FontAwesomeIcon);
  Vue.component("FaLayers", FontAwesomeLayers);
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
    rel: "stylesheet"
  });

  head.link.push({
    href: "https://rsms.me/inter/inter.css",
    rel: "stylesheet"
  });

  head.meta.push({
    name: "Description",
    content:
      "The personal website and blog of Sam Warnick. Just talking about things and stuff."
  });
}
