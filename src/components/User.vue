<template>
  <div>
    <v-responsive style="background: dodgerblue;" height="310px" width="100%"/>
    <v-container>
      <v-card class="elevation-7 main-card">
        <v-layout row wrap>
          <v-flex xs12 align-center justify-center layout text-xs-center>
            <v-avatar size="180" color="gray lighten-4" class="elevation-7 my-avatar">
              <v-img src="https://pbs.twimg.com/profile_images/1076916401061879808/8-GIsbaN.jpg" alt="avatar"/>
            </v-avatar>
          </v-flex>
          <v-card-title primary-title class="mt-2 mx-auto headline xs12">
            <p>{{ this.user !== null ? this.user.username : ''}}</p>
          </v-card-title>
        </v-layout>
        <v-layout row wrap>
          <v-card-title primary-title class="ml-3 mt-2 xs12">
            <v-card-text
              class="display-1 xs12 font-weight-medium darken-1 heading">
              参加グループ
            </v-card-text>
          </v-card-title>
        </v-layout>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vue from 'vue'
Vue.use(VueAxios, axios)

export default {
  name: 'User',
  data: () => ({
    user: null,
    groupList: []
  }),
  beforeCreate () {
    console.log(this.$route.params.id)
    axios.get('http://localhost:8000/api/user/' + this.$route.params.id, {
      headers: this.$store.getters.token
    })
      .then((res) => {
        if (res.data.status === 'USER_NOTFOUND') {
          this.$router.push('/404')
        }
        console.log(res.data)
        this.user = res.data[0]
        this.groupList = this.user.user_groups
        console.log(this.user)
      })
  },
  methods: {
  }
}
</script>

<style scoped>
  .main-card, .main-card>*{
    position: relative;
    bottom: 120px;
  }
  .my-avatar{
    position: relative;
    bottom: -20px;
  }
</style>
