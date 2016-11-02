/**
 * Created by wangze on 2016/10/18.
 */
import {UPDATE_LOADING, UPDATE_PATH_NAME, UPDATE_DIRECTION} from '../mutation-types'

let state = {
  pathName: '',
  isLoading: false,
  direction: 'forward'
}

const mutations = {
  [UPDATE_LOADING] (state, status) {
    state.isLoading = status
  },
  [UPDATE_DIRECTION] (state, direction) {
    state.direction = direction
  },
  [UPDATE_PATH_NAME] (state, pathName) {
    state.pathName = pathName
  }
}

export default {
  state,
  mutations
}
