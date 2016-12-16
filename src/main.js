import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import Resource from 'vue-resource'
import {sync} from 'vuex-router-sync'
import VueLazyload from 'vue-lazyload'
import store from './vuex/store'
import routerMap from './router'

const FastClick = require('fastclick')
FastClick.attach(document.body)

Vue.use(VueRouter)
Vue.use(Resource)
Vue.use(VueLazyload)

// with options
Vue.use(VueLazyload, {
  preLoad: 1,
  error: 'assets/logo.png',
  loading: 'http://img.zcool.cn/community/01443f564897a432f87512f6eed753.gif',
  attempt: 1
})

const router = new VueRouter({
  hashbang: true,
  history: false,
  saveScrollPosition: false,
  transitionOnLoad: true
})

let history = window.sessionStorage
history.clear()
// let historyCount = history.getItem('count') * 1 || 0
history.setItem('Home', 0)
history.setItem('Card', 1)
history.setItem('Cart', 2)
history.setItem('Person', 3)

const pathArr = ['Home', 'Person', 'Cart', 'Card']
let translateArr = []

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
      //     dispatch('SET_USERINFO', res.body.data.user_info || {})
      //     toNext()
      //   } else {
      //     redirect('/')
      //     dispatch('SHOW_ALERT', true)
      //     setTimeout(next, 0)
      //   }
      // })
      toNext()
    }
  } else {
    toNext()
  }
  function toNext () {
    // const toIndex = history.getItem(to.path)
    // const fromIndex = history.getItem(from.path)
    // if (toIndex) {
    //   if (toIndex > fromIndex) {
    //     dispatch('UPDATE_DIRECTION', 'forward')
    //   } else {
    //     dispatch('UPDATE_DIRECTION', 'reverse')
    //   }
    // } else {
    //   ++historyCount
    //   history.setItem('count', historyCount)
    //   to.path !== '/' && history.setItem(to.path, historyCount)
    //   dispatch('UPDATE_DIRECTION', 'forward')
    // }
    if (pathArr.indexOf(to.name) > -1 && pathArr.indexOf(from.name) > -1) {
      const toIndex = history.getItem(to.name)
      const fromIndex = history.getItem(from.name)
      if (toIndex > fromIndex) {
        dispatch('UPDATE_DIRECTION', 'forward')
      } else {
        dispatch('UPDATE_DIRECTION', 'reverse')
      }
      translateArr = []
      translateArr.push(from.name)
    } else {
      if (translateArr[translateArr.length - 1] === to.name) {
        dispatch('UPDATE_DIRECTION', 'reverse')
        translateArr.pop()
      } else {
        dispatch('UPDATE_DIRECTION', 'forward')
        translateArr.push(from.name)
      }
      if (pathArr.indexOf(to.name) > -1) {
        translateArr = [to.name]
      }
    }
    dispatch('UPDATE_LOADING', true)
    setTimeout(next, 0)
  }
})

router.afterEach(function (transition) {
  dispatch('UPDATE_LOADING', false)
  setTimeout(() => {
    window.scrollTo(0, 0)
  }, 0)
})

routerMap(router)

router.start(App, '#app')

