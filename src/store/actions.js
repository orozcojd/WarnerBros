import { INC_PAGE, FETCH_MEDIA, FETCH_GENRES, RESET_MEDIA, RESET_PAGE } from './actions.types'
import { SET_PAGE, SET_MEDIA, CLEAR_MEDIA, CLEAR_PAGE } from './mutations.types'
import { ApiService } from '@/common/api.service'

export default {
  async [FETCH_MEDIA] ({ commit, dispatch }, route) {
    try {
      const { data } = await ApiService().get(route)
      dispatch(INC_PAGE, data.page + 1)
      commit(SET_MEDIA, data.results)
    } catch (e) {
      console.log(e)
    }
  },

  [INC_PAGE] ({ commit }, pageNo) {
    commit(SET_PAGE, pageNo)
  },
  async [FETCH_GENRES] ({commit}, media) {
    const { data } = await ApiService().get(`/genre/${media}/list`)
    return data
  },
  [RESET_MEDIA] ({commit}) {
    commit(CLEAR_MEDIA)
  },
  [RESET_PAGE] ({commit}) {
    commit(CLEAR_PAGE)
  }
}
