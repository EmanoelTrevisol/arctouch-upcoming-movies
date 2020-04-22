import Vue from "vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faUserSecret,
  faCircleNotch,
  faTimes,
  faArrowLeft,
  faFrown
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faUserSecret);
library.add(faCircleNotch);
library.add(faTimes);
library.add(faArrowLeft);
library.add(faFrown);

Vue.component("font-awesome-icon", FontAwesomeIcon);
