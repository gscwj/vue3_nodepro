import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

import createPersistedState from 'vuex-persistedstate'
export default new Vuex.Store({
  state: {
    login_d: false,
    login_form: false,
    register_form: false,
  },
  getters:{

  },
  mutations: {

  },
  actions: {

  },
  plugins:[createPersistedState()]
})
