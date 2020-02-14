import { UPDATE_PAGE } from './actions.types'
import { SET_PAGE, SET_MOVIES } from './mutations.types'
import { ApiService } from '@/common/api.service'

export default {
  async fetchMovies ({ commit, dispatch }) {
    try {
      const { data } = await ApiService().get('/discover/movie')
      dispatch(UPDATE_PAGE, data.page)
      console.log(data.results)
      commit(SET_MOVIES, data.results)
    } catch (e) {
      console.log(e)
    }
  },
  updatePage ({commit}, pageNo) {
    commit(SET_PAGE, pageNo)
  }
}
