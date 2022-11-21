<template>
  <v-app>
    <my-header></my-header>
    <v-main>
    </v-main>
    <my-footer></my-footer>
  </v-app>
</template>

<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'App',

  components: {
    'my-header': Header,
    'my-footer': Footer
  },

  data: () => ({
    //
  }),
};
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
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
