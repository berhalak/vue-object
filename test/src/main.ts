import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { Renderer } from '@/api';

Vue.config.productionTip = false

Vue.use(Renderer);

new Vue({
  router,
  render: (h) => {
    return h(App);
  }
}).$mount('#app')
