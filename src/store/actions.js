import { INC_PAGE } from './actions.types'
import { SET_PAGE, SET_MOVIES } from './mutations.types'
import { ApiService } from '@/common/api.service'

export default {
  async fetchMovies ({ commit, dispatch }, page = 1) {
    try {
      const { data } = await ApiService().get(`/discover/movie?page=${page}`)
      console.log(data.results)
      dispatch(INC_PAGE, ++data.page)
      commit(SET_MOVIES, data.results)
    } catch (e) {
      console.log(e)
    }
  },
  incPage ({ commit }, pageNo) {
    commit(SET_PAGE, pageNo)
  },
  async fetchGenres ({commit}, media) {
    const { data } = await ApiService().get(`/genre/${media}/list`)
    return data
  }
}
