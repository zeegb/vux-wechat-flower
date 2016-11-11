/**
 * Created by wangze on 2016/10/18.
 */
import Vue from 'vue'
import Vuex from 'vuex'

import base from './modules/base'
import business from './modules/business'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    base,
    business,
    user
  },
  strict: true
})
