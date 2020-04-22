<template>
  <div class="container-fluid movie-detail">
    <b-button variant="default" class="back-button" @click="$router.go(-1)">
      <font-awesome-icon icon="arrow-left" size="2x"></font-awesome-icon>
    </b-button>
    <app-spinner v-if="$wait.is('loading-movie-detail')"></app-spinner>
    <b-card v-else-if="movie.id" no-body class="overflow-hidden movie-card">
      <b-row no-gutters>
        <b-col md="3">
          <b-card-img :src="movie.posterPath" height="auto" width="auto" class="rounded-0"></b-card-img>
        </b-col>
        <b-col md="9">
          <b-card-body :title="movie.title" :sub-title="movie.releaseDate">
            <b-card-text>{{movie.overview}}</b-card-text>
            <div class="genres">
              <genres-badges :items="movie.genres"></genres-badges>
            </div>
          </b-card-body>
        </b-col>
      </b-row>
    </b-card>
    <empty-state
      v-else
      title="Ops..."
      sub-title="We seem to run into a problem. Please try again later"
      :action="() => this.$router.go()"
      actionText="I want to try again now!"
    ></empty-state>
  </div>
</template>

<script>
import GenresBadges from '../components/GenresBadges';

export default {
	components: {
		GenresBadges
	},
	props: {
		movieId: {
			type: [Number, String],
			required: true,
		},
	},
	computed: {
		movie() {
			return this.$store.getters['movies/detail'];
		}
	},
	created() {
		this.$store.dispatch('movies/getDetail', this.movieId);
  },
  destroyed() {
    this.$store.dispatch('movies/resetDetail');
  }
}
</script>

<style lang="stylus" scoped>
.movie-detail {
  .back-button {
    margin-bottom: 10px;
  }

  .movie-card {
    animation: fade-in 400ms;
  }

  .card {
    border-width: 1px;
    border-color: $brand-primary;

    .card-title {
      font-size: 1.75rem;
    }

    .card-subtitle {
    }

    .card-body {
      height: 100%;
      background-color: #ffb46e;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;

      .card-text {
        font-size: 1.05rem;
      }

      .genres {
        align-self: center;
      }
    }
  }
}
</style>

