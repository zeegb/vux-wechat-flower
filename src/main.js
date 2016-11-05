import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import Resource from 'vue-resource'
import {sync} from 'vuex-router-sync'
import store from './vuex/store'

const FastClick = require('fastclick')
FastClick.attach(document.body)

Vue.use(VueRouter)
Vue.use(Resource)

const router = new VueRouter({
  hashbang: true,
  saveScrollPosition: true,
  transitionOnLoad: true
})

let history = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)

sync(store, router)

const dispatch = store.dispatch

router.beforeEach(({to, from, next}) => {
  const toIndex = history.getItem(to.path)
  const fromIndex = history.getItem(from.path)
  if (toIndex) {
    if (toIndex > fromIndex) {
      dispatch('UPDATE_DIRECTION', 'forward')
    } else {
      dispatch('UPDATE_DIRECTION', 'reverse')
    }
  } else {
    ++historyCount
    history.setItem('count', historyCount)
    to.path !== '/' && history.setItem(to.path, historyCount)
    dispatch('UPDATE_DIRECTION', 'forward')
  }
  dispatch('UPDATE_LOADING', true)
  setTimeout(next, 500)
})

router.afterEach(function (transition) {
  dispatch('UPDATE_LOADING', false)
  window.scrollTo(0, 0)
})

router.map({
  '/': {
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
  '/product-detail': {
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

router.start(App, '#app')

