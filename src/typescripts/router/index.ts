import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

// pages
import Index from '@/pages/Index.vue';
import Page1 from '@/pages/Page1.vue';

const router = new VueRouter({
  mode: 'history',
  base: (process.env.NODE_ENV !== 'production') ? '/' : '/vuejs-pre-render-test',
  routes: [
    {
      path: '/',
      component: Index,
    },
    {
      path: '/page1',
      component: Page1,
    },
  ],
});

export default router;
