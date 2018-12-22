import Vue from 'vue'
import axios from 'axios'
import VueAuthenticate from 'vue-authenticate'

Vue.use(VueAuthenticate)

export default {
  data: () => ({
    isLogin: false,
    currentUser: null,
    socialUser: null
  }),
  methods: {
    checkToken: function (provider, redirect) {
      axios.post('http://localhost:8000/api/check/', {
        'token': localStorage.getItem('vue-authenticate.vueauth_token')
      }).then((res) => {
        const path = (res.data.status) ? true : '/'
        redirect({path: path})
      }).catch((err) => {
        console.log(err)
      })
    },
    authenticate_google: function () {
      this.$auth
        .authenticate('google', {provider: 'google-oauth2'})
        .then(function (res) {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
