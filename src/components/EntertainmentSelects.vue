<template>
  <div class="flex--between">
    <div class="selectFilters__selectors">
      <label for="Genres">Genres</label>
      <select
        name="Genres"
        v-model="genres.selected"
        multiple
        size="6"
      >
        <option
          v-for="option in genres.options"
          :key="option.id"
          :value="option.id"
        >
          {{ option.name }}
        </option>
      </select>
      <label for="Adult">Adult</label>
      <select
        name="Adult"
        v-model="adult.selected">
        <option
          v-for="option in adult.options"
          :key="option"
          :value="option"
        >
          {{ option }}
        </option>
      </select>
    </div>
    <div class="selectFilters__buttons">
      <base-button
        :on-click="clearFilters"
        name="clear filters"
      />
      <base-button
        :on-click="applyFilters"
        name="apply filters"
      />
    </div>
  </div>
</template>

<script>
import BaseButton from '@/components/BaseButton'
import { mapActions } from 'vuex'
export default {
  name: 'EntertainmentSelects',
  components: {
    BaseButton
  },
  data () {
    return {
      genres: {
        selected: [],
        options: [
          {
            'id': 28,
            'name': 'Action'
          },
          {
            'id': 12,
            'name': 'Adventure'
          },
          {
            'id': 16,
            'name': 'Animation'
          },
          {
            'id': 35,
            'name': 'Comedy'
          },
          {
            'id': 80,
            'name': 'Crime'
          },
          {
            'id': 99,
            'name': 'Documentary'
          },
          {
            'id': 18,
            'name': 'Drama'
          },
          {
            'id': 10751,
            'name': 'Family'
          },
          {
            'id': 14,
            'name': 'Fantasy'
          },
          {
            'id': 36,
            'name': 'History'
          },
          {
            'id': 27,
            'name': 'Horror'
          },
          {
            'id': 10402,
            'name': 'Music'
          },
          {
            'id': 9648,
            'name': 'Mystery'
          },
          {
            'id': 10749,
            'name': 'Romance'
          },
          {
            'id': 878,
            'name': 'Science Fiction'
          },
          {
            'id': 10770,
            'name': 'TV Movie'
          },
          {
            'id': 53,
            'name': 'Thriller'
          },
          {
            'id': 10752,
            'name': 'War'
          },
          {
            'id': 37,
            'name': 'Western'
          }
        ]
      },
      adult: {
        selected: null,
        options: [true, false]
      }
    }
  },
  async mounted () {
    // await this.fetchGenres('movie')
    // .then(g => {
    // this.genres.options = g.genres
    // this.genres.selected = [this.genres.options[0].id]
    // })
    // .catch('handle error!')
  },
  methods: {
    ...mapActions(['fetchGenres']),
    clearFilters () {
      this.genres.selected = []
      this.adult.selected = null
    },
    applyFilters () {
      console.log('filters applied!')
    }
  }
}
</script>

<style scoped>
  .flex--between {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-end;
  }
  .flex--between > div {
    margin-bottom: 2em;
  }
  button:first-child {
    margin-right: 1em;
  }
  .selectFilters__buttons {
    margin-left: 1em;
  }
</style>
