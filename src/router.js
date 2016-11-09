/**
 * Created by wangze on 2016/11/9.
 */
export default function (router) {
  router.map({
    '/': {
      name: 'index',
      component: require('./App.vue')
    },
    '/home': {
      component: function (resolve) {
        require(['./views/Home.vue'], resolve)
      },
      name: 'Home'
    },
    '/person': {
      component: function (resolve) {
        require(['./views/Person.vue'], resolve)
      },
      name: 'Person'
    },
    '/person-setting': {
      component: function (resolve) {
        require(['./views/P-setting.vue'], resolve)
      },
      name: 'Setting'
    },
    '/card': {
      component: function (resolve) {
        require(['./views/Card.vue'], resolve)
      },
      name: 'Card'
    },
    '/cart': {
      component: function (resolve) {
        require(['./views/Cart.vue'], resolve)
      },
      name: 'Cart'
    },
    '/product': {
      component: function (resolve) {
        require(['./views/Product.vue'], resolve)
      },
      name: 'Product'
    },
    '/product-list': {
      component: function (resolve) {
        require(['./views/Product-waterfall.vue'], resolve)
      },
      name: 'product-list'
    },
    '/product-detail/:id': {
      component: function (resolve) {
        require(['./views/Product-detail.vue'], resolve)
      },
      name: 'productDetail'
    },
    '/order': {
      component: function (resolve) {
        require(['./views/Order.vue'], resolve)
      },
      name: 'order'
    },
    '/order-list': {
      component: function (resolve) {
        require(['./views/Order-list.vue'], resolve)
      },
      name: 'orderList'
    },
    '/select-address': {
      component: function (resolve) {
        require(['./views/Select-address.vue'], resolve)
      },
      name: 'selectAddress'
    },
    '/edit-address': {
      component: function (resolve) {
        require(['./views/Edit-address.vue'], resolve)
      },
      name: 'editAddress'
    },
    '/coupon': {
      component: function (resolve) {
        require(['./views/Coupon.vue'], resolve)
      },
      name: 'coupon'
    },
    '/waterfall': {
      component: function (resolve) {
        require(['./views/Waterfall.vue'], resolve)
      },
      name: 'waterfall'
    },
    '/waterfall4': {
      component: function (resolve) {
        require(['./views/Waterfall4.vue'], resolve)
      },
      name: 'waterfall4'
    },
    '/pay-result': {
      component: function (resolve) {
        require(['./views/Pay-result.vue'], resolve)
      },
      name: 'payResult'
    },
    '/feedback': {
      component: function (resolve) {
        require(['./views/Feedback.vue'], resolve)
      },
      name: 'feedback'
    }
  })
}
