// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import VueAxios from 'vue-axios'
import Vuelidate from 'vuelidate'
import Vuex from 'vuex'
import axios from 'axios'
import App from './App'
import router from './router'
import store from './store'
import 'vuetify/dist/vuetify.min.css'
import 'vue-flash-message/dist/vue-flash-message.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@mdi/font/css/materialdesignicons.css'
import '@fortawesome/fontawesome-free/css/all.css'
import VueAuthenticate from 'vue-authenticate'
import VueFlashMessage from 'vue-flash-message'
Vue.use(Vuex)
Vue.use(Vuetify, {
  iconfont: 'fa'
})
Vue.use(VueAxios, axios)
Vue.use(Vuelidate)
Vue.use(VueFlashMessage)
Vue.use(VueAuthenticate, {
  baseUrl: process.env.API_URL,
  bindRequestInterceptor () {
    this.$http.interceptors.request.use((config) => {
      if (this.isAuthenticated()) {
        config.headers.Authorization = [this.options.tokenType, this.getToken()].join(' ')
      } else {
        delete config.headers.Authorization
      }
      return config
    })
  },
  bindResponseInterceptor () {
    this.$http.interceptors.response.use((response) => {
      this.setToken(response)
      return response
    })
  },
  providers: {
    google: {
      clientId: '119829735039-0ifjvbtvacv39c9u65dbjd46o5bf1l6b.apps.googleusercontent.com',
      redirectUri: process.env.SERVER_URL,
      url: `${process.env.API_URL}/api/login/social/token/google/`
    }
  }
})
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  store
})
