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
        <v-row class="justify-center text-left">
          <v-col cols="2">
            <v-card-title class="mb-4">
              Contacto
            </v-card-title>
            <v-card-text class="black--text mb-n4">
              Rua Cruz de Pedra nº122
            </v-card-text>
            <v-card-title>
              <v-icon class="site_color">mdi-phone</v-icon>
              912345678  
            </v-card-title>
            <v-card-actions>
              <v-btn class="site_color">
                Contact us
              </v-btn>
            </v-card-actions>
          </v-col>
          <v-col cols="2">
            <v-card-title class="mb-5">
              Categorias
            </v-card-title>
            <v-list v-for="(category, index) in categories" :key="index" flat >
              <v-list-item class="my-n2 ml-n2" :href='"https://www.adjunto.pt/category/" + category' target="_blank" >
                <v-icon class="site_color">
                  mdi-menu-right-outline
                </v-icon>
                <v-list-item-content class="site_color">
                  {{ category.attributes.categoria }}
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
        var categories_aux = await axios('http://localhost:1337/api/categorias')
        this.categories = categories_aux.data.data
      }
    }
  }
  </script>
  
  <style>
  .site_color{
    color: #FF4E48 !important;
  }
  
  
  </style>