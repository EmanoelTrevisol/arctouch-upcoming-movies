import axios from "axios";
import qs from "qs";

import config from "@/config";
const { apiUrl } = config;

export default {
  getList({ page, limit, search }) {
    return axios.get(
      `${apiUrl}movies?${qs.stringify({ page, limit, search })}`
    );
  },

  getDetail(movieId) {
    return axios.get(`${apiUrl}movies/${movieId}`);
  }
};
