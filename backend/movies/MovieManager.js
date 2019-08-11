const Boom = require("boom");
const MovieModel = require("./model/MovieModel");

function sanitizeMovie(movie) {
  return movie.toObject();
}

/**
 * Lists the movies in our DB
 *
 * @param {Object} arg
 * @param {Number} arg.page 		the page number
 * @param {Number} arg.limit 		the number of items per page
 * @param {String} arg.search 	the user input search string
 */
exports.list = async ({ page = 1, limit = 15, search = "" }) => {
  const query = {};
  const offset = limit > 50 ? 50 : limit;

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { originalTitle: { $regex: search, $options: "i" } }
    ];
  }

  const [total, items] = await Promise.all([
    MovieModel.countDocuments(query),
    MovieModel.find(query)
      .sort({ popularity: -1 })
      .skip((parseInt(page, 10) - 1) * parseInt(offset, 10))
      .limit(offset)
  ]);

  return {
    items: items.map(sanitizeMovie),
    total
  };
};

/**
 * Gets a movie by id
 *
 * @param {Number} movieId	the movieId
 * @return {Object} the objectified mongodb movie
 */
exports.getById = async movieId => {
  const movie = await MovieModel.findById(movieId);

  if (!movie) throw Boom.badData("MOVIE_NOT_FOUND");

  return sanitizeMovie(movie);
};
