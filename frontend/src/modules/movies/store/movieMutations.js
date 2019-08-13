import Vue from "vue";

export default {
  setListData(state, { items, total }) {
    Vue.set(state.list, "items", items);
    Vue.set(state.list, "total", total);
  },

  setDetailData(state, movie) {
    Vue.set(state, "detail", movie);
  },

  setFilter(state, { key, value }) {
    Vue.set(state.list.filter, key, value);
  },

  resetFilter(state) {
    state.list.filter = {
      page: 1,
      search: ""
    };
  },

  resetDetail(state) {
    state.detail = {};
  }
};
