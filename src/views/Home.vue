<template>
  <div class="container">
    <div class="title">
      <h1>Search Results</h1>
    </div>
    <div class="categories">
      <div
        class="categories__item"
        v-for="category in categories"
        :key="category"
      >
        {{ category }}
      </div>
      <div>
        <img
          key="view-module"
          src="@/assets/view_module-24px.svg"
          alt="view-module"
        >
        <img
          key="view-list"
          src="@/assets/view_list-24px.svg"
          alt="view-list"
        >
      </div>
    </div>
    <entertainment-selects/>
    <div
      v-if="movies.length && filterMovies.length"
      key="filterMovies"
      class="flex--between mt--md"
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
    <div id="mediaLoadBtn">
      <base-button
        ref="media__loader"
        name="load more"
        :on-click="loadMore"
        size="lg"
      />
    </div>
    <!-- <div
      class="container"
      v-else-if="loaded && !filterMovies.length"
      key="noResults"
    >
      <h1>Try refining your search...</h1>
    </div> -->
  </div>
</template>
<script async src="https://cdn.jsdelivr.net/npm/lodash@4.17.10/lodash.min.js"></script>
<script>
import EntertainmentCard from '@/components/EntertainmentCard'
import EntertainmentSelects from '@/components/EntertainmentSelects'
import BaseButton from '@/components/BaseButton'
import { mapActions, mapState } from 'vuex'
import _ from 'lodash'
export default {
  name: 'Home',
  components: {
    EntertainmentCard,
    EntertainmentSelects,
    BaseButton
  },
  data () {
    return {
      loading: true,
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
    this.loading = false
    console.log(this.movies)
  },
  methods: {
    ...mapActions(['fetchMovies']),
    async loadMore() {
      console.log('loading more...')
      console.log(this.page)
      await this.fetchMovies(this.page)
      // this.loadBar(this.$refs.media__loader)
    },
    // loadBar (e, domNode) {
    //   let elm
    //   if (domNode) elm = domNode
    //   else { elm = e }
    //   elm.style.display = 'block'
    //   let width = 0
    //   let id = setInterval(f, 20)
    //   let vm = this
    //   function f () {
    //     if (width >= 97 && vm.loading) {
    //       width = 97
    //       elm.style.width = width
    //     }
    //     if (width >= 80 && vm.loading) {
    //       width += 0.2
    //       elm.style.width = width
    //     }
    //     if (width >= 100 || !vm.loading) {
    //       elm.style.width = '100%'
    //       setTimeout(() => {
    //         elm.style.display = 'none'
    //       }, 500)
    //       clearInterval(id)
    //     } else {
    //       width++
    //       elm.style.width = width + '%'
    //     }
    //   }
    // }
  }
}
</script>

<style scoped>
  .categories {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    flex-wrap: wrap;
    align-items: center;
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
  #mediaLoadBtn {
    display: flex;
    justify-content: center;
  }
  .mt--md {
    margin-top: 2em;
  }
  .flex--between {
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
