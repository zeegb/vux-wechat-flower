/**
 * Created by wangze on 2016/10/18.
 */
export const isLoading = ({base}) => base.isLoading
export const direction = ({base}) => base.direction

export const cacheOrder = ({business}) => business.cacheOrder
export const addressList = ({business}) => business.addressList
export const addressError = ({business}) => business.addressError
export const addressSuccess = ({business}) => business.addressSuccess
export const isEmpty = ({business}) => business.isEmpty
export const selectAddress = ({business}) => business.selectAddress
export const cartList = ({business}) => business.cartList
export const cartError = ({business}) => business.cartError
export const canExpress = ({business}) => business.canExpress
export const fee = ({business}) => business.fee
export const showExpressAlert = ({business}) => business.showExpressAlert

export const getUserId = ({user}) => user.openid
export const userInfo = ({user}) => user.userInfo
export const showAlert = ({user}) => user.showAlert
