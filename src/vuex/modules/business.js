/**
 * Created by wangze on 2016/11/10.
 */
import {UPDATE_CACHE_ORDER, UPDATE_ADDRESS, UPDATE_ADDRESS_ERROR} from '../mutation-types'

let state = {
  cacheOrder: [],
  address: {},
  addressError: false
}

const mutations = {
  [UPDATE_CACHE_ORDER] (state, cacheOrder) {
    state.cacheOrder = cacheOrder
  },
  [UPDATE_ADDRESS] (state, address) {
    state.address = address
  },
  [UPDATE_ADDRESS_ERROR] (state, isSuccess) {
    state.addressError = isSuccess
  }
}

export default {
  state,
  mutations
}
