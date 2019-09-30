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
    do_login(state){
      state.login_d = true;
    },
    do_logout(state){
      state.login_d = false;
    },

    open_login_form(state){
      state.login_form = true;
    },
    close_login_form(state){
      state.login_form = false;
    }
  },
  actions: {

  },
  plugins:[createPersistedState()]
})
