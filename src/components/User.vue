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
          <v-card-title primary-title class="mt-2 mx-auto headline">
            {{ this.user !== null ? this.user.fields.username : ''}}
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
    user: null
  }),
  beforeCreate () {
    console.log(this.$route.params.id)
    axios.post('http://localhost:8000/api/uget/', {
      'id': this.$route.params.id
    }).then((res) => {
      console.log(res)
      if (res.data.status === 'USER_NOTFOUND') {
        this.$router.push('/404')
      }
      this.user = JSON.parse(res.data.user)[0]
      console.log(JSON.parse(res.data.user)[0])
    })
  },
  methods: {
  }
}
</script>

<style scoped>
  .main-card, .main-card>*{
    position: relative;
    bottom: 80px;
  }
  .my-avatar{
    position: relative;
    bottom: 0px;
  }
</style>
