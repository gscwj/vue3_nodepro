import Vue from 'vue'
import Router from 'vue-router'

const Home = r=>require.ensure([],() =>r(require('@/views/Home')));
const Login = r=>require.ensure([],() =>r(require('@/views/Login')));

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
