/**
 * Created by wangze on 2016/11/10.
 */
import {
  UPDATE_CACHE_ORDER,
  UPDATE_ADDRESS_SUCCESS,
  UPDATE_ADDRESS_ERROR,
  UPDATE_ADDRESS_LIST,
  GET_ADDRESS_ERROR,
  UPDATE_SELECT_ADDRESS,
  UPDATE_CART_LIST,
  UPDATE_CART_ERROR,
  UPDATE_CAN_EXPRESS,
  GET_EXPRESS_FEE,
  SHOW_EXPRESS_ALERT,
  ALL_COUPON_LIST,
  PERSON_COUPON_LIST,
  GET_COUPON_ERROR,
  SET_CURRENT_COUPON
} from '../mutation-types'

let state = {
  cacheOrder: [],
  addressList: [],
  addressError: false,
  addressSuccess: false,
  isEmpty: false,
  selectAddress: {},
  cartList: [],
  cartError: false,
  fee: 0,
  canExpress: true,
  showExpressAlert: false,
  allCouponList: [],
  personCouponList: [],
  getCouponStatus: true,
  currentCoupon: {}
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
  },
  [UPDATE_SELECT_ADDRESS] (state, selectAddress) {
    state.selectAddress = selectAddress
  },
  [UPDATE_CART_LIST] (state, cartList) {
    state.cartList = cartList
  },
  [UPDATE_CART_ERROR] (state, cartError) {
    state.cartError = cartError
  },
  [UPDATE_CAN_EXPRESS] (state, canExpress) {
    state.canExpress = canExpress
    state.showExpressAlert = !canExpress
  },
  [GET_EXPRESS_FEE] (state, fee) {
    state.fee = fee
  },
  [SHOW_EXPRESS_ALERT] (state, showExpressAlert) {
    state.showExpressAlert = showExpressAlert
  },
  [ALL_COUPON_LIST] (state, allCouponList) {
    state.allCouponList = allCouponList
  },
  [PERSON_COUPON_LIST] (state, personCouponList) {
    state.personCouponList = personCouponList
  },
  [GET_COUPON_ERROR] (state, status) {
    state.getCouponStatus = status
  },
  [SET_CURRENT_COUPON] (state, coupon) {
    state.currentCoupon = coupon
  }
}

export default {
  state,
  mutations
}
