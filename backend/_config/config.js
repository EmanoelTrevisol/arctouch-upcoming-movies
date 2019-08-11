const path = require("path");
const _ = require("lodash");

const rootPath = path.normalize(`${__dirname}/..`);
const env = process.env.NODE_ENV || "development";

/**
 * Default configs applied to all environments. May be overwritten.
 */
const DEFAULT_ENV_CONFIG = {
  root: rootPath,
  db: "mongodb://localhost:27017/upcoming-movies",
  port: process.env.PORT || 8888,
  tmdb: {
    key: "1f54bd990f1cdfb230adb312546d765d",
    upcomingMoviesApiPath: "https://api.themoviedb.org/3/movie/upcoming",
    genresApiPath: "https://api.themoviedb.org/3/genre/movie/list"
  }
};

/**
 * Current environment config.
 */
const config = _.merge(
  {},
  DEFAULT_ENV_CONFIG,
  {
    // DEVELOPMENT - App development
    development: {},

    homolog: {
      port: process.env.PORT || 8000
    },

    // PRODUCTION - Public access
    production: {
      port: 8080
    }
  }[env]
);

module.exports = config;
