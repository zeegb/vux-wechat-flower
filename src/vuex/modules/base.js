/**
 * Created by wangze on 2016/10/18.
 */
import {UPDATE_LOADING} from '../mutation-types'

let state = {
  isLoading: false,
  direction: 'forward'
}

const mutations = {
  [UPDATE_LOADING] (state, status) {
    state.isLoading = status
  }
}

export default {
  state,
  mutations
}
