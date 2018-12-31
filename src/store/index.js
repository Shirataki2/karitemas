import Vue from 'vue'
import Vuex from 'vuex'
import VueFlashMessage from 'vue-flash-message'
import axios from 'axios'

Vue.use(VueFlashMessage)
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: null
  },
  getters: {
    user (state, getters) {
      if (!getters.isLogin) {
        return ''
      }
      const data = JSON.parse(state.currentUser.user)[0]
      const user = data.fields
      user.id = data.pk
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
    },
    groups (state, getters) {
      const user = getters.user
      return user.groups
    },
    token () {
      return {Authorization: `Token ${localStorage.getItem('vue-authenticate.vueauth_token')}`}
      // return {code: `${localStorage.getItem('vue-authenticate.vueauth_token')}`}
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
    checkToken: function ({ dispatch, commit, getters, state }, router) {
      console.log('Token check started')
      return axios.post(`${process.env.API_URL}/api/check/`, {
        token: localStorage.getItem('vue-authenticate.vueauth_token')
      }).then((res) => {
        console.log(res)
        if (res.data.status === 'TOKEN_NOTFOUND') {
          dispatch('logout', router)
        } else {
          console.log('Authorized')
          commit('login', res.data)
          console.log(getters.user)
        }
      }).catch((err) => {
        console.error(err)
        dispatch('logout', router)
      })
    },
    authenticate_google: function ({ dispatch, commit, getters, state }, payload) {
      const [auth, router] = [...payload]

      return auth
        .authenticate('google', {provider: 'google-oauth2'})
        .then((res) => {
          console.log(res)
          dispatch('checkToken', router).then(() => {
            console.log(getters.user)
            console.log('Move to User page')
            router.push('user/' + getters.user.id)
          })
        }).then(() => {
        })
        .catch((err) => {
          console.error(err)
        })
    },
    logout: function ({commit}, router) {
      return axios.post(`${process.env.API_URL}/api/delete_token/`, {
        'token': localStorage.getItem('vue-authenticate.vueauth_token')
      }).then(() => {
        commit('logout')
        router.push('/')
      }).catch((err) => {
        console.error(err)
      })
    },
    getUserById: function ({commit}, id) {
      return axios.get(`${process.env.API_URL}/api/user/${id}`, {
        headers: this.$store.getters.token
      })
        .then((res) => {
          console.log(res)
          return res.data
        }).catch(() => {
          return ''
        })
    }
  }
})
