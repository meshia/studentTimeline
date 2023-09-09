import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import VersionTwo from '../views/VersionTwo.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'V1',
    component: Home,
  },
  {
    path: '/VersionTwo',
    name: 'VersionTwo',
    component: VersionTwo,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
