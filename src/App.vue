<template>
  <v-app id="keep">
    <AppHeader :app-name="appName"/>
    <v-content>
      <template v-if="this.$store.getters.isLogin">
        <router-view/>
      </template>
      <template v-else-if="false">
        <Register/>
        <v-btn
          class="white--text"
          color="cyan lighten-2"
          @click="loginWithGoogle()"
        >
          Sign In with Google
        </v-btn>
        <v-btn
          class="white--text"
          color="green lighten-3"
        >
          Login!
        </v-btn>
      </template>
      <template v-else>
        <h1 class="display-4 text-center mt-5">
          Welcome!
        </h1>
      </template>
    </v-content>
    <template v-if="this.$store.getters.isLogin">
      <AppFooter :bottom-props="bottomProps" :color="color"/>
    </template>
  </v-app>
</template>

<script>
import Register from '@/components/Register'
import AppFooter from '@/components/AppFooter'
import AppHeader from '@/components/AppHeader'
export default {
  components: {AppHeader, AppFooter, Register},
  data () {
    return {
      appName: 'Sample App',
      bottomProps: [
        {
          color: 'cyan lighten-2',
          text: 'ホーム',
          icon: 'home',
          click: () => {
            this.$router.push('/user/' + this.$store.getters.user.id)
          }
        },
        {
          color: 'blue lighten-3',
          text: 'グループ',
          icon: 'fas fa-users',
          click: () => {
            this.$router.push('/group')
          }
        },
        {
          color: 'indigo lighten-3',
          text: '通知',
          icon: 'notifications',
          click: () => {
            this.$router.push('/notification')
          }
        },
        {
          color: 'teal lighten-2',
          text: '設定',
          icon: 'settings',
          click: () => {
            this.$router.push('/setting')
          }
        }
      ]
    }
  },
  props: {
    source: String
  },
  beforeCreate: function () {
    this.$store.dispatch('checkToken', this.$router).then(() => {
      console.log('Check token')
    })
  },
  computed: {
    color () {
      return 'white'
    }
  },
  methods: {
    loginWithGoogle () {
      this.$store.dispatch('authenticate_google', this.$auth, this.$router).then(() => {
        console.log('Login')
      })
    }
  }
}
</script>

<style lang="scss">
@import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

p, div{
  font-family: "Roboto", "Helvetica Neue", Helvetica, Arial, sans-serif;
}

*::-webkit-scrollbar{
    display:none;
}
</style>
