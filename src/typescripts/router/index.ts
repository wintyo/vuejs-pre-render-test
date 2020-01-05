import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

// pages
import Index from '@/pages/Index.vue';
import Test from '@/pages/Test.vue';
import Page from '@/pages/Page.vue';

const router = new VueRouter({
  mode: 'history',
  base: (process.env.NODE_ENV !== 'production') ? '/' : '/vuejs-pre-render-test',
  routes: [
    {
      path: '/',
      component: Index,
    },
    {
      path: '/test',
      component: Test,
    },
    {
      path: '/page/:id',
      component: Page,
      props: (route) => ({ id: Number(route.params.id) }),
    },
  ],
});

router.afterEach(() => {
  Vue.nextTick(() => {
    document.dispatchEvent(new Event('custom-render-trigger'));
  });
});

export default router;
