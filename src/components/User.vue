<template>
  <div>
    <h2 class="display-3">User</h2>
    <h3 class="display-2">Name</h3>
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
  created () {
    console.log(this.$route.params.id)
    axios.post('http://localhost:8000/api/uget/', {
      'id': this.$route.params.id
    }).then((res) => {
      console.log(res)
      if (res.data.status === 'USER_NOTFOUND') {
        this.$router.push('/404')
      }
      this.user = res.data
    })
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
