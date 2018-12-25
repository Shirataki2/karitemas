import Vue from 'vue'
import Vuex from 'vuex'
import VueAuthenticate from 'vue-authenticate'
import VueFlashMessage from 'vue-flash-message'
import axios from 'axios'

Vue.use(VueFlashMessage)
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
      const user = JSON.parse(state.currentUser.user)[0].fields
      user.id = JSON.parse(state.currentUser.user)[0].pk
      return user
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
    },
    email (state, getters) {
      const user = getters.user
      return `${user.email}`
    }
  },
  mutations: {
    login (state, token) {
      console.log(JSON.parse(token.user)[0])
      state.currentUser = token
    },
    logout (state) {
      state.currentUser = null
    }
  },
  actions: {
    checkToken: function ({ dispatch, commit, state }, router) {
      const token = localStorage.getItem('vue-authenticate.vueauth_token')
      return axios.post('http://localhost:8000/api/check/', {
        'token': token
      }).then((res) => {
        if (res.data.status === 'TOKEN_NOTFOUND') {
          dispatch('logout', router)
        } else {
          commit('login', res.data)
        }
      }).catch((err) => {
        console.log(err)
        dispatch('logout', router)
      })
    },
    authenticate_google: function ({ dispatch, commit, getters, state }, payload) {
      const [auth, router] = [...payload]

      return auth
        .authenticate('google', {provider: 'google-oauth2'})
        .then(function () {
          dispatch('checkToken', router).then(() => {
            console.log(getters.user)
            router.push('user/' + getters.user.id)
          })
        })
        .catch((err) => {
          console.error(err)
        })
    },
    logout: function ({commit}, router) {
      return axios.post('http://localhost:8000/api/delete_token/', {
        'token': localStorage.getItem('vue-authenticate.vueauth_token')
      }).then(() => {
        commit('logout')
        router.push('/')
      }).catch((err) => {
        console.log(err)
      })
    },
    getUserById: function ({ commit }, id) {
      return axios.post('http://localhost:8000/api/uget/', {
        'id': id
      }).then((res) => {
        console.log(res)
        return res.data
      }).catch(() => {
        return ''
      })
    }
  }
})
