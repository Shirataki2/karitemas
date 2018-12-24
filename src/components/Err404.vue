<template>
  <div class="h-100">
    <v-container class="h-100" >
      <h3 class="display-2 fill-height text-center indigo--text darken-2 align-content-center">
        Oops! 404 File not Found!
      </h3>
    </v-container>
  </div>
</template>

<script>
export default {
  name: '404'
}
</script>

<style scoped>
h3 {
 display: -webkit-flex;
 display: flex;
 -webkit-align-items: center; /* 縦方向中央揃え（Safari用） */
 align-items: center; /* 縦方向中央揃え */
 -webkit-justify-content: center; /* 横方向中央揃え（Safari用） */
 justify-content: center; /* 横方向中央揃え */
}
</style>
