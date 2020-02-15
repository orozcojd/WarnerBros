<template>
  <div class="list__card">
    <img
      :src="img"
      alt="movie-img"
      loading="lazy"
    >
    <div class='list__card__details'>
      <slot name="media-type" />
      <h2>{{ data.title }}</h2>
      <p>{{ data.overview }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EntertainmentListCardVue',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    img () {
      return this.imgUrl + '/' + this.data.backdrop_path
    }
  },
  data () {
    return {
      imgUrl: 'https://image.tmdb.org/t/p/w500/'
    }
  }
}
</script>

<style scoped>
  .list__card {
    margin: 1em;
    background: #E7F1E9;
    flex: 1 1 430px;
  }
  .list__card__details {
    padding: 1em;
  }
  img {
    width: 100%;
  }
</style>
