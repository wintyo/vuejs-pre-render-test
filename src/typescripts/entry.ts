import Vue from 'vue';
import App from './apps/App.vue';

import router from './router/';

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App />',
});
