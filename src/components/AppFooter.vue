<template>
  <v-footer fixed>
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
        @click="prop.click"
        flat
      >
        <span>{{ prop.text }}</span>
        <v-icon>{{ prop.icon }}</v-icon>
      </v-btn>
    </v-bottom-nav>
  </v-footer>
</template>
<script>
export default {
  name: 'AppFooter',
  data: () => ({
    bottomNav: 0
  }),
  props: {
    bottomProps: {},
    color: {}
  },
  mounted () {
    setInterval(() => { this.bottomNav = this.getPageId(this.$route.path) }, 50)
  },
  computed () {
    this.bottomNav = this.getPageId(this.$route.path)
  },
  methods: {
    getPageId: function (path) {
      if (/\/group\/?[0-9]*\/?/.test(path)) {
        return 1
      }
      if (path === '/notification') {
        return 2
      }
      if (path === '/setting') {
        return 3
      }
      return 0
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
