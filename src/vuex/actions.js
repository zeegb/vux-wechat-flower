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
export const setAddress = ({dispatch}, address, userId, addressText, cb) => {
  return Vue.http.post('/wx/user-center/address-add', {
    userId: userId,
    address: addressText + address.addrText,
    editVal: address.editVal,
    addrText: address.addrText,
    is_default: address.is_default,
    phone: address.phone,
    name: address.name
  }).then((res) => {
    if (res.body && res.body.code === '200' && res.body.data) {
      dispatch('UPDATE_ADDRESS_SUCCESS', true)
      setTimeout(cb, 0)
    } else {
      dispatch('UPDATE_ADDRESS_ERROR', true)
      cb()
    }
  }, (err) => {
    console.log(err)
    dispatch('UPDATE_ADDRESS_ERROR', true)
    cb()
  })
}
export const editAddress = ({dispatch}, address, userId, addressText, cb) => {
  return Vue.http.post('/wx/user-center/address-edit', {
    userId: userId,
    addressId: address._id,
    address: addressText + address.addrText,
    editVal: address.editVal,
    addrText: address.addrText,
    is_default: address.is_default,
    phone: address.phone,
    name: address.name
  }).then((res) => {
    if (res.body && res.body.code === '200' && res.body.data) {
      dispatch('UPDATE_ADDRESS_SUCCESS', true)
      setTimeout(cb, 0)
    } else {
      dispatch('UPDATE_ADDRESS_ERROR', true)
      cb()
    }
  }, (err) => {
    console.log(err)
    dispatch('UPDATE_ADDRESS_ERROR', true)
    cb()
  })
}
export const getAddress = ({dispatch}, userId) => {
  return Vue.http.post('/wx/user-center/address', {
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
export const resetDataEmpty = ({dispatch}) => {
  dispatch('GET_ADDRESS_ERROR', false)
}
export const getSelectAddress = ({dispatch}, userId) => {
  return Vue.http.post('/wx/user-center/address', {
    userId: userId
  }).then((res) => {
    if (res.body && res.body.code === '200' && res.body.data) {
      var selectAddress = res.body.data.filter((item) => {
        return item.is_default
      })
      if (selectAddress.length === 0) {
        selectAddress[0] = {}
      }
      console.log(JSON.stringify(selectAddress[0]))
      dispatch('UPDATE_SELECT_ADDRESS', selectAddress[0])
    } else {
      dispatch('GET_ADDRESS_ERROR', true)
    }
  }, (err) => {
    console.log(err)
    dispatch('GET_ADDRESS_ERROR', true)
  })
}
export const deleteAddress = ({dispatch}, addressId, userId, cb) => {
  return Vue.http.post('/wx/user-center/address-del', {
    userId: userId,
    addressId: addressId
  }).then((res) => {
    if (res.body && res.body.code === '200' && res.body.data) {
      dispatch('UPDATE_ADDRESS_SUCCESS', true)
      setTimeout(cb, 0)
    } else {
      dispatch('UPDATE_ADDRESS_ERROR', true)
      cb()
    }
  }, (err) => {
    console.log(err)
    dispatch('UPDATE_ADDRESS_ERROR', true)
    cb()
  })
}
export const setSelectAddress = ({dispatch}, selectAddress) => {
  dispatch('UPDATE_SELECT_ADDRESS', selectAddress)
}
export const setDefaultAddress = ({dispatch}, addressId, userId) => {
  return Vue.http.post('/wx/user-center/address-set-default', {
    userId: userId,
    addressId: addressId
  }).then((res) => {
    console.log(res)
    if (res.body && res.body.code === '200' && res.body.data) {
      dispatch('UPDATE_ADDRESS_LIST', res.body.data)
    } else {
      // dispatch('GET_ADDRESS_ERROR', true)
    }
  }, (err) => {
    console.log(err)
    // dispatch('GET_ADDRESS_ERROR', true)
  })
}
export const getCartList = ({dispatch}, userId) => {
  return Vue.http.post('/wx/data/cart/list', {
    uid: userId,
    ops: `{"openid": "${userId}","disabled":false,"direct":false}`
  }).then((res) => {
    console.log(res)
    if (res.body && res.body.code === '200' && res.body.data) {
      if (!res.body.data.items) res.body.data.items = []
      dispatch('UPDATE_CART_LIST', res.body.data.items)
    } else {
      dispatch('UPDATE_CART_ERROR', true)
    }
  }, (err) => {
    console.log(err)
    dispatch('UPDATE_CART_ERROR', true)
  })
}
export const resetCartError = ({dispatch}) => {
  dispatch('UPDATE_CART_ERROR', false)
}
export const updateCartData = ({dispatch}, userId, cartId, count) => {
  return Vue.http.post('/wx/cart/update-product', {
    openid: userId,
    cart_id: cartId,
    count: count
  }).then((res) => {
    console.log(res)
    if (res.body && res.body.code === '200' && res.body.data) {
      console.log('购物车数据更新成功,count:', res.body.data.count)
    } else {
      console.log('购物车数据更新失败,id:', cartId)
    }
  }, (err) => {
    console.log(err)
    console.log('购物车数据更新失败,id:', cartId)
  })
}
export const resetCanExpress = ({dispatch}) => {
  dispatch('SHOW_EXPRESS_ALERT', false)
}
export const getFreight = ({dispatch}, locations, fn) => {
  return Vue.http.post('/wx/freight/query', {
    locations: locations
  }).then((res) => {
    console.log(res)
    if (res.body && res.body.code === '200') {
      dispatch('GET_EXPRESS_FEE', res.body.data.fee)
      dispatch('UPDATE_CAN_EXPRESS', true)
      !!fn && fn()
    } else {
      dispatch('GET_EXPRESS_FEE', 0)
      dispatch('UPDATE_CAN_EXPRESS', false)
      !!fn && fn()
    }
  }, (err) => {
    console.log(err)
    dispatch('GET_EXPRESS_FEE', 0)
    dispatch('UPDATE_CAN_EXPRESS', false)
    !!fn && fn()
  })
}
export const setFreight = ({dispatch}) => {
  dispatch('GET_EXPRESS_FEE', 0)
}
export const getCouponList = ({dispatch}, userID) => {
  return Vue.http.post('/wx/coupons/list', {
    openid: userID
  }).then((res) => {
    console.log(res)
    if (res.body && res.body.code === '200') {
      if (userID) dispatch('PERSON_COUPON_LIST', res.body.data)
      else dispatch('ALL_COUPON_LIST', res.body.data)
    } else {
      dispatch('GET_COUPON_ERROR', false)
    }
  }, (err) => {
    console.log(err)
    dispatch('GET_COUPON_ERROR', false)
  })
}
export const setCurrentCoupon = ({dispatch}, coupon) => {
  dispatch('SET_CURRENT_COUPON', coupon)
}
