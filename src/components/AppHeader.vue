<template>
  <div>
    <v-toolbar color="black" app absolute clipped-left dark>
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
    <template v-if="this.$store.getters.isLogin">
      <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary
        floating
      >
        <v-img :aspect-ratio="16/9" src="https://cdn.vuetifyjs.com/images/parallax/material.jpg">
          <v-layout pa-2 column fill-height class="lightbox white--text">
            <v-spacer></v-spacer>
            <v-flex shrink>
              <div class="subheading">{{ this.$store.getters.fullname }}</div>
              <div class="body-1">{{ this.$store.getters.email }}</div>
            </v-flex>
          </v-layout>
        </v-img>
        <v-list>
          <template v-for="(item, i) in drawerData">
            <div class="mt-3" :key="i">
              <v-divider v-if="item.divider" :key="i"></v-divider>
              <v-list-tile v-else :key="item.title" @click="item.func">
                <v-list-tile-action>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile>
            </div>
          </template>
        </v-list>
      </v-navigation-drawer>
    </template>
    <template v-else>
      <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary
      >
        <template v-for="(item, i) in drawerDataPublic">
          <div class="mt-3" :key="i">
            <v-divider v-if="item.divider"></v-divider>
            <v-list-tile v-else :key="item.title" @click="item.func">
              <v-list-tile-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile>
          </div>
        </template>
      </v-navigation-drawer>
    </template>
  </div>
</template>
<script>
export default {
  name: 'VHeader',
  props: {
    appName: {}
  },
  data: function () {
    return {
      drawer: false,
      drawerData: [
        {
          icon: 'fas fa-user',
          title: 'User',
          func: () => {
            console.log('Nav 0')
          }
        },
        { divider: true },
        {
          icon: 'fas fa-sign-out-alt',
          title: 'Sign Out',
          func: () => {
            this.$store.dispatch('logout', this.$router).then(() => {
              console.log('Log out!')
            })
          }
        }
      ],
      drawerDataPublic: [
        {
          icon: 'fas fa-sign-in-alt',
          title: 'Register',
          func: () => {
            // TODO: Implement Login Session
            console.log('Not Implemented!')
          }
        },
        {
          icon: 'send',
          title: 'Sign in',
          func: () => {
            // TODO: Implement Login Session
            console.log('Not Implemented!')
          }
        },
        {
          icon: 'fab fa-google',
          title: 'Sign in with Google',
          func: () => {
            this.$store.dispatch('authenticate_google', [this.$auth, this.$router]).then(() => {
              console.log('Login!')
            })
          }
        }
      ]
    }
  }
}
</script>
<style lang="scss">
    p, div {
        font-family: "Roboto", "Helvetica Neue", Helvetica, Arial, sans-serif;
    }

    *::-webkit-scrollbar {
        display: none;
    }
</style>
<style scoped>
  .lightbox {
    box-shadow: 0 0 20px inset rgba(0, 0, 0, 0.2);
    background-image: linear-gradient(to top, rgba(0, 0, 0, 0.4) 0%, transparent 72px);
  }
</style>
