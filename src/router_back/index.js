import Vue from 'vue'
import Router from 'vue-router'
import middle_router from './middle_router'

const Home = r=>require.ensure([],() =>r(require('@/views/Home')));
const Door = r=>require.ensure([],() =>r(require('@/views/Door')));
const Login = r=>require.ensure([],() =>r(require('@/views/Login')));
const mt4_workspace = r=>require.ensure([],() =>r(require('@/views/mt4_workspace')));
Vue.use(Router);


let router_list = [
    {
        path: '/',
        name: 'home',
        component: Home,
        children:[
            {
                path: '/home_door',
                name: 'Door',
                component: Door
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
];

const router = new Router(
    {
        routes: router_list,
    }
);
// middle_router.install(router);

export default router;
