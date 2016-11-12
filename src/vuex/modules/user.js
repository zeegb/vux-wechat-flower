/**
 * Created by wangze on 2016/11/10.
 */
import {SET_OPENID, SHOW_ALERT, SET_USERINFO} from '../mutation-types'

let state = {
  openid: 'oDFcvv_Wms0vesZKqtiTKk5X3Zyc',
  showAlert: false,
  userInfo: {}
}

const mutations = {
  [SET_OPENID] (state, openid) {
    state.openid = openid
  },
  [SHOW_ALERT] (state, isShow) {
    state.showAlert = isShow
  },
  [SET_USERINFO] (state, userInfo) {
    state.userInfo = userInfo
  },
}

export default {
  state,
  mutations
}
