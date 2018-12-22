import Vue from 'vue'
import Vuex from 'vuex'
import VueAuthenticate from 'vue-authenticate'
import axios from 'axios'
Vue.use(Vuex)
Vue.use(VueAuthenticate, {
  baseUrl: 'http://localhost:8000',
  providers: {
    google: {
      clientId: '119829735039-0ifjvbtvacv39c9u65dbjd46o5bf1l6b.apps.googleusercontent.com',
      redirectUri: 'http://localhost:8080/',
      url: 'http://localhost:8000/api/login/social/token/google/'
    }
  }
})

export default new Vuex.Store({
  state: {
    currentUser: null
  },
  getters: {
    isLogin (state) {
      return state.currentUser != null
    }
  },
  mutations: {
    login (state, user) {
      console.log(user)
      state.currentUser = user
    },
    logout (state) {
      state.currentUser = null
    }
  },
  actions: {
    checkToken: function ({ commit, state }) {
      axios.post('http://localhost:8000/api/check/', {
        'token': localStorage.getItem('vue-authenticate.vueauth_token')
      }).then((res) => {
        console.log(res['status'])
        if (res.data.status === 'TOKEN_NOTFOUND') {
          commit('logout')
        } else {
          console.log(res)
          commit('login', res)
        }
      }).catch((err) => {
        console.log(err)
        commit('logout')
      })
    },
    authenticate_google: function ({ commit, state }, auth) {
      console.log(auth)
      auth
        .authenticate('google', {provider: 'google-oauth2'})
        .then(function (res) {
          console.log(res)
          commit('login', res)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    logout: function ({commit}) {
      axios.post('http://localhost:8000/api/delete_token/', {
        'token': localStorage.getItem('vue-authenticate.vueauth_token')
      }).then(() => {
        commit('logout')
      }).catch((err) => {
        console.log(err)
      })
    }
  }
})
