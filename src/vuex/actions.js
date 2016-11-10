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
 * business
 * @param dispatch
 * @param cacheOrder
 */
export const setCacheOrder = ({dispatch}, cacheOrder) => {
  dispatch('UPDATE_CACHE_ORDER', cacheOrder)
}
export const setAddress = ({dispatch}, address) => {
  return Vue.http.post('/wx/data/product/find-one', {
    userId: address,
    address: address,
    is_default: address,
    phone: address,
    name: address
  }).then((res) => {
    if (res.body && res.body.code === '200' && res.body.data) {
      dispatch('UPDATE_CACHE_ORDER', address)
    } else {
      dispatch('UPDATE_ADDRESS_ERROR', true)
    }
  }, (err) => {
    console.log(err)
    dispatch('UPDATE_ADDRESS_ERROR', true)
  })
}
