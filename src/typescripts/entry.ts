import Vue from 'vue';
import App from './apps/App.vue';

import router from './router/';

import VueMeta from 'vue-meta';
Vue.use(VueMeta, {
  refreshOnceOnNavigation: true,
});

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App />',
});
