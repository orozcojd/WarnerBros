<template>
  <div class="container">
    <div class="title">
      <h1>Search Results</h1>
    </div>
    <div class="categories">
      <button
        v-for="c in categories"
        :key="c.type"
        :disabled="c.disabled"
        @click="selectCategory(c)"
        @mouseover="hover = true"
        @mouseleave="hover = false"
        class="categories__item"
        :class="{
          'item__selected': selectedCategory.type===c.type,
          'item__hover': (hover && c.type !==selectedCategory.type)
        }"
      >
        {{ c.type }}
      </button>
      <img
        class="item__hover"
        :class="{'item__selected': gridView}"
        @click="gridView = true"
        key="view-module"
        src="@/assets/view_module-24px.svg"
        alt="view-module"
      >
      <img
        class="item__hover"
        :class="{'item__selected': !gridView}"
        @click="gridView = false"
        key="view-list"
        src="@/assets/view_list-24px.svg"
        alt="view-list"
      >
    </div>
    <entertainment-selects
      @filterData="filterData"
      @clearFilters="filterData"
      :category="selectedCategory"
      ref="selectInputRef"
    />
    <div
      v-if="media.length && filterMedia.length"
      key="filterMedia"
    >
      <div
        v-show="gridView"
        class="flex--between mt--md"
      >
        <entertainment-card
          v-for="media in filterMedia"
          :key="media.id"
          :data="media"
        >
          <template v-slot:media-type>
            <div class="mt-sm media-type">{{ selectedCategory.type }}</div>
          </template>
        </entertainment-card>
      </div>
      <div
        v-show="!gridView"
        class="flex--between mt--md"
      >
        <entertainment-list-card
          v-for="media in filterMedia"
          :key="media.id"
          :data="media"
        >
          <template v-slot:media-type>
            <div class="media-type">{{ selectedCategory.type }}</div>
          </template>
        </entertainment-list-card>
      </div>
      <div id="mediaLoadBtn">
        <base-button
          ref="media__loader"
          name="load more"
          :on-click="loadMore"
          size="lg"
        />
      </div>
    </div>
    <div
      class="container"
      v-if="loaded && !media.length"
      key="noResults"
    >
      <h1>0 results found, try refining your search...</h1>
    </div>
  </div>
</template>
<script async src="https://cdn.jsdelivr.net/npm/lodash@4.17.10/lodash.min.js"></script>
<script>
import EntertainmentCard from '@/components/EntertainmentCard'
import EntertainmentListCard from '@/components/EntertainmentListCard'
import EntertainmentSelects from '@/components/EntertainmentSelects'
import BaseButton from '@/components/BaseButton'
import { mapActions, mapState } from 'vuex'
import _ from 'lodash'
export default {
  name: 'Home',
  components: {
    EntertainmentCard,
    EntertainmentListCard,
    EntertainmentSelects,
    BaseButton
  },
  data () {
    return {
      loaded: false,
      gridView: true,
      hover: false,
      selectedCategory: null,
      categories: [{
          type: 'All',
          route: '',
          disabled: true
        },
        {
          type: 'Movies',
          route: '/discover/movie'
        },
        {
          type: 'TV Shows',
          route: '/discover/tv'
        },
        {
          type: 'Games and Apps',
          route: '',
          disabled: true
        },
        {
          type: 'Blog',
          route: '',
          disabled: true
        },
        {
          type: 'Other',
          route: '',
          disabled: true
        }],
    }
  },
  computed: {
    ...mapState(['media', 'page']),
    filterMedia () {
      if (this.media.length) {
        return this.media
      }
    },
  },
  async created () {
    this.selectedCategory = this.categories[1]
    await this.fetchMedia(this.selectedCategory.route)
    this.loaded = true
  },
  methods: {
    ...mapActions(['fetchMedia', 'resetMedia']),
    async loadMore() {
      const query = this.buildQueryString()
      await this.fetchMedia(this.selectedCategory.route + query)
    },
    async selectCategory(c) {
      if(c!== this.selectedCategory) {
        this.selectedCategory = c
        this.resetMedia()
        await this.loadMore()
      }
    },
    async filterData() {
      this.resetMedia()
      await this.loadMore()
    },

    /* may need to refactor..later */
    buildQueryString() {
      const page = !this.page ? 1 : this.page
      let query = `?page=${page}`
      let child = this.$refs.selectInputRef
      const genresSelected = child.genres.selected
      const yearSelected = child.releaseYear.selected
      const yearQ = this.selectedCategory.type === 'Movies' ? 'primary_release_year' : 'first_air_date_year'
      if(genresSelected.length) {
        query += '&with_genres='
        genresSelected.forEach(g => {
          query += `${g},`
        });
      }
      if(yearSelected) {
        query += `&${yearQ}=${yearSelected}`
      }
      return query
    }
  }
}
</script>

<style scoped>
  button {
    background: inherit;
    outline: inherit;
    cursor: pointer;
  }
  .categories {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    flex-wrap: wrap;
    align-items: center;
  }
  .categories__item {
    padding: 1em;
    margin: 0.4em;
    border: none;
  }
  .item__selected {
    border-bottom: 4px solid #859D8A;
    transition: all .5s ease-in;
    font-weight: bold;
  }
  .item__hover:hover {
    border-bottom: 4px solid #E7F1E9;
  }
  .categories img {
    cursor: pointer;
    margin: 1em 0 1em 1em;
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
  .mt-sm {
    margin-top: 1em;
  }
  .mt--md {
    margin-top: 2em;
  }
  .flex--between {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .media-type {
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
