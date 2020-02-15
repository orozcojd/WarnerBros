<template>
  <div class="media-card">
    <transition name="overlay">
      <div
        v-if="loading"
        class="overlay"
        :style="loadingColor"
      />
    </transition>
    <div class="media-img">
      <img
        :src="img"
        alt="movie-img"
        loading="lazy"
      >
    </div>
    <div
      ref="movie__loader"
      class="media-img--loader"/>
    <div class="media-card__inner">
      <slot name="media-type" />
      <h2>{{ data.title }}</h2>
      <!-- <div v-if="movies.length">
        <div
          class="media-card--expand"
          @click="expandCard = !expandCard"
        >
          <img
            v-if="!expandCard"
            key="expand"
            src="@/assets/expand_more-24px.svg"
            alt="more"
          >
          <img
            v-else
            key="hide"
            src="@/assets/expand_less-24px.svg"
            alt="more">
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'EntertainmentCard',
  components: {
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    loadingColor () {
      return {
        background: `#${this.newColor()}`,
        zIndex: 2,
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0
      }
    },
    expandImg () {
      return this.expandCard ? this.arrowDown : this.arrowUp
    },
    img () {
      return this.imgUrl + '/' + this.data.poster_path
    }
  },
  data () {
    return {
      loading: true,
      expandCard: false,
      imgLoading: false,
      imgUrl: 'https://image.tmdb.org/t/p/w500/'
    }
  },
  async created () {
    setTimeout(() => {
      this.loading = false
    }, 1000)
  },
  methods: {
    newColor () {
      return Math.floor(Math.random() * 9999999).toString(16)
    }

  }
}
</script>

<style scoped>
  .media-card {
    position: relative;
    /* text-align: center; */
    justify-content: start;
    background:#E7F1E9;
    width: 300px;
    margin: 1em 0;
    word-break: break-all;
  }
  .media-card__inner {
    padding: 0 1em 2em 1em;
  }
  .media-card__inner h2{
    margin-top: .5em;
  }
  .media-card--expand {
    margin: auto;
    background: #CEDEEA;
    border-radius: 100%;
    width: 24px;
    opacity: .8;
    cursor: pointer;
  }
  .media-card--expand:hover {
    background: #ffffff;
  }
  .media-card--expand img {
    margin-left: auto;
    margin-right: auto;
    display: block;
  }
  .expand {
    cursor: pointer;
  }
  .media-img {
    height: 400px;
  }
  .media-img--loader {
    border: 2px solid#CEDEEA;
    width: 0;
    display: none;
  }
  .media-img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: .7;
  }
  .media-img img:hover {
    cursor: pointer;
    opacity: 1;
  }
  .overlay-enter-active, .overlay-leave-active {
    transition: opacity 1s;
  }
  .overlay-enter, .overlay-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  @media all and (max-width: 600px) {
    .media-card {
      width: 100%;
    }
  }
</style>
