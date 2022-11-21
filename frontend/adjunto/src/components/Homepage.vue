<template>
    <div>
      <div v-if="!valid" class="text-center">
        <v-progress-circular indeterminate color="#FF4E48"></v-progress-circular>
      </div>
      <div v-else>
        <v-row class="justify-center">
        <v-col cols="2">
        </v-col>
        <v-col cols="6" >
          <p class="text-h3 text-left">
            Última Hora
          </p>
        </v-col>
        <v-col cols="2">
        </v-col>
        </v-row>
        <v-row class="justify-center">
          <v-col cols="2">
          <v-card height="380" flat class="transparent_color">
            <v-list  v-for="(category, index) in categories" :key="index" flat width="240">
              <v-list-item  class="mt-n3" :href='"https://www.adjunto.pt/category/" + category.atributes.categoria' target="_blank">
                <v-icon>
                  mdi-circle-medium
                </v-icon>
                <v-list-item-content>
                  {{ category.attributes.categoria }}
                </v-list-item-content>
              </v-list-item>
              <v-divider class="categories_divider"></v-divider>
            </v-list>
            <v-btn  x-large href="https://www.nba.com/" target="_blank" rounded width="30%" height="20" class="mt-5">
              <v-img src="https://www.adjunto.pt/wp-content/uploads/2020/11/nbaSlider.jpg.jpg" width="240" class="rounded nba_margins"></v-img>
            </v-btn>
          </v-card>
          </v-col>
          <v-col cols="6" >
          <v-carousel cycle hide-delimiter-background hide-delimiters show-arrows-on-hover >
            <template v-slot:prev="{ on, attrs }">
              <v-btn fab color="#FF4E48" v-bind="attrs" v-on="on">
                <v-icon>
                  mdi-arrow-left
                </v-icon>
              </v-btn>
            </template>
            <template v-slot:next="{ on, attrs }">
              <v-btn fab color="#FF4E48" v-bind="attrs" v-on="on">
                <v-icon>
                  mdi-arrow-right
                </v-icon>
              </v-btn>
            </template>
            <v-carousel-item v-for="(artigo, i) in artigos" :key="i" >
              <v-card :href="'https://www.adjunto.pt/' + artigo.attributes.titulo">
                <v-img height="500" class="rounded-lg" v-if=" artigo.attributes.media != null" :src="artigo.attributes.media.data[0].attributes.url" gradient="to top, rgba(10,0,0,.8), rgba(0,0,0,0)" >
                  <v-card-title class="text-h4 white--text">
                    <v-row align="end" style="height: 500px;">
                      <v-col>
                        <div>
                          <p class="ma-0 text-body-1 text-left" color="#E9E9E9">
                            <v-icon small color="#E9E9E9">
                              mdi-calendar
                            </v-icon>
                            {{ artigo.attributes.createdAt.substr(0,10) }}
                            <v-icon small color="#E9E9E9">
                              mdi-account
                            </v-icon>
                            {{ artigo.attributes.autor.data[0].atributes.nome }}
                          </p>
                        </div>
                        <p class="text-left font-weight-bold">
                          {{ artigo.attributes.titulo }}
                        </p>
                        <div class="ma-0 text-body-1 text-left" color="#E9E9E9">
                          <v-icon small color="#E9E9E9">
                            mdi-tag
                          </v-icon>
                          {{ artigo.attributes.categorias.data[0].categoria}}
                        </div>
                      </v-col>
                    </v-row>
                  </v-card-title>
                </v-img>
              </v-card>
            </v-carousel-item>
          </v-carousel>
          </v-col>
          <v-col cols="2" >
            <v-expansion-panels v-model="plane">
              <v-expansion-panel class="black" >
                <v-expansion-panel-header disable-icon-rotate>
                  <p class="text-h5 white--text">Mercado</p>
                  <template v-slot:actions>
                    <v-icon color="white  ">
                      mdi-window-minimize
                    </v-icon>
                  </template>
                </v-expansion-panel-header>
                <v-expansion-panel-content class="out_of_margins ml-n5">
                  <v-carousel hide-delimiters height="400" class="rounded">
                    <v-carousel-item v-for="(artigo,i) in artigos" :key="i" >
                        <v-card color="black">
                          <v-img v-if=" artigo.acf != 'false'" :src="artigo.attributes.media.data[0].attributes.url" height="250"></v-img>
                          <v-card-title class="text-h6 white--text">
                              <v-row class="fill-height flex-column" justify="space-between">
                                <div>
                                  <p class="text-body-1 text-left" color="#E9E9E9">
                                    <v-icon small color="#E9E9E9">
                                      mdi-calendar
                                    </v-icon>
                                    {{ artigo.attributes.createdAt.substr(0,10) }}
                                  </p>
                                </div>
                                <p class="text-left font-weight-bold">
                                    {{ artigo.attributes.titulo }}
                                </p>
                                <v-btn plain @click.stop="dialog = true" text color="#FF4E48" class="justify-start ml-n5">
                                  <v-icon>mdi-plus</v-icon>
                                  Ler mais
                                </v-btn>
                              </v-row>
                            </v-card-title>
                        </v-card>
                        <v-dialog v-model="dialog" max-width="790">
                          <v-card>
                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn plain color="#FF4E48" text @click="dialog = false">
                                <v-icon>mdi-close</v-icon>
                              </v-btn>
                            </v-card-actions>
  
                            <v-card flat>
                              <v-row no-gutters class="justify-center">
                              <v-img class="rounded-lg" max-width="690" max-height="350" :src="artigo.attributes.media.data[0].attributes.url"></v-img>
                              </v-row>
                            </v-card>
  
                            <v-card-title class="text-body-1">
                                <p class="text-body-1 ml-6">
                                  <v-icon small>
                                    mdi-calendar
                                  </v-icon>
                                  {{ artigo.attributes.createdAt.substr(0,10) }}&nbsp;&nbsp;&nbsp;
                                </p>
  
                                <p class="text-body-1 first_color">
                                <v-icon small color="#FF4E48">
                                  mdi-tag
                                </v-icon>
                                    {{ artigo.attributes.categorias.data[0].categoria}}
                                </p>
                            </v-card-title>
  
                            <v-card-title class="text-h4 mx-6 mt-n5">
                                {{ artigo.attributes.titulo }}
                            </v-card-title>
  
                            <v-card-text class="text-left">
                              <p class="text-body-1 font-weight-medium ml-6">
                                {{ artigo.attributes.descricao }}
                              </p>
                            </v-card-text>
                        </v-card>
                      </v-dialog>
                    </v-carousel-item>
  
                  </v-carousel>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>        
          </v-col>
        </v-row>
        <v-row class="justify-center mb-3">
          <v-col cols="6">
          <v-card flat class="transparent_color">
            <v-tabs v-model="tab" color="#FF4E48" class="transparent_color">
              <v-tab class="text-body-1 transparent_color" v-for="(category, index) in categories" :key="index">
                {{ category.attributes.categoria }}
              </v-tab>
            </v-tabs>
  
            <v-tabs-items v-model="tab" class="transparent_color">
              <v-tab-item v-for="(category, index) in categories" :key="index">
                <v-card class="my-5 mx-2"  v-for="(artigo, i) in artigos.filter(x => x.attributes.categorias.data.attributes.categoria.includes(category.name)).slice(10*(page-1),10*page)" :key="i">
                <!--  <v-img v-if="(typeof artigo.acf.imagem !== 'false' && typeof artigo.acf.url === 'undefined')" :src="artigo.acf.imagem.url"></v-img>
                  <iframe v-if="(typeof artigo.acf.url !== 'undefined')" style="width:100%;height:500px" :src="'https://youtube.com/embed/' + artigo.acf.url.split('/')[3]" frameborder="0" allowfullscreen></iframe> -->
                  <v-card-text class="text-body-1 text-left">
                    <v-icon small>
                      mdi-calendar
                    </v-icon>
                    {{ artigo.attributes.createdAt.substr(0,10) }}
                    <v-icon small>
                      mdi-account
                    </v-icon>
                    {{ artigo.attributes.autor.data[0].atributes.nome }}
                  </v-card-text>
  
                  <v-card-title class="mt-n3 font-weight-black text-h4">
                    {{ artigo.attributes.titulo }}
                  </v-card-title>
  
                  <v-card-subtitle class="text-h6 text-left">
                    {{ artigo.attributes.descricao.substr(0, 200) }}
                  </v-card-subtitle>
  
                  <v-card-text class="text-body-1 text-left first_color">
                    <v-row>
                      <v-col>
                        <v-icon small color="#FF4E48">
                          mdi-tag
                        </v-icon>
                        {{ artigo.attributes.categorias.data[0].atributes.categoria }}
                      </v-col>
                      <v-spacer></v-spacer>
                      <v-col cols="2">
                        <v-btn :href="'https://www.adjunto.pt/' + artigo.id" text color="#FF4E48" class="justify-start ml-n5">
                          <v-icon>mdi-plus</v-icon>
                          Ler mais
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
                <div class="text-center">
                  <v-pagination v-model="page" :length="Math.floor(artigos.filter(x => x.attributes.categorias.data.attributes.categoria.includes(category.name)).length / 10) + 1" class="first_color rounded"></v-pagination>
                </div>
              </v-tab-item>
            </v-tabs-items>
          </v-card>
          </v-col>
        </v-row>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data () {
      return {
        selectedItem: 1,
        categories: [],
        categories_tabs: [],
        artigos: [],
        plane: 0,
        tab: null,
        dialog: false,
        valid: false,
        page:1,
      }
    },
    
    created() {
      this.fetch_data()
    },
  
    methods: {
      async fetch_data(){
        var categories_aux = await axios('http://localhost:1337/api/categorias')
        this.categories = categories_aux.data.data
        var artigos_aux = await axios('http://localhost:1337/api/artigos?populate=*')
        this.artigos = artigos_aux.data
        this.valid = true
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
  
  .categories_divider{
    border-color: #FF4E48 !important;
  }
  
  .first_color{
    color: #FF4E48 !important;
  }
  
  .v-application .primary{
    background-color: #FF4E48 !important;
  }
  
  .out_of_margins{
    width: 113.5% !important;
  }
  
  .nba_margins{
    margin-left: 150px;
  }
  
  .transparent_color{
    background-color: transparent !important;
  }
  
  .v-tabs-bar{
    background-color: transparent !important;
  }
  
  
  </style>
  