import { SET_MOVIES, SET_PAGE } from './mutations.types'

export default {
  [SET_MOVIES] (state, movies) {
    state.movies.push(...movies)
  },
  [SET_PAGE] (state, page) {
    state.page = page
  }
}
