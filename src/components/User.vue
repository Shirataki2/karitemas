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
            <v-container grid-list-md text-xs-center w100>
              <v-layout row wrap>
                <template v-for="group in groupList">
                  <v-flex xs12 sm6 md4 :key="group.id">
                    <v-card class="elevation-2 link" @click="goGroupPage(group.id)">
                      <v-card-title class="title">
                        {{ group.name }}
                      </v-card-title>
                      <v-card-title text-left>
                        <template v-if="group.status === 'private'">
                          <v-icon xs1 class="ml-1 subheading text-left">fas fa-lock</v-icon>
                          <p class="xs9 offset-1 mt-3 grey--text">Private</p>
                        </template>
                        <template v-else>
                          <v-icon xs1 class="ml-1 subheading text-left">fas fa-globe-asia</v-icon>
                          <p class="xs10 offset-1 mt-3 grey--text">Public</p>
                        </template>
                        <p class="text-right align-right offset-6 mr-1 mt-3 grey--text">
                          {{ group.users.length }}
                        </p>
                      </v-card-title>
                    </v-card>
                  </v-flex>
                </template>
              </v-layout>
            </v-container>
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
    console.log(this.$store.getters.token)
    this.$store.dispatch('checkToken', this.$router).then(() => {
      console.log(this.$store.getters.token)
    }).then(() => {
      axios.get(`${process.env.API_URL}/api/user/${this.$route.params.id}`, {
        headers: this.$store.getters.token
      }).then((res) => {
        console.log(res)
        console.log(this.$store.getters.token)
        if (res.data.status === 'USER_NOTFOUND') {
          this.$router.push('/404')
        }
        this.user = res.data
        this.groupList = this.user.user_groups
        console.log(this.groupList)
      }).catch((err) => {
        console.error(err)
        location.reload()
      })
    })
  },
  methods: {
    goGroupPage (id) {
      this.$router.push(`/group/${id}`)
    }
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
  .link {
    cursor: pointer;
  }
</style>
