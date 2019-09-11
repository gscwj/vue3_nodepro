import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

/*导入全部文件element-ui*/
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from'element-ui'
Vue.use(ElementUI);
/*导入axios*/
import axios from 'axios'
// axios.defaults.withCredentials = true;
Vue.prototype.$axios = axios;

import mainJS from './common-utils/main_js_import'
Vue.use(mainJS);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
