/**
 * Created by wangze on 2016/11/10.
 */
import {SET_OPENID, SHOW_ALERT} from '../mutation-types'

let state = {
  openid: '',
  showAlert: false
}

const mutations = {
  [SET_OPENID] (state, openid) {
    state.openid = openid
  },
  [SHOW_ALERT] (state, isShow) {
    state.showAlert = isShow
  }
}

export default {
  state,
  mutations
}
