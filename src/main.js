// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCodepen,
  faGithub,
  faTwitter
} from "@fortawesome/free-brands-svg-icons";
import {
  faArchive,
  faBackpack,
  faBoxOpen,
  faBrowser,
  faCalendar,
  faChevronLeft,
  faChevronRight,
  faClipboardListCheck,
  faCode,
  faComments,
  faExternalLinkAlt,
  faHammer,
  faHashtag,
  faHome,
  faNewspaper,
  faPaperPlane,
  faPlane,
  faPodcast,
  faTimes,
  faTrash,
  faTruck,
  faTruckCouch,
  faTruckLoading
} from "@fortawesome/pro-duotone-svg-icons";
import {
  faArrowLeft,
  faArrowUp,
  faCheckCircle
} from "@fortawesome/pro-light-svg-icons";
import { faBars } from "@fortawesome/pro-regular-svg-icons";
import {
  FontAwesomeIcon,
  FontAwesomeLayers
} from "@fortawesome/vue-fontawesome";
import format from "date-fns/format";
import VueObserveVisibility from "vue-observe-visibility";
import DefaultLayout from "~/layouts/Default.vue";
import "./assets/prism-tomorrow.css";

library.add(
  faArchive,
  faArrowLeft,
  faArrowUp,
  faBackpack,
  faBars,
  faBoxOpen,
  faBrowser,
  faCalendar,
  faCheckCircle,
  faChevronLeft,
  faChevronRight,
  faClipboardListCheck,
  faCode,
  faCodepen,
  faComments,
  faExternalLinkAlt,
  faGithub,
  faHammer,
  faHashtag,
  faHome,
  faNewspaper,
  faPaperPlane,
  faPlane,
  faPodcast,
  faTimes,
  faTrash,
  faTruck,
  faTruckCouch,
  faTruckLoading,
  faTwitter
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

  head.link.push({
    href: "https://fonts.googleapis.com/css?family=Fira+Code&display=swap",
    rel: "stylesheet"
  });

  head.link.push({
    href: "https://rsms.me/inter/inter.css",
    rel: "stylesheet"
  });

  head.meta.push({
    name: "description",
    content:
      "The personal website and blog of Sam Warnick. Just talking about things and stuff."
  });

  head.meta.push({
    name: "og:url",
    content: "https://samwarnick.com"
  });

  head.meta.push({
    name: "og:site_name",
    content: "Sam Warnick"
  });

  head.meta.push({
    name: "og:image",
    content: "https://samwarnick.com/images/social.jpg"
  });

  head.meta.push({
    name: "twitter:image:alt",
    content:
      "Sam Warnick standing in the outdoors to show he's not a complete nerd."
  });

  head.meta.push({
    name: "twitter:card",
    content: "summary"
  });

  head.meta.push({
    name: "twitter:site",
    content: "@samwarnick"
  });

  head.meta.push({
    name: "twitter:creator",
    content: "@samwarnick"
  });
}
