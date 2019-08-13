import Vue from "vue";
import Router from "vue-router";
import List from "./modules/movies/views/List";
import { routes as movieRoutes } from "./modules/movies";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: List
    },
    ...movieRoutes
  ]
});
