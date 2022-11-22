<template>
  <v-app>
    <MyHeader></MyHeader>
    <v-main>
      <router-view />
    </v-main>
    <MyFooter></MyFooter>
  </v-app>
</template>

<script>

export default {
  name: 'App',


  data: () => ({
    //
  }),
};
</script>

<style>
#app {
  text-align: center;
  color: #2c3e50;
}

.background_image{
    width: 100%;
    height: 80%;
    left: 300px;
    position: absolute;
    background-image: url( 'http://localhost:1337/uploads/Logo_Background_22cf4a31e9.svg');
    opacity: 0.5;
    background-repeat: repeat-y;
    background-origin: content-box;
    background-position: 900px 140px;
    background-size: 1000px;
}
</style>
