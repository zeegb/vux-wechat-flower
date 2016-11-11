/**
 * Created by wangze on 2016/11/10.
 */
import {
  UPDATE_CACHE_ORDER,
  UPDATE_ADDRESS_SUCCESS,
  UPDATE_ADDRESS_ERROR,
  UPDATE_ADDRESS_LIST,
  GET_ADDRESS_ERROR
} from '../mutation-types'

let state = {
  cacheOrder: [],
  addressList: [],
  addressError: false,
  addressSuccess: false,
  isEmpty: false
}

const mutations = {
  [UPDATE_CACHE_ORDER] (state, cacheOrder) {
    state.cacheOrder = cacheOrder
  },
  [UPDATE_ADDRESS_SUCCESS] (state, showSuccess) {
    state.addressSuccess = showSuccess
  },
  [UPDATE_ADDRESS_ERROR] (state, showError) {
    state.addressError = showError
  },
  [UPDATE_ADDRESS_LIST] (state, addressList) {
    state.addressList = addressList
  },
  [GET_ADDRESS_ERROR] (state, isEmpty) {
    state.isEmpty = isEmpty
  }
}

export default {
  state,
  mutations
}
