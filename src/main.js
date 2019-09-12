import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import mainJS from './common-utils/main_js_import'
Vue.use(mainJS);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
