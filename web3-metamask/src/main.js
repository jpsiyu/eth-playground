// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import web3 from '@/plugins/web3'
import element from '@/plugins/element'

Vue.config.productionTip = false

/* add plugins */
Vue.use(web3)
Vue.use(element)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
