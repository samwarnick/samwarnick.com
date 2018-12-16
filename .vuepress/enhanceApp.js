import { library } from "@fortawesome/fontawesome-svg-core";
// import "@fortawesome/fontawesome-svg-core/styles.css";
import {
  faLink,
  faPodcast,
  faChevronLeft,
  faChevronRight,
  faHashtag,
  faArchive,
  faCircle
} from "@fortawesome/pro-light-svg-icons";
import {
  faTwitter,
  faCodepen,
  faGithub
} from "@fortawesome/free-brands-svg-icons";
import { Tweet } from "vue-tweet-embed";
import VueRecaptcha from "vue-recaptcha";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { format } from "date-fns";

library.add(
  faLink,
  faPodcast,
  faChevronLeft,
  faChevronRight,
  faTwitter,
  faCodepen,
  faGithub,
  faHashtag,
  faArchive,
  faCircle
);

export default ({
  Vue, // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData // site metadata
}) => {
  Vue.component("FontAwesomeIcon", FontAwesomeIcon);
  Vue.component("Tweet", Tweet);
  Vue.component("VueRecaptcha", VueRecaptcha);
  Vue.filter("formatDate", date => {
    return format(date.substr(0, 10), "D MMM YYYY");
  });
};
