import { SET_MEDIA, SET_PAGE, CLEAR_MEDIA, CLEAR_PAGE } from './mutations.types'

export default {
  [SET_MEDIA] (state, media) {
    state.media.push(...media)
  },
  [CLEAR_MEDIA] (state) {
    state.media = []
  },
  [SET_PAGE] (state, page) {
    state.page = page
  },
  [CLEAR_PAGE] (state, page) {
    state.page = null
  }
}
