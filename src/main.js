// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueMaterial from 'vue-material'
import VeeValidate from 'vee-validate'
import App from './App'
import router from './router'
import VueApollo from 'vue-apollo'
import apolloProvider from './apollo'

Vue.config.productionTip = false

Vue.use(VueApollo)
Vue.use(VueMaterial)
Vue.use(VeeValidate)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  apolloProvider,
  template: '<App/>',
  components: { App }
})
