<template>
  <b-card
    overlay
    :img-src="movie.posterPath"
    :img-alt="`Poster ${movie.title}`"
    img-height="auto"
    img-width="auto"
  >
    <div slot="footer">
      <h5 class="movie-title">{{movie.title}}</h5>
      <p class="movie-release-date">{{movie.releaseDate}}</p>
    </div>
  </b-card>
</template>

<script>
import GenresBadges from './GenresBadges';

export default {
	components: {
		GenresBadges,
	},
	props: {
		movie: {
			type: Object,
			default: () => ({}),
		}
	}
}
</script>

<style lang="stylus" scoped>
.card {
  border-width: 1px;
  border-color: $brand-primary;
  margin-bottom: 20px;

  .card-body {
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    flex-wrap: wrap;

    .card-text {
      font-size: 1.05em;
    }

    .genres {
      align-self: center;
    }
  }

  .card-footer {
    text-align: center;

    .movie-title {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      color: $brand-primary;
      margin-bottom: 8px;
    }

    .movie-release-date {
      color: $brand-secondary;
      margin-bottom: 5px;
    }
  }
}
</style>
