<template>
  <div class="flex flex--between">
    <div class="flex flex--start selectFilters__selectors">
      <check-box
        v-model="releaseYear.selected"
        :data="releaseYear.options"
        :checked-data="releaseYear.selected"
      >
        Release Year
      </check-box>
      <check-box
        v-model="genres.selected"
        :data="genres.options"
        :checked-data="genres.selected"
      >
        Genres
      </check-box>
      <!-- all elms with disabled attr share same object for simplicity -->
      <check-box
        :disabled="true"
        v-model="genres.selected"
        :data="genres.options"
        :checked-data="genres.selected"
      >
        Rating
      </check-box>
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
import CheckBox from '@/components/CheckBox'
import { mapActions } from 'vuex'
export default {
  name: 'EntertainmentSelects',
  components: {
    BaseButton,
    CheckBox
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
      releaseYear: {
        selected: [],
        options: []
      },
      adult: {
        selected: null,
        options: [true, false]
      }
    }
  },
  async mounted () {
    this.populateYears()
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
    },
    populateYears () {
      const thisYear = new Date().getFullYear()
      for (let i = thisYear; i > 1920; i--) {
        this.releaseYear.options.push({ id: i, value: i })
      }
    }
  }
}
</script>

<style scoped>
  .flex {
    display: flex;
    flex-wrap: wrap;
  }
  .flex--between {
    justify-content: space-between;
    align-items: flex-end;
  }
  .flex--start {
    justify-content: start;
    align-items: center;
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
