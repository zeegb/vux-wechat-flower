/**
 * Created by wangze on 2016/10/18.
 */
import Vue from 'vue'

/**
 * base
 * @param dispatch
 * @param status
 */
export const setLoadingState = ({dispatch}, status) => {
  dispatch('UPDATE_LOADING', status)
}

/**
 * user
 * @param dispatch
 * @param status
 */
export const closeAlert = ({dispatch}, isShow) => {
  dispatch('SHOW_ALERT', isShow)
}

/**
 * business
 * @param dispatch
 * @param cacheOrder
 */
export const setCacheOrder = ({dispatch}, cacheOrder) => {
  dispatch('UPDATE_CACHE_ORDER', cacheOrder)
}
export const setAddress = ({dispatch}, address, userId) => {
  return Vue.http.post('/wx/user-center/address-add', {
    userId: userId,
    address: address.editVal.join('') + address.addrText,
    editVal: address.editVal,
    addrText: address.addrText,
    is_default: address.is_default,
    phone: address.phone,
    name: address.name
  }).then((res) => {
    if (res.body && res.body.code === '200' && res.body.data) {
      console.log(11111)
      dispatch('UPDATE_ADDRESS_SUCCESS', true)
    } else {
      console.log(2222)
      dispatch('UPDATE_ADDRESS_ERROR', true)
    }
  }, (err) => {
    console.log(err)
    dispatch('UPDATE_ADDRESS_ERROR', true)
  })
}
export const editAddress = ({dispatch}, address, userId) => {
  return Vue.http.post('/wx/user-center/address-edit', {
    userId: userId,
    addressId: address._id,
    address: address.editVal.join('') + address.addrText,
    editVal: address.editVal,
    addrText: address.addrText,
    is_default: address.is_default,
    phone: address.phone,
    name: address.name
  }).then((res) => {
    if (res.body && res.body.code === '200' && res.body.data) {
      dispatch('UPDATE_ADDRESS_SUCCESS', true)
    } else {
      dispatch('UPDATE_ADDRESS_ERROR', true)
    }
  }, (err) => {
    console.log(err)
    dispatch('UPDATE_ADDRESS_ERROR', true)
  })
}
export const getAddress = ({dispatch}, userId) => {
  return Vue.http.post('/wx/data/product/find-one', {
    userId: userId
  }).then((res) => {
    if (res.body && res.body.code === '200' && res.body.data) {
      dispatch('UPDATE_ADDRESS_LIST', res.body.data)
    } else {
      dispatch('GET_ADDRESS_ERROR', true)
    }
  }, (err) => {
    console.log(err)
    dispatch('GET_ADDRESS_ERROR', true)
  })
}
export const resetAddressError = ({dispatch}) => {
  dispatch('UPDATE_ADDRESS_ERROR', false)
}
export const resetAddressSuccess = ({dispatch}) => {
  dispatch('UPDATE_ADDRESS_SUCCESS', false)
}
