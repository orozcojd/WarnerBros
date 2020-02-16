<template>
  <div class="flex flex--between">
    <div class="flex flex--start selectFilters__selectors">
      <select-radio
        v-model="releaseYear.selected"
        :data="releaseYear.options"
        ref="selectRadio"
      >
        Release Year
      </select-radio>
      <select-checkbox
        v-model="genres.selected"
        :data="genres.options"
        ref="selectCheckbox"
      >
        Genres
      </select-checkbox>
      <!-- all elms with disabled attr share same object for simplicity -->
      <select-checkbox
        :disabled="true"
        v-model="genres.selected"
        :data="genres.options"
        :checked-data="genres.selected"
      >
        Rating
      </select-checkbox>
    </div>
    <div class="selectFilters__buttons">
      <base-button
        :on-click="clearFilters"
        name="clear filters"
      />
      <base-button
        name="apply filters"
        :on-click="applyFilters"
        :selected="filter"
      />
    </div>
  </div>
</template>

<script>
import BaseButton from '@/components/BaseButton'
import SelectCheckbox from '@/components/SelectCheckbox'
import SelectRadio from '@/components/SelectRadio'
import { mapActions } from 'vuex'
export default {
  name: 'EntertainmentSelects',
  components: {
    BaseButton,
    SelectCheckbox,
    SelectRadio
  },
  props: {
    category: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      filter: false,
      genres: {
        selected: [],
        options: []
      },
      releaseYear: {
        selected: null,
        options: []
      }
    }
  },
  async mounted () {
    this.populateYears()
    await this.fetchGenres('movie')
      .then(g => {
        this.genres.options = g.genres
        this.genres.selected = [this.genres.options[0].id]
      })
      .catch('handle error!')
  },
  methods: {
    ...mapActions(['fetchGenres']),
    clearFilters () {
      this.filter = false
      this.genres.selected = []
      this.releaseYear.selected = null

      /* reset child component val and parent data value  of select components */
      for (let r in this.$refs) {
        this.$refs[r].reset()
      }
      this.$emit('clearFilters')
    },
    applyFilters () {
      if (!this.filter) this.filter = true
      this.$emit('filterData')
    },
    populateYears () {
      this.releaseYear.options.push({id: null, value: 'All'})
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
