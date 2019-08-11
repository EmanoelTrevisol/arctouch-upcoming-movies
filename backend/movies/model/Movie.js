const moment = require("moment");
const { statuses: MovieStatuses } = require("./MovieStatics");

module.exports = class Movie {
  constructor(movieInfo, genres) {
    this._id = movieInfo.id;
    this.voteCount = movieInfo.vote_count;
    this.video = movieInfo.video;
    this.voteAverage = movieInfo.vote_average;
    this.title = movieInfo.title;
    this.popularity = movieInfo.popularity;
    this.posterPath = `https://image.tmdb.org/t/p/w780${movieInfo.poster_path}`;
    this.originalLanguage = movieInfo.original_language;
    this.originalTitle = movieInfo.original_title;
    this.genreIds = [...movieInfo.genre_ids];
    this.genres = movieInfo.genre_ids.map(id => genres.get(id));
    this.backdropPath = `https://image.tmdb.org/t/p/w780${
      movieInfo.backdrop_path
    }`;
    this.adult = movieInfo.adult;
    this.overview = movieInfo.overview;
    this.releaseDate = moment(movieInfo.release_date).format();
    this.updatedAt = moment().format();
    this.status = MovieStatuses.ACTIVE;
  }

  /**
   * Returns an object with the movie info
   *
   * @return {Object}
   */
  getObject() {
    return {
      _id: this._id,
      voteCount: this.voteCount,
      video: this.video,
      voteAverage: this.voteAverage,
      title: this.title,
      popularity: this.popularity,
      posterPath: this.posterPath,
      originalLanguage: this.originalLanguage,
      originalTitle: this.originalTitle,
      genreIds: this.genreIds,
      genres: this.genres,
      backdropPath: this.backdropPath,
      adult: this.adult,
      overview: this.overview,
      releaseDate: this.releaseDate,
      status: this.status,
      updatedAt: this.updatedAt
    };
  }
};
