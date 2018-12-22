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
    user (state, getters) {
      if (!getters.isLogin) {
        return ''
      }
      const user = JSON.parse(state.currentUser.user)
      console.log(user[0].fields)
      return user[0].fields
    },
    isLogin (state) {
      return state.currentUser != null
    },
    username (state, getters) {
      const user = getters.user
      return user.username
    },
    fullname (state, getters) {
      const user = getters.user
      return `${user.last_name} ${user.first_name}`
    }
  },
  mutations: {
    login (state, token) {
      console.log(token.user)
      state.currentUser = token
    },
    logout (state) {
      state.currentUser = null
    }
  },
  actions: {
    checkToken: function ({ commit, state }) {
      const token = localStorage.getItem('vue-authenticate.vueauth_token')
      axios.post('http://localhost:8000/api/check/', {
        'token': token
      }).then((res) => {
        if (res.data.status === 'TOKEN_NOTFOUND') {
          commit('logout')
        } else {
          console.log(res.data)
          commit('login', res.data)
        }
      }).catch((err) => {
        console.log(err)
        commit('logout')
      })
    },
    authenticate_google: function ({ dispatch, commit, state }, auth) {
      console.log(auth)
      auth
        .authenticate('google', {provider: 'google-oauth2'})
        .then(function (res) {
          dispatch('checkToken')
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
