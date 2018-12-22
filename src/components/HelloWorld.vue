<template>
  <v-container>
    <h2 class="display-3">Users</h2>
    <v-btn
      class="white--text"
      color="cyan lighten-2"
      @click="logout()"
    >
      Log out
    </v-btn>
    <v-list two-line>
      <template v-for="user in userList">
        <v-list-tile avatar :key="user.username">
          <v-list-tile-avatar>
            <v-avatar color="cyan">
              <v-icon dark>
                account_circle
              </v-icon>
            </v-avatar>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title v-html="user.username" />
            <v-list-tile-sub-title>
              2018/12/21 Fri
            </v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      userList: []
    }
  },
  mounted () {
    console.log('mounted')
    axios
      .get('/api/users')
      .then((res) => {
        this.userList = res.data
      })
      .catch((err) => {
        console.log(err)
      })
  },
  methods: {
    logout () {
      this.$store.dispatch('logout').then(() => {
        console.log('log out')
      })
    }
  }
}
</script>
