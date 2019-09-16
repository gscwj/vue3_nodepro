import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
/*导入全部文件element-ui*/
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI);
/*导入main_js_import*/
import mainJS from './common-utils/main_js_import'
Vue.use(mainJS);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
