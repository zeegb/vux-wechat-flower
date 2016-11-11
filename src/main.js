import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import Resource from 'vue-resource'
import {sync} from 'vuex-router-sync'
import store from './vuex/store'
import routerMap from './router'

const FastClick = require('fastclick')
FastClick.attach(document.body)

Vue.use(VueRouter)
Vue.use(Resource)

const router = new VueRouter({
  hashbang: true,
  saveScrollPosition: true,
  transitionOnLoad: false
})

let history = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)

sync(store, router)

const dispatch = store.dispatch

router.redirect({
  '/': '/home'
})

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
  setTimeout(next, 0)
})

router.afterEach(function (transition) {
  dispatch('UPDATE_LOADING', false)
  window.scrollTo(0, 0)
})

routerMap(router)

router.start(App, '#app')

