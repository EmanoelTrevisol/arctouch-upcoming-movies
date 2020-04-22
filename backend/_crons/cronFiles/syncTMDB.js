const TMDBService = require("../../movies/services/TMDBService");
const CronLogManager = require("../CronLogManager");
const Movie = require("../../movies/model/Movie");
const MovieModel = require("../../movies/model/MovieModel");
const { statuses: MovieStatuses } = require("../../movies/model/MovieStatics");

/**
 * Gets upcoming movies by page number
 *
 * @param {Number} page the current page
 */
const getByPage = async page => {
  return TMDBService.getMoviesPerPage(page);
};

/**
 * Gets the genres from TMDB api and returns a map containing id -> name
 *
 * @return {Map} genres map
 */
const getGenresMap = async () => {
  const { genres } = await TMDBService.getGenres();

  const genresMap = new Map();

  genres.forEach(({ id, name }) => {
    genresMap.set(id, name);
  });

  return genresMap;
};

/**
 * Receives the results from the API and returns Movie instances
 *
 * @param {Array<Object>} movies 	the movies returned from the API
 * @param {Map} genres 						the genres map genreId => name
 * @return {Array<Movie>}
 */
const getUpcomingMoviesArray = (movies, genres) => {
  return movies.map(movie => new Movie(movie, genres));
};

/**
 * Gets all upcoming movies from tmdb API
 *
 * @param {Map} genres 			the genres map id => name
 * @return {Array<Movie>} 	all upcoming movies
 */
const getAllUpcomingMovies = async genres => {
  const { results, total_pages } = await getByPage(1);

  const upcomingMovies = [...getUpcomingMoviesArray(results, genres)];

  for (let currentPage = 2; currentPage <= total_pages; currentPage++) {
    const { results } = await getByPage(currentPage);

    upcomingMovies.push(...getUpcomingMoviesArray(results, genres));
  }

  return upcomingMovies;
};

/**
 * Receives movie and update type info and returns a bulk operation object
 *
 * @param {Movie} movie 				the movie to be upserted or changed its status to DELETED
 * @param {String} updateType 	the update type: 'upsert' will update all movie info. 'delete' will set movie status to DELETED
 * @return {Object} 						bulk operation object
 */
const setBulkOp = (movie, updateType = "upsert") => {
  return {
    updateOne: {
      filter: { _id: movie._id },
      update: {
        $set:
          updateType === "upsert"
            ? movie.getObject()
            : { status: MovieStatuses.DELETED }
      },
      upsert: true
    }
  };
};

/**
 * Synchronizes the database with TMDB. Gets all upcoming movies from the API
 * and removes the ones not returned by the API by changing its status to DELETED
 */
const syncUpcomingMovies = async () => {
  const upsertedMoviesIds = [];
  const bulkOps = [];
  const removedIds = [];

  const cronLogId = await CronLogManager.start({ cronName: "syncTMDB" });

  const genres = await getGenresMap();

  const [upcomingMovies, movies] = await Promise.all([
    getAllUpcomingMovies(genres),
    MovieModel.find({})
  ]);

  // Creates a bulk op for each movie
  // If the movie does not exist in the DB, it will be created
  // If it already exists, it will be updated
  upcomingMovies.forEach(upcomingMovie => {
    upsertedMoviesIds.push(upcomingMovie._id);
    bulkOps.push(setBulkOp(upcomingMovie, "upsert"));
  });

  // Althought I did not find any information related to removing data from the API
  // I assume since it is 'upcoming movies' that the API will not get movie info if it is not upcoming
  // So, I check movie by movie registered in our DB and if it did not come in the API,
  // it won't be shown to the user
  movies.forEach(movie => {
    if (!upsertedMoviesIds.includes(movie._id)) {
      removedIds.push(movie._id);
      bulkOps.push(setBulkOp(movie, "delete"));
    }
  });

  const bulkResult = await MovieModel.collection.bulkWrite(bulkOps);

  await CronLogManager.end({
    cronLogId,
    result: {
      bulkResult,
      upsertedMoviesIds,
      removedIds
    }
  });
};

// This cronjob runs every hour. It syncs with themoviedb.
module.exports = [
  "syncTMDB",
  {
    cronTime: "0 0 * * * *",
    timeZone: "America/Sao_Paulo",
    runOnInit: true,
    onTick: syncUpcomingMovies
  }
];
