<template>
  <v-app id="keep">
    <v-toolbar color="indigo darken-2" app absolute clipped-left dark>
      <v-toolbar-side-icon @click.native="drawer = !drawer"></v-toolbar-side-icon>
      <span class="title ml-3 mr-5 ">{{appName}}</span>
      <v-text-field
        solo-inverted
        flat
        hide-details
        label="Search"
        prepend-inner-icon="search"
      ></v-text-field>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
      <p>
        {{ this.$store.state }}
      </p>
      <template v-if="this.$store.getters.isLogin">
        <router-view/>
      </template>
      <template v-else>
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
    </v-content>
    <v-bottom-nav
      :active.sync="bottomNav"
      :value="true"
      :color="color"
      absolute
      shift
    >
      <v-btn
        v-for="prop in bottomProps"
        :key="prop.id"
        :color="prop.color"
        :value="prop.id"
        flat
      >
        <span>{{ prop.text }}</span>
        <v-icon>{{ prop.icon }}</v-icon>
      </v-btn>
    </v-bottom-nav>
  </v-app>
</template>

<script>
import Register from '@/components/Register'

export default {
  components: {Register},
  data () {
    return {
      appName: 'Sample App',
      bottomNav: 0,
      bottomProps: [
        { color: 'white', text: 'ホーム', icon: 'home' },
        { color: 'white', text: '通知', icon: 'notifications' },
        { color: 'white', text: '検索', icon: 'search' },
        { color: 'white', text: '設定', icon: 'settings' }
      ]
    }
  },
  props: {
    source: String
  },
  mounted: function () {
    this.$store.dispatch('checkToken').then(() => {
      console.log('Check token')
    })
    console.log(this.$auth)
  },
  computed: {
    color () {
      switch (this.bottomNav) {
        case 0: return 'cyan lighten-2'
        case 1: return 'indigo lighten-3'
        case 2: return 'blue lighten-3'
        case 3: return 'teal lighten-2'
      }
    }
  },
  methods: {
    loginWithGoogle () {
      this.$store.dispatch('authenticate_google', this.$auth).then(() => {
        console.log('Login')
      })
    }
  }
}
</script>

<style lang="scss">
p, div{
  font-family: "Roboto", "Helvetica Neue", Helvetica, Arial, sans-serif;
}

*::-webkit-scrollbar{
    display:none;
}
</style>
