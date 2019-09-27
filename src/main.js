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
/*导入jquery*/
import 'jquery'

/*导入拦截器*/
// import common_router from './router_back/middle_router/common_router'

/*导入echarts*/
import echarts from 'echarts'
Vue.prototype.$echarts = echarts;
/*导入echarts-liquidfill*/
import 'echarts-liquidfill'

Vue.config.debug = true;
Vue.config.productionTip = false;

// common_router.install(router);/*实例化自定义路由拦截器*/

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
