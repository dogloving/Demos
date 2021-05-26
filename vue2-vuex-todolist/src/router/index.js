import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
export default new VueRouter({
  routes: [
    {
      path: '',
      redirect: '/all',
    },
    {
      path: '/all',
      component: ()=> import('../components/TaskList.vue'),
      meta: {
        tab: 'all',
      },
    },
    {
      path: '/active',
      component: ()=> import('../components/TaskList.vue'),
      meta: {
        tab: 'active',
      },
    },
    {
      path: '/done',
      component: ()=> import('../components/TaskList.vue'),
      meta: {
        tab: 'done',
      },
    },
    {
      path: '*',
      redirect: '/all',
    },
  ],
  mode: 'history',
})