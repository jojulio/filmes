import Vue from 'vue';
import App from './App.vue';
import router from './router.js';
import { BootstrapVue } from 'bootstrap-vue';
import VueResource from 'vue-resource';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import Notifications from 'vue-notification';

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(VueResource);
Vue.use(Loading);
Vue.use(Notifications);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
