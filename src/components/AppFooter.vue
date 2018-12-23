<template>
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
</template>
<script>
export default {
  name: 'AppFooter',
  props: {
    bottomNav: {},
    bottomProps: {},
    color: {}
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
