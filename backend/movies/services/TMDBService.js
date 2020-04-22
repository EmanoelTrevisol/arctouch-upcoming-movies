const axios = require("axios");
const qs = require("qs");
const config = require("../../_config/config");

axios.interceptors.response.use(response => response.data);

const { key: api_key, upcomingMoviesApiPath, genresApiPath } = config.tmdb;

/**
 * Receives additional params to the request and merges with the defaults
 * Returns a querystring of the params
 *
 * @param {Object} params   additional params, such as page
 * @return {String} querystring
 */
function getQueryStringParams(params = null) {
  const qsParams = {
    api_key,
    language: "en-US",
    ...params
  };

  return qs.stringify(qsParams);
}

/**
 * Fetches the movies from the TMDB API
 *
 * @param {Number} page   the page number
 * @return {Promise<Object>}
 */
exports.getMoviesPerPage = page => {
  return axios.get(
    `${upcomingMoviesApiPath}?${getQueryStringParams({ page })}`
  );
};

/**
 * Fetches the genres from the TMDB API
 *
 * @return {Promise<Object>}
 */
exports.getGenres = () => {
  return axios.get(`${genresApiPath}?${getQueryStringParams()}`);
};
