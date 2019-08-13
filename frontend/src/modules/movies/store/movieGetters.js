import moment from "moment";

function sanitizeMovie(movie) {
  return {
    ...movie,
    releaseDate: moment(movie.releaseDate).format("L")
  };
}

export default {
  list(state) {
    return state.list.items.map(sanitizeMovie);
  },

  detail(state) {
    return sanitizeMovie(state.detail);
  }
};
