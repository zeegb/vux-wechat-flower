import Vue from 'vue'
import App from './App'
import Home from './views/Home.vue'
import Person from './views/Person.vue'
import Setting from './views/P-setting.vue'
import Card from './views/Card.vue'
import Cart from './views/Cart.vue'
import Product from './views/Product.vue'
import productDetail from './views/Product-detail.vue'
import VueRouter from 'vue-router'

const FastClick = require('fastclick')
FastClick.attach(document.body)

Vue.use(VueRouter)

const router = new VueRouter()

router.map({
  '/': {
    component: Home,
    name: 'Home'
  },
  '/person': {
    component: Person,
    name: 'Person'
  },
  '/person-setting': {
    component: Setting,
    name: 'Setting'
  },
  '/card': {
    component: Card,
    name: 'Card'
  },
  '/cart': {
    component: Cart,
    name: 'Cart'
  },
  '/product': {
    component: Product,
    name: 'Product'
  },
  '/product-detail': {
    component: productDetail,
    name: 'productDetail'
  }
})

router.start(App, '#app')

