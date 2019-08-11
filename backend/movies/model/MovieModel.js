const mongoose = require("mongoose");
const { statuses } = require("./MovieStatics");

const MovieSchema = new mongoose.Schema(
  {
    _id: Number,
    voteCount: Number,
    video: Boolean,
    voteAverage: Number,
    title: String,
    popularity: Number,
    posterPath: String,
    originalLanguage: String,
    originalTitle: String,
    genreIds: [Number],
    genres: [String],
    backdropPath: String,
    adult: Boolean,
    overview: String,
    releaseDate: Date,
    status: {
      type: String,
      enum: Object.values(statuses),
      default: statuses.ACTIVE
    }
  },
  {
    _id: false,
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
  }
);

const MovieModel = mongoose.model("Movie", MovieSchema);

module.exports = MovieModel;
