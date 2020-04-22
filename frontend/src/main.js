import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueWait from "vue-wait";

import AppSpinner from "./components/AppSpinner";
import EmptyState from "./components/EmptyState";

import "./config/axios";
import "./config/fa";
import "./config/toasted";
import "./config/bootstrapVue";

Vue.component("app-spinner", AppSpinner);
Vue.component("empty-state", EmptyState);

Vue.config.productionTip = false;

Vue.use(VueWait);

import "./assets/styles/main.styl";

new Vue({
  router,
  store,
  wait: new VueWait({ useVuex: true }),
  render: h => h(App)
}).$mount("#app");
