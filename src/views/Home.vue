<template>
  <div class="container">
    <div class="title">
      <h1>Search Results</h1>
    </div>
    <div class="categories">
      <div
        class="categories__item"
        v-for="c in categories"
        :key="c"
      >
        {{ c }}
      </div>
      <div>
        <img
          key="expand"
          src="@/assets/view_module-24px.svg"
          alt="view-module"
        >
        <img
          key="expand"
          src="@/assets/view_list-24px.svg"
          alt="module"
        >
      </div>
    </div>
    <div>
      <label for="movie-search">Search</label>
      <input
        v-model="movieComputed"
        type="search"
        name="movie-search"
        placeholder="Movies..."
        id="movie-search"
      >
    </div>
    <div
      v-if="movies.length && filterMovies.length"
      key="filterMovies"
      class="container--flex"
    >
      <entertainment-card
        v-for="movie in filterMovies"
        :key="movie.id"
        :data="movie"
      >
        <template v-slot:media-type>
          <div class="media-type">Movies</div>
        </template>
      </entertainment-card>
    </div>
    <div
      class="container"
      v-else-if="loaded && !filterMovies.length"
      key="noResults"
    >
      <h1>Try refining your search...</h1>
    </div>
  </div>
</template>
<script async src="https://cdn.jsdelivr.net/npm/lodash@4.17.10/lodash.min.js"></script>
<script>
import EntertainmentCard from '@/components/EntertainmentCard'
import { mapActions, mapState } from 'vuex'
import _ from 'lodash'
export default {
  name: 'Home',
  components: {
    EntertainmentCard
  },
  data () {
    return {
      loaded: false,
      breedInfo: '',
      dbBreedInfo: '',
      categories: ['All', 'Movies', 'TV Shows', 'Games and Apps', 'Blog',  'Other'],
    }
  },
  computed: {
    ...mapState(['movies', 'page']),
    filterMovies () {
      if (this.movies.length) {
        return this.movies
      }
    },
    movieComputed: {
      get() {
        return this.breedInfo
      },
      set:_.debounce(function(val) {
        this.breedInfo = val
      }, 300)
    }
  },
  async mounted () {
    await this.fetchMovies()
    this.loaded = true
    console.log(this.movies)
  },
  methods: {
    ...mapActions(['fetchMovies']),
  }
}
</script>

<style scoped>
  .categories {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
  }
  .categories img {
    padding: 1em 0 1em 1em;
  }
  .categories__item {
    padding: 1em;
  }
  .container {
    padding: 2em;
  }
  input[type="search"] {
    padding:1em 1em;
    width: 300px;
    border: 2px solid#E7F1E9;
    font-size:.8em;
    border-radius:5px;
    margin-top: 1em;
  }
  .container--flex {
    margin-top: 2em;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .title {
    /* margin-left: 1em; */
  }
  .media-type {
    margin-top: 1em;
    color: #959CA0;
  }
  @media all and (max-width: 743px) {
    .container {
      padding: .5em;
    }
  }
  @media all and (max-width: 300px) {
    h1 {
      font-size: 1em;
    }
    input[type="text"] {
      width: 90%;
    }
  }
</style>
