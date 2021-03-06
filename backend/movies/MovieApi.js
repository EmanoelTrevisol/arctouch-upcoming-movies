// libs
const express = require("express");

const movieRouter = express.Router({ mergeParams: true });

// internal
const MovieManager = require("./MovieManager");

module.exports = app => {
  app.use("/movies", movieRouter);
};

movieRouter.get(
  "/",

  async (req, res, next) => {
    try {
      const movies = await MovieManager.list({ ...req.query });

      return res.json(movies);
    } catch (err) {
      next(err);
    }
  }
);

movieRouter.get(
  "/:movieId",

  async (req, res, next) => {
    try {
      const movie = await MovieManager.getById(req.params.movieId);

      return res.json(movie);
    } catch (err) {
      next(err);
    }
  }
);
