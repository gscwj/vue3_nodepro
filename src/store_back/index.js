import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);
import createPersistedState from 'vuex-persistedstate'

import common_env from './modules/common_env'
const Store = new vuex.Store({
    modules:{
        common_env_md: common_env,
    }
});