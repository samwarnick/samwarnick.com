// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import { library, config } from "@fortawesome/fontawesome-svg-core";
import {
    faCodepen,
    faGithub,
    faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import {
    faArchive,
    faCalendarDay,
    faChevronLeft,
    faChevronRight,
    faCode,
    faExternalLinkAlt,
    faHashtag,
    faNewspaper,
    faPaperPlane,
    faPodcast,
    faTimes,
    faTrash,
    faBars,
    faHammer,
    faLaptop,
} from "@fortawesome/free-solid-svg-icons";
import {
    FontAwesomeIcon,
    FontAwesomeLayers,
} from "@fortawesome/vue-fontawesome";
import { formatToTimeZone } from "date-fns-timezone";
import VueObserveVisibility from "vue-observe-visibility";
import DefaultLayout from "~/layouts/Default.vue";
import "./assets/prism-tomorrow.css";
import "@fortawesome/fontawesome-svg-core/styles.css";

config.autoAddCss = false;

library.add(
    faArchive,
    faBars,
    faCalendarDay,
    faChevronLeft,
    faChevronRight,
    faCode,
    faCodepen,
    faExternalLinkAlt,
    faGithub,
    faHammer,
    faHashtag,
    faLaptop,
    faNewspaper,
    faPaperPlane,
    faPodcast,
    faTimes,
    faTrash,
    faTwitter,
);

export default function (Vue, { router, head, isClient }) {
    // Set default layout as a global component
    Vue.component("Layout", DefaultLayout);
    Vue.use(VueObserveVisibility);
    Vue.component("FaIcon", FontAwesomeIcon);
    Vue.component("FaLayers", FontAwesomeLayers);
    Vue.filter("formatDate", (date) => {
        const months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ];
        const d = new Date(date);
        return `${d.getUTCDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
    });
    Vue.filter("commaJoin", (values) => {
        return values.join(", ");
    });

    head.link.push({
        href: "https://fonts.googleapis.com/css?family=Fira+Code&display=swap",
        rel: "stylesheet",
    });

    head.link.push({
        href: "https://rsms.me/inter/inter.css",
        rel: "stylesheet",
    });

    head.meta.push({
        key: "description",
        name: "description",
        content:
            "The personal website and blog of Sam Warnick. Just talking about things and stuff.",
    });

    head.meta.push({
        key: "og:url",
        name: "og:url",
        content: "https://samwarnick.com",
    });

    head.meta.push({
        key: "og:title",
        name: "og:title",
        content: "Sam Warnick",
    });

    head.meta.push({
        key: "og:site_name",
        name: "og:site_name",
        content: "Sam Warnick",
    });

    head.meta.push({
        key: "og:image",
        name: "og:image",
        content: "https://samwarnick.com/images/profile.jpg",
    });

    head.meta.push({
        key: "twitter:image:alt",
        name: "twitter:image:alt",
        content:
            "Sam Warnick standing in the outdoors to show he's not a complete nerd.",
    });

    head.meta.push({
        key: "twitter:card",
        name: "twitter:card",
        content: "summary",
    });

    head.meta.push({
        name: "twitter:site",
        content: "@samwarnick",
    });

    head.meta.push({
        name: "twitter:creator",
        content: "@samwarnick",
    });
}
