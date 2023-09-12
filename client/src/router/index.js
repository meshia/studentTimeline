import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/VersionTwo',
    name: 'VersionTwo',
    component: () => import('../views/VersionTwo.vue')
  },
  {
    path: '/',
    name: 'VersionOne',
    component: Home,
    children:[
      {
        path: ':modal'
      }
    ]
  },
  
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
