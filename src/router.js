import Vue from 'vue'
import Router from 'vue-router'

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};

const Home = r=>require.ensure([],() =>r(require('@/views/Home')));
const Door = r=>require.ensure([],() =>r(require('@/views/Door')));
const Login = r=>require.ensure([],() =>r(require('@/views/Login')));
const mt4_workspace = r=>require.ensure([],() =>r(require('@/views/mt4_workspace')));
const personCenter = r=>require.ensure([],() =>r(require('@/views/personCenter')));

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      redirect: '/home_door',
      children:[
        {
          path: '/home_door',
          name: 'Door',
          component: Door
        },
        {
          path: '/center',
          name: 'personCenter',
          component: personCenter
        },
        {
          path: '/workspace',
          name: 'mt4_workspace',
          component: mt4_workspace
        },
      ]
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
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
