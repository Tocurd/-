import Vue from 'vue'
import Axios from 'axios'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false
Vue.prototype.$Axios = Axios;
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
