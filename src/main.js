import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import Resource from 'vue-resource'

const FastClick = require('fastclick')
FastClick.attach(document.body)

Vue.use(VueRouter)
Vue.use(Resource)

const router = new VueRouter({
  hashbang: true,
  saveScrollPosition: true,
  transitionOnLoad: true
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
  }
})

router.afterEach(function (transition) {
  console.log('afterEach')
  window.scrollTo(0, 0)
})

router.start(App, '#app')

