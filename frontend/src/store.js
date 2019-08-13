import Vue from "vue";
import Vuex from "vuex";
import { store as movies } from "./modules/movies";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    movies
  },
  state: {},
  mutations: {},
  actions: {},
  getters: {},
  strict: process.env.NODE_ENV !== "production"
});

// eslint-disable-next-line
if (module.hot) {
  // eslint-disable-next-line
  module.hot.accept(["@/modules/movies/store"], () => {
    store.hotUpdate({
      modules: {
        movies: require("@/modules/movies/store").default
      }
    });
  });
}

export default store;
