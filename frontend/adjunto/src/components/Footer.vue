<template>
    <div v-if="!valid">
      
    </div>
    <v-footer v-else padless>
      <v-card flat tile class="text-center">
        <v-divider></v-divider>
        <v-row class="justify-center">
          <v-col cols="6">
            <v-img class="d-inline-block mt-5" width="50%" alt="user" src="http://localhost:1337/uploads/Logo_adjunto_79a46c3032.svg"></v-img>
          </v-col>
        </v-row>
        <v-row class="justify-center">
          <v-col cols="2">
            <v-card-title class="mb-4">
              Contacto
            </v-card-title>
            <v-card-text class="black--text text-left mb-n4">
              Rua Cruz de Pedra nº122
            </v-card-text>
            <v-card-title>
              <v-icon class="first_color">mdi-phone</v-icon>
              &nbsp; 910313402
            </v-card-title>
            <v-card-actions>
              <v-btn class="first_color">
                Contact us
              </v-btn>
            </v-card-actions>
          </v-col>
          <v-col cols="2">
            <v-card-title class="mb-5">
              Categorias
            </v-card-title>
            <v-list v-for="(category, index) in categories" :key="index" flat width="240">
              <v-list-item class="mt-n6 ml-n2" :href='"https://www.adjunto.pt/category/" + category' target="_blank" >
                <v-icon class="first_color">
                  mdi-menu-right-outline
                </v-icon>
                <v-list-item-content class="first_color">
                  {{ category.name }}
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>
          <v-col cols="2">
            <v-card-title class="mb-4">
              Objetivos
            </v-card-title>
            <v-card-text class="black--text pt-0 text-left">
              Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo interdum. Praesent ut risus eget metus luctus accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim a sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum tempor vel ut orci. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            </v-card-text>
          </v-col>
          <v-col cols="2">
            <v-card-title class="mb-4">
              Futuro
            </v-card-title>
            <v-card-text class="black--text pt-0 text-left font-weight-black">
              - Althusser Competing Interpelations
            </v-card-text>
            <v-card-text class="black--text pt-0 text-left font-weight-black">
              - Althusser Competing Interpelations
            </v-card-text>
          </v-col>
        </v-row>
      </v-card>
    </v-footer>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data () {
      return {
        valid: false,
        categories: [],
      }
    },
    
    async created() {
      await this.fetch_data()
      this.valid = true
    },
  
    methods: {
      async fetch_data(){
        var categories_aux = await axios('https://adjunto.pt/wp-json/wp/v2/categories')
        this.categories = categories_aux.data.splice(0, categories_aux.data.length-3)
        var posts_aux = await axios('https://adjunto.pt/wp-json/artigos/v1/post')
        this.posts = posts_aux.data
      }
    }
  }
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
  
  .v-progress-circular {
    margin: 1rem;
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
  
  .button_divider{
    border-color: #FF4E48 !important;
    width: 29%;
    margin-left: 221px;
  }
  
  .first_color{
    color: #FF4E48 !important;
  }
  
  .out_of_margins{
    width: 113.5% !important;
  }
  
  .facebook_tag{
    color: #0C88EF;
  }
  
  .child { /* This is the item to center... */
    display: inline-block;
  }
  .parent { /* ...and this is its parent container. */
    text-align: center;
  }
  
  </style>