<template>
  <div class="container movies-list">
    <div class="search">
      <b-form-input
        :value="search"
        class="search-input"
        placeholder="Search for an upcoming movie"
        @input="setSearch"
      ></b-form-input>
    </div>
    <app-spinner v-if="$wait.is('loading-movies-list')" />

    <div class="row list" v-else-if="movies.length">
      <router-link
        tag="div"
        class="cards col-xs-12 col-sm-12 col-md-6 col-lg-4"
        v-for="movie in movies"
        :key="movie._id"
        :to="{name: 'movie-detail', params: {movieId: movie._id}}"
      >
        <movie-card class="movie-card" :movie="movie"></movie-card>
      </router-link>
    </div>
    <empty-state
      v-else
      title="Aww..."
      sub-title="Sorry, we couldn't find what you were looking for"
    />
    <b-pagination
      v-if="!$wait.is('loading-movies-list') && movies.length"
      :value="page"
      :total-rows="total"
      :per-page="15"
      align="center"
      class="custom-pagination"
      @change="(value) => setFilter({key: 'page', value})"
    >
      <span class="pagination-item" slot="page" slot-scope="{ page, active }">
        <b v-if="active">{{ page }}</b>
        <i v-else>{{ page }}</i>
      </span>
    </b-pagination>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { debounce } from 'lodash'

import MovieCard from '../components/MovieCard';

export default {
  components: {
    MovieCard,
  },
  computed: {
    ...mapState('movies', {
      total: state => state.list.total
    }),
    ...mapState('movies', {
      search: state => state.list.filter.search,
      page: state => state.list.filter.page,
    }),
    movies() {
      return this.$store.getters['movies/list'];
    }
  },
  created() {
    const qs = this.$route.query;
    if (qs.search) {
      this.$store.dispatch("movies/setFilter", {
        key: "search",
        value: qs.search
      });
    }

    if (qs.page) {
      this.$store.dispatch("movies/setFilter", {
        key: "page",
        value: qs.page
      });
    }

    this.$store.dispatch('movies/getList');
  },
  destroyed() {
    this.$store.dispatch('movies/resetFilter');
  },
  methods: {
    setSearch: debounce(function(search) {
      this.setFilter({key: 'page', value: 1});
      this.setFilter({key: 'search', value: search});
    }, 500),
    setFilter({ key, value }) {
      this.$store.dispatch("movies/setFilter", { key, value });
      this.refreshFilters();
    },
    refreshFilters() {
      this.$store.dispatch("movies/getList");
      this.$router.replace({
        name: 'movies-list',
        params: this.$route.params,
        query: {
          ...this.$route.query,
          page: this.page,
          search: this.search
        }
      });
    }
  }
}
</script>

<style lang="stylus" scoped>
.movies-list {
  .search {
    margin-bottom: 30px;

    .search-input {
      height: 40px;
      border: 1px solid $brand-primary;
      border-radius: 20px;
      color: $brand-primary;
      padding-left: 20px;

      &::placeholder {
        color: lighten($brand-secondary, 40%);
      }
    }
  }

  .list {
    .cards {
      animation: fade-in 400ms;
      margin-bottom: 15px;
      align-self: stretch;

      .movie-card {
        cursor: pointer;
        margin-bottom: 15px;
      }
    }
  }
}

>>> .page-item {
  &.active {
    .page-link {
      border-color: $brand-primary;
      color: $white;
      background-color: $brand-primary;
    }
  }

  &.disabled {
    .page-link {
      color: #6c757d;
      background-color: $white;
    }
  }

  .page-link {
    &:hover {
      background-color: $light;
    }

    color: $brand-primary;
    background-color: $white;
  }
}
</style>
