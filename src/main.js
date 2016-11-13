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
  history: false,
  saveScrollPosition: false,
  transitionOnLoad: false
})

let history = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)

sync(store, router)

const dispatch = store.dispatch

router.beforeEach(({to, from, next, redirect}) => {
  // if (to.name === 'Home' && to.query.openid) {
  //   history.setItem('openid', to.query.openid)
  //   dispatch('SET_OPENID', to.query.openid)
  // }
  if (to.auth) {
    if (history.getItem('openid')) {
      toNext()
    } else {
      // Vue.http.post('/wx/user/cookie').then((res) => {
      //   if (res.body && res.body.code === '200' && res.body.data) {
      //     history.setItem('openid', res.body.data.openid)
      //     dispatch('SET_OPENID', res.body.data.openid)
      //     dispatch('SET_USERINFO', res.body.data)
      //     toNext()
      //   }
      // })
      toNext()
      // redirect('/')
      // dispatch('SHOW_ALERT', true)
    }
  } else {
    toNext()
  }
  function toNext () {
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
  }
})

router.afterEach(function (transition) {
  dispatch('UPDATE_LOADING', false)
  window.scrollTo(0, 0)
})

routerMap(router)

router.start(App, '#app')

