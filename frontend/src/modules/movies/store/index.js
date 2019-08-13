import mutations from "./movieMutations";
import actions from "./movieActions";
import state from "./movieState";
import getters from "./movieGetters";

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
