import Vue from "vue";
import movieApi from "../api";

export default {
  async getList({ dispatch, commit, state }) {
    try {
      dispatch("wait/start", "loading-movies-list", { root: true });

      const result = await movieApi.getList({ ...state.list.filter });

      commit({
        type: "setListData",
        ...result
      });
    } catch (err) {
      Vue.toasted.error(err.message);
      throw err;
    } finally {
      dispatch("wait/end", "loading-movies-list", { root: true });
    }
  },

  async getDetail({ dispatch, commit, state }, movieId) {
    try {
      dispatch("wait/start", "loading-movie-detail", { root: true });

      const movie = state.list.items.find(movie => movie.id === movieId);

      if (movie) {
        commit("setDetailData", movie);
      } else {
        const movie = await movieApi.getDetail(movieId);
        commit("setDetailData", movie);
      }
    } catch (err) {
      Vue.toasted.error(err.message);
      throw err;
    } finally {
      dispatch("wait/end", "loading-movie-detail", { root: true });
    }
  },

  setFilter({ commit }, filter) {
    commit("setFilter", filter);
  },

  resetFilter({ commit }) {
    commit("resetFilter");
  },

  resetDetail({ commit }) {
    commit("resetDetail");
  }
};
